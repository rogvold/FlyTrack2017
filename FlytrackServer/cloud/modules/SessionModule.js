/**
 * Created by sabir on 18.07.16.
 */

var ECR = require('../helpers/ErrorCodesRegistry');

var SessionModule = {

    CHUNK_SIZE: 1000, //chunk size should be less then 1000

    transformSession: function(s){
        if (s == undefined){
            return undefined;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            userId: s.get('userId'),
            name: s.get('name'),
            description: s.get('description'),
            startTimestamp: s.get('startTimestamp'),
            cachePointsNumber: s.get('cachePointsNumber'),
            lastPointTime: s.get('lastPointTime'),
            lastChunkNumber: s.get('lastChunkNumber')
        }
    },

    transformCachePoint: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            userId: p.get('userId'), // for parse live queries
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
            number: c.get('number'),
            t: c.get('t'),
            lat: c.get('lat'),
            lon: c.get('lon'),
            alt: c.get('alt'),
            acc: c.get('acc'),
            bea: c.get('bea'),
            vel: c.get('vel')
        }
    },

    loadSession: function(sessionId, callback, shouldTransform){
        if (sessionId == undefined){
            callback(undefined);
            return;
        }
        var q = new Parse.Query('Session');
        var self = this;
        q.get(sessionId, {
            useMasterKey: true,
            success: function(session){
                if (shouldTransform == true){
                    session = self.transformSession(session);
                }
                callback(session);
            }
        });
    },

    loadUserSessions: function(userId, callback, shouldTransform){
        var self = this;
        var q = new Parse.Query('Session');
        q.limit(1000);
        q.equalTo('deleted', false);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformSession(r)});
            }
            callback(results);
        });
    },

    loadSessionChunks: function(sessionId, callback, shouldTransform){
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
            if (shouldTransform == true){
                results = results.map(function(r){
                    return self.transformCachePoint(r);
                });
            }
            callback(results);
        });
    },

    loadChunkPoints: function(sessionId, callback){
        this.loadSessionChunks(sessionId, function(chunks){
            var arr = [];
            for (var i in chunks){
                var c = chunks[i];
                for (var j in c.t){
                    arr.push({
                            t: c.t[j],
                            lat: c.lat[j],
                            lon: c.lon[j],
                            alt: c.alt[j],
                            acc: c.acc[j],
                            bea: c.bea[j],
                            vel: c.vel[j]
                        });
                }
            }
            callback(arr);

        }, this)
    },

    loadCachePoints: function(sessionId, callback, shouldTransform){
        var self = this;
        var q = new Parse.Query('CachePoint');
        q.limit(this.CHUNK_SIZE);
        q.addAscending(t);
        q.equalTo('sessionId', sessionId);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){
                    return self.transformCachePoint(r);
                });
            }
            callback(results);
        });
    },

    loadSessionPoints: function(sessionId, callback){
        var self = this;
        this.loadChunkPoints(sessionId, function(chunkPoints){
            self.loadCachePoints(sessionId, function(cachePoints){
                var points = chunkPoints.concat(cachePoints);
                callback(points);
            });
        });
    },

    loadLazylySessionByUserIdAndStartTimestamp: function(userId, startTimestamp, callback){
        var q = new Parse.Query('Session');
        q.equalTo('userId', userId);
        q.equalTo('startTimestamp', startTimestamp);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined || results.length == 0){
                var Session = Parse.Object.extend('Session');
                var s = new Session();
                s.set('deleted', false);
                s.set('userId', userId);
                s.set('startTimestamp', startTimestamp);
                s.set('lastPointTime', -1);
                s.set('lastChunkNumber', -1);
                s.set('cachePointsNumber', 0);
                s.save({useMasterKey: true}).then(function(savedSession){
                    callback(savedSession);
                });
                //create new session
                return;
            }
            callback(results[0]);

        });
    },

    saveCachePoints: function(sessionId, userId, points, callback){
        if (points == undefined || points.length == 0){
            callback();
            return;
        }
        var CachePoint = Parse.Object.extend('CachePoint');
        var arr = [];
        for (var i in points){
            var point = points[i];
            var p = new CachePoint();
            p.set('userId', userId);
            p.set('sessionId', sessionId);
            p.set('t', point[i].t);
            p.set('lat', point[i].lat);
            p.set('lon', point[i].lon);
            p.set('alt', point[i].alt);
            p.set('acc', point[i].acc);
            p.set('vel', point[i].vel);
            p.set('bea', point[i].bea);
            arr.push(p);
        }
        Parse.Object.saveAll(arr, {
            useMasterKey: true,
            success: function(savedPoints){
                callback();
            }
        });
    },

    savePointsToChunks: function(sessionId, lastChunkNumber, points, callback){
        var arr = [];
        var n = Math.floor(points.length / this.CHUNK_SIZE);
        var LocationDataChunk = Parse.Object.extend('LocationDataChunk');
        for (var i = 0; i < n; i++){
            var pts = points.slice(i * this.CHUNK_SIZE, (+i + 1) * this.CHUNK_SIZE);
            var c = new LocationDataChunk();
            c.set('sessionId', sessionId);
            c.set('number', (lastChunkNumber + 1 + i));
            c.set('t', pts.map(function(p){return p.t}));
            c.set('lat', pts.map(function(p){return p.lat}));
            c.set('lon', pts.map(function(p){return p.lon}));
            c.set('alt', pts.map(function(p){return p.alt}));
            c.set('acc', pts.map(function(p){return p.acc}));
            c.set('vel', pts.map(function(p){return p.vel}));
            c.set('bea', pts.map(function(p){return p.bea}));
            arr.push(c);
        }
        Parse.Object.saveAll(arr, {
            useMasterKey: true,
            success: function(savedChunks){
                callback();
            }
        });
    },

    filterPoints: function(points, lastTime){
        if (lastTime == undefined){
            return points;
        }
        var arr = [];
        for (var i in points){
            if (points[i].t > lastTime){
                arr.push(points[i]);
            }
        }
        return arr;
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
        this.loadLazylySessionByUserIdAndStartTimestamp(data.userId, data.startTimestamp, function(session){ //1
            var lastPointTime = session.get('lastPointTime');
            var lastChunkNumber = session.get('lastChunkNumber');
            var cachePointsNumber = session.get('cachePointsNumber');
            points = self.filterPoints(points, lastPointTime);
            if (points.length == 0){
                success(self.transformSession(session));
                return;
            }

            if (cachePointsNumber + points.length <= self.CHUNK_SIZE){
                //save only CachePoints
                self.saveCachePoints(data.sessionId, data.userId, points, function(){ // 2
                    session.set('cachePointsNumber', (cachePointsNumber + points.length));
                    session.save({useMasterKey: true}).then(function(savedSession){ // 3
                        success(self.transformSession(savedSession));
                    });
                });
                return;
            }

            self.loadCachePoints(data.sessionId, function(notTransformedCachePoints){ // 2
                var cachePoints = notTransformedCachePoints.map(function(r){return self.transformCachePoint(r)});
                points = cachePoints.concat(points);

                var newChunksAmount = Math.floor((points.length / self.CHUNK_SIZE));
                var chunkPointsForSaving = points.slice(0, newChunksAmount * self.CHUNK_SIZE);
                var cachePointsForSaving = points.slice(newChunksAmount * self.CHUNK_SIZE);
                self.savePointsToChunks(data.sessionId, lastChunkNumber, chunkPointsForSaving, function(){ // 3
                     self.saveCachePoints(data.sessionId, data.userId, cachePointsForSaving, function(){ // 4
                         session.set('lastChunkNumber', lastChunkNumber + newChunksAmount);
                         session.set('lastPointTime', points[points.length - 1].t);
                         session.set('cachePointsNumber', cachePointsForSaving.length);
                         session.save({useMasterKey: true}).them(function(savedSession){ // 5
                             Parse.Object.destroyAll(notTransformedCachePoints, { // 6
                                 useMasterKey: true,
                                 success: function(){
                                     success(self.transformSession(savedSession));
                                 }
                             });
                         });
                     });
                });

            });
        });
    },

    updateSession: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateSession: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateSession: id is not defined'});
            return;
        }
        var self = this;
        this.loadSession(data.id, function(session){
            if (session == undefined){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'updateSession: session is not found'});
                return;
            }
            var f = false;
            for (var key in data){
                if (key == 'id'){
                    continue;
                }
                f = true;
                session.set(key, data[key]);
            }
            if (f == true){
                session.save({useMasterKey: true}).then(function(savedSession){
                    success(self.transformSession(savedSession));
                });
                return;
            }
            success(self.transformSession(session));
        });
    },

    deleteSession: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteSession: data is undefined'});
            return;
        }
        if (data.sessionId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteSession: sessionId is not defined'});
            return;
        }
        var self = this;
        this.loadSession(data.sessionId, function(session){
            session.set('deleted', true);
            session.save({useMasterKey: true}).then(function(savedSession){
                success(self.transformSession(savedSession));
            });
        });
    }


};

module.exports = SessionModule;