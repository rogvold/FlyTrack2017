/**
 * Created by sabir on 20.09.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var assign = require('object-assign');

var SessionsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = true;
        this.sessionsMap = {};
        this.pointsMap = {};

        this.bindActions(
            constants.LOAD_SESSIONS, this.startLoading,
            constants.LOAD_SESSIONS_SUCCESS, this.sessionsLoaded,
            constants.LOAD_SESSIONS_FAIL, this.stopLoading,

            constants.LOAD_POINTS, this.startLoading,
            constants.LOAD_POINTS_FAIL, this.stopLoading,
            constants.LOAD_POINTS_SUCCESS, this.pointsLoaded,

            constants.DELETE_SESSION, this.startLoading,
            constants.DELETE_SESSION_SUCCESS, this.sessionDeleted,
            constants.DELETE_SESSION_FAIL, this.stopLoading,

            constants.UPDATE_SESSION, this.startLoading,
            constants.UPDATE_SESSION_SUCCESS, this.sessionUpdated,
            constants.UPDATE_SESSION_FAIL, this.stopLoading,


            constants.SAVE_PHOTO, this.startLoading,
            constants.SAVE_PHOTO_FAIL, this.stopLoading,
            constants.SAVE_PHOTO_SUCCESS, this.onPhotoSaved,

            constants.DELETE_PHOTO, this.startLoading,
            constants.DELETE_PHOTO_FAIL, this.stopLoading,
            constants.DELETE_PHOTO_SUCCESS, this.onPhotoDeleted


        );
    },

    sessionsLoaded: function(payload){
        this.loading = false;
        this.consumeSessions(payload.sessions);
        this.emit('change');
    },

    startLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    stopLoading: function(){
        this.loading = false;
        this.emit('change');
    },

    consumeSessions: function(sessions){
        if (sessions == undefined){
            return;
        }
        for (var i in sessions){
            var s = sessions[i];
            this.sessionsMap[s.id] = s;
        }
    },

    pointsLoaded: function(payload){
        console.log('pointsLoaded occured');
        this.loading = false;
        this.consumePoints(payload.sessionId, payload.points);
        console.log('points consumed - now emitting');
        this.emit('change');
    },

    consumePoints: function(sessionId, points){
        console.log('consumePoints: sessionId, points = ', sessionId, points);
        if (sessionId == undefined){
            return;
        }
        if (points == undefined || points.length == 0){
            return;
        }
        if (this.pointsMap[sessionId] == undefined){
            this.pointsMap[sessionId] = [];
        }
        var lastT = (this.pointsMap[sessionId].length == 0) ? -1 : this.pointsMap[sessionId].t;
        points = points.filter(function(a){return (a.t > lastT);});
        console.log('filtered points = ', points);
        if (points.length == 0){
            return;
        }
        this.pointsMap[sessionId] = this.pointsMap[sessionId].concat(points);
    },

    getSession: function(sessionId){
        if (sessionId == undefined){
            return undefined;
        }
        return this.sessionsMap[sessionId];
    },

    getSessionPoints: function(sessionId){
        if (sessionId == undefined){
            return [];
        }
        var session = this.getSession(sessionId);
        console.log('getSessionPoints: session = ', session);

        var t0 = +session.startTimestamp;
        var arr = (this.pointsMap[sessionId] == undefined) ? [] : this.pointsMap[sessionId];


        arr = arr.map(function(p){var a = assign({}, p, {t: p.t + t0}); return a;});
        if (arr == undefined){
            arr = [];
        }
        console.log('getSessionPoints: returning arr = ', arr);
        return arr;
    },

    getUserSessions: function(userId){
        if (userId == undefined){
            return [];
        }
        var arr = [];
        var map = this.sessionsMap;
        for (var key in map){
            var s = map[key];
            if (s == undefined){
                continue;
            }
            if (s.userId == userId){
                arr.push(s);
            }
        }
        arr.sort(function(a, b){
            var n1 = +a.startTimestamp;
            var n2 = +b.startTimestamp;
            return (n2 - n1);
        });
        console.log('getUserSessions occured: userId = ' + userId);
        console.log('returning arr = ', arr);
        return arr;
    },

    getAllSessions: function(){
        var arr = [];
        var map = this.sessionsMap;
        for (var key in map){
            var s = map[key];
            arr.push(s);
        }
        return arr;
    },

    getAllUserPhotos: function(userId){
        var arr = [];
        var sessions = this.getUserSessions(userId);
        for (var i in sessions){
            var s = sessions[i];
            var photos = (s.photos == undefined) ? [] : s.photos;
            arr = arr.concat(photos);
        }
        return arr;
    },

    getAllPhotos: function(){
        var arr = [];
        var sessions = this.getAllSessions();
        for (var i in sessions){
            var s = sessions[i];
            var photos = (s.photos == undefined) ? [] : s.photos;
            arr = arr.concat(photos);
        }
        return arr;
    },

    getSessionLineAndMarker: function(sessionId){
        var points = this.getSessionPoints(sessionId);
        var session = this.getSession(sessionId);
        var line = {id: session.userId, points: points};
        var marker = (points.length == 0) ? undefined : {id: session.userId, point: points[points.length - 1]};
        return {
            line: line,
            marker: marker
        }
    },

    onPhotoSaved: function(payload){
        var photo = payload.photo;
        if (this.sessionsMap[photo.sessionId] == undefined){
            return;
        }
        var photos = this.sessionsMap[photo.sessionId].photos;
        if (photos == undefined){
            photos = [];
        }
        photos.push(photo);
        this.loading = false;
        this.sessionsMap[photo.sessionId].photos = photos;
        this.emit('change');
    },

    getPhotoByUrl: function(url){
        var photos = this.getAllPhotos();
        for (var i in photos){
            var p = photos[i];
            if (p.url == url){
                return p;
            }
        }
        return undefined;
    },

    onPhotoDeleted: function(payload){
        console.log('SessionsStore: onPhotoDeleted: payload = ', payload);
        var id = payload.id;
        var arr = [];
        var map = this.sessionsMap;
        var sessionIdTarget = undefined;

        for (var key in map){
            var s = map[key];
            var photos = s.photos;
            for (var j in photos){
                var p = photos[j];
                if (p.id == id){
                    sessionIdTarget = key;
                }
            }
        }
        console.log('sessionIdTarget = ' + sessionIdTarget);
        if (sessionIdTarget == undefined){
            return;
        }
        var pts = map[sessionIdTarget].photos;
        for (var i in pts){
            if (pts[i].id == id){
                continue;
            }
            arr.push(pts[i]);
        }
        this.sessionsMap[sessionIdTarget].photos = arr;
        this.loading = false;
        this.emit('change');
    },

    getSessionsInRange: function(from, to){
        var arr = [];
        var list = this.getAllSessions();
        for (var i in list){
            var s = list[i];
            var t = s.startTimestamp;
            if (t >= from && t < to){
                arr.push(s);
            }
        }
        return arr;
    },

    sessionDeleted: function(payload){
        var id = payload.id;
        this.sessionsMap[id] = undefined;
        this.loading = false;
        this.emit('change');
    },

    sessionUpdated: function(payload){
        var s = payload.session;
        console.log('sessionUpdated: s = ', s);
        this.sessionsMap[s.id] = assign({}, this.sessionsMap[s.id], s);
        this.loading = false;
        this.emit('change');
    }

});

module.exports = SessionsStore;