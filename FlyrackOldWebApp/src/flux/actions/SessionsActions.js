/**
 * Created by sabir on 20.09.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var SessionsActions = {

    loadUserSessions: function(userId, callback){
        console.log('--->>> SessionsActions: loadUserSessions: userId = ' + userId);
        if (userId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_SESSIONS, {userId: userId});
        ParseAPI.runCloudFunction("getUserSessions", {userId: userId}, function(sessions){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            var users = sessions.map(function(s){
                return s.user;
            });
            this.flux.actions.consumeUsers(users);
            setTimeout(function(){
                this.dispatch(constants.LOAD_SESSIONS_SUCCESS, {userId: userId, sessions: sessions});
            }.bind(this), 10);
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_SESSIONS_FAIL, {error: err});
        }.bind(this));
    },

    loadSessionPoints: function(sessionId, callback){
        if (sessionId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_POINTS, {sessionId: sessionId});
        ParseAPI.runCloudFunction("getSessionPoints", {sessionId: sessionId}, function(points){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.LOAD_POINTS_SUCCESS, {sessionId: sessionId, points: points});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_POINTS_FAIL, {error: err});
        }.bind(this));
    },

    loadSessionsInRange: function(from , to){
        if (from == undefined || to == undefined){
            return;
        }

    },

    deleteSession: function(data, callback){
        if (data == undefined || data.id == undefined){
            return;
        }
        this.dispatch(constants.DELETE_SESSION, data);
        ParseAPI.runCloudFunction("deleteSession", data, function(data){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_SESSION_SUCCESS, data);
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_SESSION_FAIL, {error: err});
        }.bind(this));
    },

    updateSession: function(data, callback){
        if (data == undefined || data.id == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_SESSION, data);
        ParseAPI.runCloudFunction("updateSession", data, function(session){
            setTimeout(function(){
                this.dispatch(constants.UPDATE_SESSION_SUCCESS, {session: session});
            }.bind(this), 10);

            if (callback != undefined){
                callback();
            }
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_SESSION_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = SessionsActions;