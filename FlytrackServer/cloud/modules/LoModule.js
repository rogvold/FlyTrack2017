/**
 * Created by sabir on 21.09.16.
 */
var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var PhotosModule = require('../modules/PhotosModule');

var LoModule = {

    MAX_POINTS_NUMBER: 100,
    MAX_CACHE_POINTS_NUMBER: 140,
    MAX_QUERY_REQUEST_LIMIT: 1000,

    transformAirSession: function(sess){
        if (sess == undefined){
            return undefined;
        }
        return {
            id: sess.id,
            timestamp: new Date(sess.createdAt).getTime(),
            userId: sess.get('userId'),
            aircraftId: sess.get('aircraftId'),
            name: sess.get('name'),
            description: sess.get('description'),

            status: sess.get('status'),

            startTimestamp: sess.get('startTimestamp'),
            endTimestamp: sess.get('endTimestamp'),

            start: sess.get('startTimestamp'),
            end: sess.get('endTimestamp'),

            deleted: sess.get('deleted'),
            mapString: sess.get('mapString'),
            duration: sess.get('duration'),
            distance: sess.get('distance'),

            //important
            cachePointsNumber: (sess.get('cachePointsNumber') == undefined) ? 0 : sess.get('cachePointsNumber'),
            lastChunkNumber: (sess.get('lastChunkNumber') == undefined) ? 0 : sess.get('lastChunkNumber'),
            lastPointTime: (sess.get('lastPointTime') == undefined) ? 0 : sess.get('lastPointTime')

        }
    },

    transformDataChunk: function(chunk){
        if (chunk == undefined){
            return undefined;
        }
        return {
            id: chunk.id,
            sessionId: chunk.get('sessionId'),

            lat: chunk.get('lat') == undefined ? [] : chunk.get('lat'),
            lon: chunk.get('lon') == undefined ? [] : chunk.get('lon'),
            alt: chunk.get('alt') == undefined ? [] : chunk.get('alt'),

            acc: chunk.get('acc') == undefined ? [] : chunk.get('acc'),
            bea: chunk.get('bea') == undefined ? [] : chunk.get('bea'),
            vel: chunk.get('vel') == undefined ? [] : chunk.get('vel'),

            times: chunk.get('times') == undefined ? [] : chunk.get('times'),

            number: chunk.get('number')
        }
    },

    transformCachePoint: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            //timestamp: (new Date(p.createdAt)).getTime(),

            lat: p.get('lat'),
            lon: p.get('lon'),
            alt: p.get('alt'),
            acc: p.get('acc'),
            bea: p.get('bea'),
            vel: p.get('vel'),
            t: p.get('t'),

            sessionId: p.get('sessionId')
        }
    },

    loadAirSessions: function(arr, callback, shouldTransform){
        //console.log('loadAirSessions: arr = ' + JSON.stringify(arr));
        if (arr == undefined || arr.length == 0){
            console.log('loadAirSessions: arr is empty');
            callback([]);
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.limit(100000);
        var timestamps = arr.map(function(a){
            return a.startTimestamp;
        });
        var usersIds = arr.map(function(a){
            return a.userId;
        });
        var map = {};
        q.containedIn('startTimestamp', timestamps);
        var resArr = [];
        q.find({useMasterKey: true}).then(function(sessions){
            if (sessions == undefined){
                sessions = [];
            }

            for (var i in sessions){
                var userId = sessions[i].get('userId');
                map[userId] = sessions[i];
            }
            for (var i in usersIds){
                var uId = usersIds[i];
                if (map[uId] != undefined){
                    resArr.push(map[uId]);
                }
            }
            if (shouldTransform == true){
                resArr = resArr.map(function(ar){return self.transformAirSession(ar)});
            }
            callback(resArr);
        });
    },

    createAirSessions: function(arr, callback, shouldTransform){
        if (arr == undefined || arr.length == 0){
            callback([]);
            return;
        }
        var res = [];
        var self = this;
        var AirSession = Parse.Object.extend('AirSession');
        for (var i in arr){
            var a = arr[i];
            var sess = new AirSession();
            sess.set('userId', a.userId);
            sess.set('aircraftId', a.aircraftId);
            sess.set('startTimestamp', a.startTimestamp);
            sess.set('deleted', false);
            sess.set('cachePointsNumber', 0);
            sess.set('lastChunkNumber', -1);
            sess.set('lastPointTime', -1);

            res.push(sess);
        }
        Parse.Object.saveAll(res, {
            useMasterKey: true,
            success: function(savedSessions){
                if (savedSessions  == undefined){
                    savedSessions = [];
                }
                if (shouldTransform == true){
                    savedSessions = savedSessions.map(function(s){return self.transformAirSession(s)});
                }
                callback(savedSessions);
            }
        });
    },

    loadLazyAirSessions: function(arr, callback, shouldTransform){
        var self = this;
        var existingMap = [];
        this.loadAirSessions(arr, function(existingSessions){
            for (var i in existingSessions){
                var sess = existingSessions[i];
                var userId = (shouldTransform == true) ? sess.userId : sess.get('userId');
                existingMap[userId] = sess;
            }
            var notExArr = [];
            for (var i in arr){
                var a = arr[i];
                if (existingMap[a.userId] == undefined){
                    notExArr.push(a);
                }
            }
            self.createAirSessions(notExArr, function(newSessions){
                var resSessions = existingSessions.concat(newSessions);
                callback(resSessions);
            }, shouldTransform);
        }, shouldTransform);
    },

    //map[userId] - session of userId
    loadLazyAirSessionsUsersData: function(arr, callback, shouldTransform){
        console.log('loadLazyAirSessionsUsersData occured');
        var self = this;
        var map = {};
        this.loadLazyAirSessions(arr, function(sessions){
            for (var i in sessions){
                var sess = sessions[i];
                var userId = (shouldTransform == true) ? sess.userId : sess.get('userId');
                map[userId] = {
                    session: sess
                }
            }
            callback({
                sessionsMap: map,
                sessions: sessions
            });
        }, shouldTransform);
    },

    loadCachePointsSessionIdData: function(sessionsIds, callback, shouldTransform){
        var map = {};
        if (sessionsIds == undefined){
            return undefined;
        }
        var self = this;
        var q = new Parse.Query('CachePoint');
        q.limit(1000);
        q.containedIn('sessionId', sessionsIds);
        // q.addAscending('t');
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined || results.length == 0){
                results = [];
            }

            for (var i in results){
                var p = results[i];
                var sessionId = p.get('sessionId');
                if (map[sessionId] == undefined){
                    map[sessionId] = [];
                }
                if (shouldTransform == true){
                    p = self.transformCachePoint(p);
                }
                map[sessionId].push(p);
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformCachePoint(r)}).sort(function(a, b){
                    return (a.timestamp - b.timestamp)
                });
            }
            callback({
                cachePointsSessionsMap: map,
                cachePoints: results
            });
        });
    },

    destroyCachePoints: function(notTransformedCachePoints, callback){
        if (notTransformedCachePoints == undefined || notTransformedCachePoints.length == 0){
            callback();
            return;
        }
        Parse.Object.destroyAll(notTransformedCachePoints, {
            useMasterKey: true,
            success: function(){
                callback();
            }
        });
    },


    saveCachePointsToChunks: function(notTransformedSessions, callback){
        var self = this;
        var sessionsIds = notTransformedSessions.map(function(s){return s.id});
        var sessions = notTransformedSessions;
        var sessionsMap = {};
        for (var i in sessions){
            sessionsMap[sessions[i].id] = sessions[i];
        }
        var LocationDataChunk = Parse.Object.extend('LocationDataChunk');
        this.loadCachePointsSessionIdData(sessionsIds, function(data){
            var allNotTransformedCachePoints = data.cachePoints;
            var cachePointsSessionsMap = data.cachePointsSessionsMap;
            var chunksArray = [];
            for (var sessionId in cachePointsSessionsMap){
                if (cachePointsSessionsMap[sessionId] == undefined || cachePointsSessionsMap[sessionId].length == 0){
                    continue;
                }
                var session = sessionsMap[sessionId];
                var cachePoints = cachePointsSessionsMap[sessionId];
                var lastChunkNumber = (session.get('lastChunkNumber') == undefined) ? -1 : session.get('lastChunkNumber');
                var chunkNumber = lastChunkNumber + 1;
                var chunk = new LocationDataChunk();
                chunk.set('sessionId', session.id);
                chunk.set('number', chunkNumber);

                var lat = cachePoints.map(function(cp){return cp.get('lat')});
                var lon = cachePoints.map(function(cp){return cp.get('lon')});
                var alt = cachePoints.map(function(cp){return cp.get('alt')});
                var acc = cachePoints.map(function(cp){return cp.get('acc')});
                var vel = cachePoints.map(function(cp){return cp.get('vel')});
                var bea = cachePoints.map(function(cp){return cp.get('bea')});

                var times = cachePoints.map(function(cp){return +cp.get('t')});

                chunk.set('lat', lat);
                chunk.set('lon', lon);
                chunk.set('alt', alt);
                chunk.set('acc', acc);
                chunk.set('vel', vel);
                chunk.set('bea', bea);

                chunk.set('times', times);

                chunksArray.push(chunk);
                sessionsMap[sessionId].set('lastChunkNumber', chunkNumber);
            }
            var fulfilledSessions = [];
            for (var i in sessions){
                var sId = sessions[i].id;
                if (sessionsMap[sId] != undefined){
                    fulfilledSessions.push(sessionsMap[sId]);
                }else {
                    fulfilledSessions.push(sessions[i]);
                }
            }
            Parse.Object.saveAll(chunksArray, {
                useMasterKey: true,
                success: function(savedChunks){
                    self.destroyCachePoints(allNotTransformedCachePoints, function(){
                        callback(fulfilledSessions);
                    });
                }
            });
        }, false);
    },

    saveCachePointsOfSessionToChunk: function(notTransformedSession, callback){
        var self = this;
        this.saveCachePointsToChunks([notTransformedSession], function(sessionsToSave){
            if (sessionsToSave == undefined || sessionsToSave.length == 0){
                callback(notTransformedSession);
            }else {
                callback(sessionsToSave[0]);
            }
        });
    },

    savePointsToCachePoints: function(sessionsMap, callback){
        console.log('savePointsToCachePoints: sessionsMap = ' + JSON.stringify(sessionsMap));

        var CachePoint = Parse.Object.extend('CachePoint');
        var cpApp = [];
        for (var userId in sessionsMap){
            var d = sessionsMap[userId];

            var lat = d.lat;
            var lon = d.lon;
            var alt = d.alt;
            var acc = d.acc;
            var bea = d.bea;
            var vel = d.vel;

            var times = d.times;

            var session = d.session;

            for (var i in lat){
                var _lat = lat[i];
                var _lon = lon[i];
                var _alt = alt[i];
                var _acc = acc[i];
                var _bea = bea[i];
                var _vel = vel[i];

                var t = times[i];

                var point = new CachePoint();

                point.set('t', t);

                point.set('lat', _lat);
                point.set('lon', _lon);
                point.set('alt', _alt);
                point.set('acc', _acc);
                point.set('bea', _bea);
                point.set('vel', _vel);


                point.set('sessionId', session.id);
                cpApp.push(point);
            }
        }
        Parse.Object.saveAll(cpApp, {
            useMasterKey: true,
            success: function(savedCachePoints){
                callback(savedCachePoints);
            }
        });
    },


    uploadAirPoints: function(uData, callback){
        var self = this;
        var arr = [uData];
        this.loadLazyAirSessionsUsersData(arr, function(sessionsData){ //sessionsMap: userId - ParseAirSession
            console.log('sessionData = ', sessionsData);
            var totalCachePointsNumber = 0;
            var sessionsMap = sessionsData.sessionsMap;
            var sessions = sessionsData.sessions;
            for (var i in arr){
                var a = arr[i];
                var sess = sessionsMap[a.userId].session;
                var lastT = (sess.get('lastPointTime') == undefined) ? -1 : +sess.get('lastPointTime');
                var cachePointsNumber = (sess.get('cachePointsNumber') == undefined) ? 0 : sess.get('cachePointsNumber');

                //var rrs = a.rrs.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var lat = a.lat.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var lon = a.lon.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var alt = a.alt.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var acc = a.acc.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var bea = a.bea.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                var vel = a.vel.filter(function(r, k){var t = a.times[k]; return (t > lastT)});

                var times = a.times.filter(function(t, k){return (t > lastT)});


                //sessionsMap[a.userId].rrs = rrs;
                sessionsMap[a.userId].lat = lat;
                sessionsMap[a.userId].lon = lon;
                sessionsMap[a.userId].alt = alt;
                sessionsMap[a.userId].acc = acc;
                sessionsMap[a.userId].bea = bea;
                sessionsMap[a.userId].vel = vel;
                sessionsMap[a.userId].times = times;



                var lastPointTime = sess.get('lastPointTime') == undefined ? -1 : sess.get('lastPointTime');
                lastPointTime = (times == undefined || times.length == 0) ? lastPointTime : times[times.length - 1];
                sessionsMap[a.userId].lastPointTime = lastPointTime;

                totalCachePointsNumber = totalCachePointsNumber + cachePointsNumber + lat.length;
            }
            if (totalCachePointsNumber > self.MAX_QUERY_REQUEST_LIMIT - arr.length * self.MAX_POINTS_NUMBER){
                self.saveCachePointsToChunks(sessions, function(fulfilledSessions){
                    //fulfilledSessions - chunk number is updated
                    self.savePointsToCachePoints(sessionsMap, function(savedCachePoints){
                        for (var i in fulfilledSessions){
                            var oldCachePointsNumber = (fulfilledSessions[i].get('cachePointsNumber') == undefined) ? 0 : fulfilledSessions[i].get('cachePointsNumber');
                            var deltaN = sessionsMap[fulfilledSessions[i].get('userId')].lat.length;
                            var newNum = oldCachePointsNumber + deltaN;
                            fulfilledSessions[i].set('cachePointsNumber', deltaN);
                            fulfilledSessions[i].set('lastPointTime', sessionsMap[fulfilledSessions[i].get('userId')].lastPointTime);
                        }
                        Parse.Object.saveAll(fulfilledSessions, {
                            useMasterKey: true,
                            success: function(savedSessions){
                                savedSessions = savedSessions.map(function(s){return self.transformAirSession(s)});
                                callback(savedSessions);
                            }
                        });
                    });
                });
            }else {
                self.savePointsToCachePoints(sessionsMap, function(savedCachePoints){
                    for (var i in sessions){
                        var oldCachePointsNumber = (sessions[i].get('cachePointsNumber') == undefined) ? 0 : sessions[i].get('cachePointsNumber');
                        var deltaN = sessionsMap[sessions[i].get('userId')].lat.length;
                        var newNum = oldCachePointsNumber + deltaN;
                        sessions[i].set('cachePointsNumber', newNum);
                        sessions[i].set('lastPointTime', sessionsMap[sessions[i].get('userId')].lastPointTime);
                    }
                    Parse.Object.saveAll(sessions, {
                        useMasterKey: true,
                        success: function(savedSessions){
                            savedSessions = savedSessions.map(function(s){return self.transformAirSession(s)});
                            callback(savedSessions);
                        }
                    });
                });
            }

        }, false);
    },


    //loading zone

    loadSessionChunks: function(sessionId, callback){
        if (sessionId == undefined){
            return;
        }
        var q = new Parse.Query('LocationDataChunk');
        q.limit(1000);
        q.equalTo('sessionId', sessionId);
        // q.addAscending('number');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformDataChunk(r)}).sort(function(a, b){
                return (a.number - b.number)
            });
            callback(arr);
        });
    },

    loadSessionsChunks: function(sessionsIds, callback){
        if (sessionsIds == undefined || sessionsIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('LocationDataChunk');
        q.limit(1000);
        q.containedIn('sessionId', sessionsIds);
        // q.addAscending('number');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformDataChunk(r)}).sort(function(a, b){
                return (a.number - b.number)
            });
            callback(arr);
        });
    },

    loadSessionsPointsAsMapFromChunks: function(sessionsIds, callback){
        var self = this;
        var map = {};
        console.log('loadSessionsPointsAsMapFromChunks occured: sessionsIds = ' + JSON.stringify(sessionsIds));
        this.loadSessionsChunks(sessionsIds, function(chunks){
            for (var i in chunks){
                var ch = chunks[i];
                if (map[ch.sessionId] == undefined){
                    map[ch.sessionId] = {
                        lat: [], lon: [], times: [], alt: [], acc: [], bea: [], vel: []
                    };
                }
                map[ch.sessionId].lat = map[ch.sessionId].lat.concat(ch.lat);
                map[ch.sessionId].lon = map[ch.sessionId].lon.concat(ch.lon);
                map[ch.sessionId].alt = map[ch.sessionId].alt.concat(ch.alt);
                map[ch.sessionId].acc = map[ch.sessionId].acc.concat(ch.acc);
                map[ch.sessionId].bea = map[ch.sessionId].bea.concat(ch.bea);
                map[ch.sessionId].vel = map[ch.sessionId].vel.concat(ch.vel);
                map[ch.sessionId].times = map[ch.sessionId].times.concat(ch.times);
            }
            console.log('loadSessionsChunks: success');
            callback(map);
        })
    },

    loadSessionsCachePoints: function(sessionsIds, callback){
        if (sessionsIds == undefined){
            callback([]);
            return;
        }
        console.log('loadSessionsCachePoints occured: sessionsIds = ' + JSON.stringify(sessionsIds));
        var q = new Parse.Query('CachePoint');
        q.limit(10000000);
        // q.addAscending('t');
        q.containedIn('sessionId', sessionsIds);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            console.log('loadSessionsCachePoints: success');
            results = results.map(function(r){return self.transformCachePoint(r)}).sort(function(a, b){
                return (a.t - b.t)
            });
            callback(results);
        });
    },

    loadSessionsCachePointsAsMap: function(sessionsIds, callback){
          var self = this;
          var map = {};
          console.log('loadSessionsCachePointsAsMap: sessionsIds = ' + JSON.stringify(sessionsIds));
          this.loadSessionsCachePoints(sessionsIds, function(points){
              for (var i in points){
                  var p = points[i];
                  if (map[p.sessionId] == undefined){
                      map[p.sessionId] = {
                          lat: [], lon: [], times: [], alt: [], acc: [], bea: [], vel: []
                      };
                  }
                  map[p.sessionId].lat.push(p.lat);
                  map[p.sessionId].lon.push(p.lon);
                  map[p.sessionId].acc.push(p.acc);
                  map[p.sessionId].bea.push(p.bea);
                  map[p.sessionId].vel.push(p.vel);
                  map[p.sessionId].alt.push(p.alt);
                  map[p.sessionId].times.push(p.t);
              }
              callback(map);
          });
    },

    loadSessionsPointsMap: function(sessionsIds, callback){
        if (sessionsIds == undefined || sessionsIds.length == 0){callback({});}
        var map = {}, self = this;
        for (var i in sessionsIds){
            map[sessionsIds[i]] = {lat: [], lon: [], times: [], alt: [], acc: [], bea: [], vel: []}
        }
        this.loadSessionsPointsAsMapFromChunks(sessionsIds, function(chunksMap){
            self.loadSessionsCachePointsAsMap(sessionsIds, function(pointsMap){
                for (var sId in map){
                    map[sId].lat = map[sId].lat.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].lat).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].lat);
                    map[sId].lon = map[sId].lon.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].lon).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].lon);
                    map[sId].alt = map[sId].alt.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].alt).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].alt);
                    map[sId].acc = map[sId].acc.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].acc).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].acc);
                    map[sId].bea = map[sId].bea.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].bea).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].bea);
                    map[sId].vel = map[sId].vel.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].vel).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].vel);
                    map[sId].times = map[sId].times.concat(chunksMap[sId] == undefined ? [] : chunksMap[sId].times).concat(pointsMap[sId] == undefined ? [] : pointsMap[sId].times);
                }
                callback(map);
            });
        });
    },

    loadSessionsInTimeSpan: function(data, callback, error){
        if (data == undefined || data.from == undefined || data.to == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'from or to is not defined'});
            return;
        }
        var from = +data.from, to = + data.to;
        var q = new Parse.Query('AirSession');
        var self = this;
        q.limit(100000);
        // q.addAscending('startTimestamp');
        q.greaterThan('startTimestamp', from);
        q.lessThan('startTimestamp', to);
        q.find(function(results){
            results = results.map(function(r){
                return self.transformAirSession(r);
            }).sort(function(a, b){
                return (a.startTimestamp - b.startTimestamp)
            })
            callback(results);
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

    loadCachePoints: function(sessionId, callback){
        if (sessionId == undefined){
            return;
        }
        var q = new Parse.Query('CachePoint');
        q.limit(1000);
        // q.addAscending('t');
        q.equalTo('sessionId', sessionId);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformCachePoint(r)}).sort(function(a, b){
                return (a.t - b.t);
            });
            callback(results);
        });
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
                    self.loadCachePoints(sessionId, function(cachePoints){
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

    loadSession: function(data, success, error, shouldTransform){
        if (shouldTransform == undefined){
            shouldTransform = true;
        }
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSession: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSession: id is undefined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.get(data.id, {
            useMasterKey: true,
            success: function(session){
                if (shouldTransform == true){
                    session = self.transformAirSession(session);
                }
                success(session);
            },
            error: function(){
                error({code: ECR.NOT_FOUND.code, message: 'loadSession: session is not found'});
            }
        });
    },

    loadUserSessions: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserSessions: data is undefined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserSessions: userId is undefined'});
            return;
        }

        var q = new Parse.Query('AirSession');
        var self = this;
        q.equalTo('userId', data.userId);
        q.equalTo('deleted', false);
        q.limit(1000);
        q.addDescending('startTimestamp');
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            var arr = results.map(function(r){return self.transformAirSession(r)});
            PhotosModule.loadUserPhotos({userId: data.userId}, function(photos){
                var map = {};
                for (var i in photos){
                    var p = photos[i];
                    if (map[p.sessionId] == undefined){
                        map[p.sessionId] = [];
                    }
                    map[p.sessionId].push(p);
                }
                for (var i in arr){
                    var pts = map[arr[i].id] == undefined ? [] : map[arr[i].id];
                    arr[i].photos = pts;
                }
                success(arr);
            }, function(){

            });

        });
    },


    //for migration
    loadSessionGoogleMapsString: function(sessionId, callback){
        if (sessionId == undefined){
            return;
        }
        var self = this;
        this.loadSession({id: sessionId}, function(sess){
            var mapString = sess.get('mapString');
            if (mapString != undefined){
                callback(mapString);
                return;
            }
            self.loadSessionPoints(sessionId, function(points){
                var n = points.length;
                var dN = Math.ceil(n / 60);
                var arr = [];
                for (var i = 0; i < n; i = i + dN){
                    arr.push(points[i].lat + ',' + points[i].lon);
                }
                var s = arr.join('|');
                //console.log('s = ' + s);
                if (mapString == undefined || mapString == ''){
                    sess.set('mapString', s);
                    sess.save(null, {useMasterKey: true}).then(function(savedSession){
                        callback(s);
                    });
                }
            });
        }, function(err){

        }, false);
    },

    finishAirSession: function(data, success, error, clearMode){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishAirSession: data is undefined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishAirSession: userId is undefined'});
            return;
        }
        if (data.startTimestamp == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishAirSession: startTimestamp is undefined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.equalTo('startTimestamp', data.startTimestamp);
        q.equalTo('userId', data.userId);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined || results.length == 0){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'session is not found'});
                return;
            }
            var session = results[0];
            self.loadSessionPoints(session.id, function(points){
                if (points == undefined || points.length == 0){
                    error({code: ECR.UNKNOWN_ERROR.code, message: 'you can not finish empty session '});
                    return;
                }
                var mapString = CommonHelper.getGoogleStringByPoints(points);
                var distance = CommonHelper.getDistanceByPoints(points);

                session.set('mapString', mapString);
                session.set('distance', distance);
                session.set('duration', session.get('lastPointTime'));

                if (clearMode == true){
                    success(session);
                }else {
                    session.save(null, {useMasterKey: true}).then(function(savedSession){
                        success(self.transformAirSession(savedSession));
                    });
                }
            });
        });
    },

    finishSessionAndCleanCachePoints: function(data, success, error){
        var self = this;
        this.finishAirSession(data, function(session){
            self.saveCachePointsOfSessionToChunk(session, function(updatedSession){
                updatedSession.set('cachePointsNumber', 0);
                updatedSession.save(null, {useMasterKey: true}).then(function(savedSession){
                    success(self.transformAirSession(savedSession));
                });
            });
        }, error, true);
    },

    loadSessionsInRangeOfUsersIds: function(from, to, usersIds, callback){
        var q = new Parse.Query('AirSession');
        q.limit(1000);
        q.greaterThan('startTimestamp', from);
        q.lessThan('startTimestamp', to);
        if (usersIds != undefined && usersIds.length > 0){
            q.containedIn('userId', usersIds);
        }
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            results = results.map(function(r){return self.transformAirSession(r)});
            callback(results);
        });
    },

    loadNotFinishedSessions: function(){

    },

    updateSession: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateSession: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateSession: id is undefined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.get(data.id, {
            useMasterKey: true,
            success: function(session){
                for (var key in data){
                    if (key == undefined){
                        return;
                    }
                    session.set(key, data[key]);
                }
                session.save(null, {useMasterKey: true}).then(function(savedSession){
                    savedSession = self.transformAirSession(savedSession);
                    success(savedSession);
                });
            }
        });
    },

    deleteSession: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteSession: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteSession: id is undefined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('AirSession');
        q.get(data.id, {
            useMasterKey: true,
            success: function(session){
                session.set('deleted', true);
                session.save(null, {useMasterKey: true}).then(function(savedSession){
                    savedSession = self.transformAirSession(savedSession);
                    success(savedSession);
                });
            }
        });
    }

};

module.exports = LoModule;