/**
 * Created by sabir on 06.07.16.
 */

var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');


//Session, LocationDataChunk, GpsCachePoint

var LocationModule = {

    CHUNK_SIZE: 1000,

    transformSession: function(s){
        if (s == undefined){
            return undefined;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            startTimestamp: s.get('startTimestamp'),
            userId: s.get('userId'),
            name: s.get('name'),
            mapString: s.get('mapString'),
            description: s.get('description'),
            cachePointsNumber: s.get('cachePointsNumber'),
            lastPointTime: s.get('lastPointTime'),
            lastChunkNumber: s.get('lastChunkNumber')
        }
    },

    transformCachePoint: function(p){
        if (p == undefined){
            return p;
        }
        return {
            id: p.id,
            userId: p.get('userId'),
            sessionId: p.get('sessionId'),
            lat: p.get('lat'),
            lon: p.get('lon'),
            alt: p.get('alt'),
            acc: p.get('acc'),
            bea: p.get('bea'),
            vel: p.get('vel'),
            t: p.get('t')
        }
    },

    transformLocationDataChunk: function(c){
        if (c == undefined){
            return c;
        }
        return {
            id: c.id,
            sessionId: c.get('sessionId'),
            times: c.get('times'),
            lat: c.get('lat'),
            lon: c.get('lon'),
            alt: c.get('alt'),
            acc: c.get('acc'),
            bea: c.get('bea'),
            vel: c.get('vel'),
            number: c.get('number')
        }
    },

    loadSessionChunks: function(sessionId, callback){
        if (sessionId == undefined){
            return;
        }
        var q = new Parse.Query('LocationDataChunk');
        q.limit(1000);
        q.equalTo('sessionId', sessionId);
        q.addAscending('number');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformLocationDataChunk(r)});
            callback(arr);
        });
    },

    loadChunkPoints: function(sessionId, callback){
        var self = this;
        var arr = [];
        self.loadSessionChunks(sessionId, function(chunks){
            for (var i in chunks){
                var ch = chunks[i];
                var times = ch.times;
                for (var j in times){
                    arr.push({
                        t: times[j],
                        lat: ch.lat[j],
                        lon: ch.lon[j],
                        alt: ch.alt[j],
                        acc: ch.acc[j],
                        bea: ch.bea[j],
                        vel: ch.vel[j]
                    });
                }
            }
            callback(arr);
        });
    },

    loadCachedPoints: function(sessionId, callback, shouldTransform){
        if (sessionId == undefined){
            return;
        }
        var q = new Parse.Query('CachePoint');
        q.limit(1000);
        q.addAscending('t');
        q.equalTo('sessionId', sessionId);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformCachePoint(r)});
            }
            callback(results);
        });
    },

    saveChunk: function(sessionId, points, chunkNumber, callback){
        var LocationChunk = Parse.Object.extend('LocationDataChunk');
        var chunk = new LocationChunk();
        var self = this;
        chunk.set('sessionId', sessionId);
        chunk.set('chunkNumber', chunkNumber);
        chunk.set('times', points.map(function(p){return p.t}));
        chunk.set('lat', points.map(function(p){return p.lat}));
        chunk.set('lon', points.map(function(p){return p.lon}));
        chunk.set('alt', points.map(function(p){return p.alt}));
        chunk.set('acc', points.map(function(p){return p.acc}));
        chunk.set('bea', points.map(function(p){return p.bea}));
        chunk.set('vel', points.map(function(p){return p.vel}));
        chunk.save({useMasterKey: true}).then(function(savedChunk){
            callback(self.transformLocationDataChunk(savedChunk));
        });
    },

    saveCachedPointsToChunk: function(sessionId, chunkNumber, callback){
        var self = this;
        this.loadCachedPoints(sessionId, function(cachedPoints){
            if (cachedPoints.length == 0){
                callback();
                return;
            }
            var points = cachedPoints.map(function(r){return self.transformCachePoint(r)});
            self.saveChunk(sessionId, points, chunkNumber, function(savedChunk){
                //remove cached points
                Parse.Object.destroyAll(cachedPoints, {
                    useMasterKey: true,
                    success: function(){
                        callback();
                    }
                });
            });
        }, false);
    },

    loadSessionByUserIdAndStartTimestamp: function(userId, startTimestamp, success, error, shouldTransform){
        if (userId == undefined || startTimestamp == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSessionByUserIdAndStartTimestamp: userId or startTimestamp is undefined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.equalTo('startTimestamp', startTimestamp);
        q.equalTo('userId', userId);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (results.length == 0){
                success(undefined);
                return;
            }
            var s = results[0];
            if (shouldTransform == true){
                s = self.transformSession(s);
            }
            success(s);
        });
    },

    loadLazylySessionByUserIdAndStartTimestamp: function(userId, startTimestamp, success, error, shouldTransform){
        var self = this;
        self.loadSessionByUserIdAndStartTimestamp(userId, startTimestamp, function(session){
            if (session == undefined){
                var Session = Parse.Object.extend('AirSession');
                var s = new Session();
                s.set('userId', userId);
                s.set('startTimestamp', startTimestamp);
                s.set('lastPointTime', -1);
                s.set('lastChunkNumber', -1);
                s.set('cachePointsNumber', 0);
                s.save({useMasterKey: true}).then(function(savedSession){
                    if (shouldTransform == true){
                        savedSession = self.transformSession(savedSession);
                        success(savedSession);
                    }else{
                        success(savedSession);
                    }
                });
            }else {
                success(session);
            }
        }, error, shouldTransform);
    },


    loadSessionPoints: function(sessionId, success, error){
        if (sessionId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSessionPoints: sessionId is undefined'});
            return;
        }
        var q = new Parse.Query('AirSession');
        var self = this;
        q.get(sessionId, {
            useMasterKey: true,
            success: function(session){
                self.loadChunkPoints(sessionId, function(chunkPoints){
                    self.loadCachedPoints(sessionId, function(cachePoints){
                        var points = chunkPoints.concat(cachePoints);
                        success(points);
                    });
                });
            },
            error: function(err){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'Session with id = "' + sessionId + '" is not found'});
            }
        });
    },

    loadUserSessions: function(userId, success, error){
        if (userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserSessions: userId is undefined'});
            return;
        }
        var q = new Parse.Query('AirSession');
        var self = this;
        q.equalTo('userId', userId);
        q.equalTo('deleted', false);
        q.limit(1000);
        q.addDescending('startTimestamp');
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformSession(r)});
            success(arr);
        });
    },

    saveCachePoints: function(sessionId, userId, points, callback){
        var arr = [];
        var CachePoint = Parse.Object.extend('CachePoint');
        var self = this;
        for (var i in points){
            var point = points[i];
            var p = new CachePoint();
            p.set('sessionId', sessionId);
            p.set('userId', userId);
            p.set('lat', point.lat);
            p.set('lon', point.lon);
            p.set('alt', point.alt);
            p.set('acc', point.acc);
            p.set('bea', point.bea);
            p.set('vel', point.vel);
            p.set('t', point.t);
            arr.push(p);
        }
        Parse.Object.saveAll(arr, {
            useMasterKey: true,
            success: function(savedPoints){
                var arr = savedPoints.map(function(r){return self.transformCachePoint(r)});
                callback(arr);
            }
        });
    },

    savePoints: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'savePoints: data is undefined'});
            return;
        }
        if (data.userId == undefined || data.startTimestamp == undefined || data.points == undefined || data.points.length == 0){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'savePoints: userId or startTimestamp is undefined or points are not defined or empty'});
            return;
        }
        var self = this;
        var points = data.points;
        if (points.length > self.CHUNK_SIZE){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'savePoints: you are trying to send ' + points.length + ' points but maximum number to upload is ' + self.CHUNK_SIZE});
            return;
        }
        this.loadLazylySessionByUserIdAndStartTimestamp(data.userId, data.startTimestamp, function(session){ // 1 req

            var lastPointTime = session.get('lastPointTime');
            var lastChunkNumber = session.get('lastChunkNumber');
            var cachePointsNumber = session.get('cachePointsNumber');

            var filteredPoints = [];
            for (var i in points){
                var p = points[i];
                if (p.t > lastPointTime){
                    filteredPoints.push(p)
                }
            }
            points = filteredPoints;
            if (points.length == 0){ //nothing to add
                success(self.transformSession(session));
                return;
            }

            if (cachePointsNumber + points.length > self.CHUNK_SIZE){
                //create chunk with old points and then save new points and then update session
                self.saveCachedPointsToChunk(session.id, lastChunkNumber + 1, function(){ // 3 req
                    self.saveCachePoints(session.id, data.userId, points, function(savedCachePoints){ // 1 req
                        session.set('lastChunkNumber', lastChunkNumber + 1);
                        session.set('cachePointsNumber', points.length);
                        session.set('lastPointTime', points[points.length - 1].t);
                        session.save({useMasterKey: true}).then(function(sSession){ // 1 req
                            //total requests number is 6
                            success(self.transformSession(sSession));
                        });
                    });
                });

            }else {
                //just create CachePoints and update session
                self.saveCachePoints(session.id, points, points, function(savedCachePoints){ // 1 req
                    session.set('cachePointsNumber', cachePointsNumber + points.length);
                    session.set('lastPointTime', points[points.length - 1].t);
                    session.save({useMasterKey: true}).then(function(sSession){ // 1 req
                        //total requests number is 3
                        success(self.transformSession(sSession));
                    });
                });
            }

        }, function(err){
            error(err);
        }, false);

    }

};

module.exports = LocationModule;