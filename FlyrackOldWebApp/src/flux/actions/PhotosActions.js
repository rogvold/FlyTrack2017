/**
 * Created by sabir on 25.09.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var PhotosActions = {

    savePhoto: function(data, callback){
        if (data == undefined || data.sessionId == undefined || data.userId == undefined){
            return;
        }
        this.dispatch(constants.SAVE_PHOTO, data);
        ParseAPI.runCloudFunction("savePhoto", data, function(photo){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.SAVE_PHOTO_SUCCESS, {photo: photo});
        }.bind(this), function(err){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.SAVE_PHOTO_FAIL, {error: err});
        }.bind(this));
    },

    deletePhoto: function(url, callback){
        var store = this.flux.store('SessionsStore');
        var photo = store.getPhotoByUrl(url);
        if (photo == undefined){
            return;
        }
        console.log('deletePhoto: url, photo = ', url, photo);
        this.dispatch(constants.DELETE_PHOTO, {id: photo.id});
        ParseAPI.runCloudFunction("deletePhoto", {id: photo.id}, function(data){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_PHOTO_SUCCESS, data);
        }.bind(this), function(err){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_PHOTO_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = PhotosActions;