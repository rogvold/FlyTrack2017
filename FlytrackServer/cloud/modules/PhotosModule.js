/**
 * Created by sabir on 22.09.16.
 */

var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');

var PhotosModule = {

    transformPhoto: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            timestamp: (new Date(p.createdAt)).getTime(),
            sessionId: p.get('sessionId'),
            userId: p.get('userId'),
            lat: p.get('lat'),
            lon: p.get('lon'),
            url: p.get('url'),
            compressedUrl: p.get('url')
        }
    },

    loadSessionPhotos: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSessionPhotos: data is undefined'});
            return;
        }
        if (data.sessionId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSessionPhotos: sessionId is undefined'});
            return;
        }
        var q = new Parse.Query('Photo');
        var self = this;
        q.limit(1000);
        q.equalTo('sessionId', data.sessionId);
        q.addDescending('createdAt');
        q.find({useMasterKey: true}).then(function(results){
            var photos = results.map(function(r){return self.transformPhoto(r)});
            success(photos);
        });
    },

    loadUserPhotos: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserPhotos: data is undefined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserPhotos: userId is undefined'});
            return;
        }
        var q = new Parse.Query('Photo');
        var self = this;
        q.limit(1000);
        q.equalTo('userId', data.userId);
        q.addDescending('createdAt');
        q.find({useMasterKey: true}).then(function(results){
            var photos = results.map(function(r){return self.transformPhoto(r)});
            success(photos);
        });
    },

    createPhoto: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createPhoto: data is undefined'});
            return;
        }
        if (data.userId == undefined || data.sessionId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createPhoto: userId is undefined'});
            return;
        }
        if (data.lat == undefined || data.lon == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createPhoto: lat or lon is undefined'});
            return;
        }
        var Photo = Parse.Object.extend('Photo');
        var p = new Photo();
        for (var key in data){
            p.set(key, data[key]);
        }
        var self = this;
        p.save(null, {useMasterKey: true}).then(function(savedPhoto){
            savedPhoto = self.transformPhoto(savedPhoto);
            success(savedPhoto);
        });
    },

    updatePhoto: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updatePhoto: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updatePhoto: id is undefined'});
            return;
        }
        var q = new Parse.Query('Photo');
        var self = this;
        q.get(data.id, {
            useMasterKey: true,
            success: function(photo){
                for (var key in data){
                    if (key == 'id'){
                        continue;
                    }
                    photo.set(key, data[key]);
                }
                photo.save(null, {useMasterKey: true}).then(function(savedPhoto){
                    success(self.transformPhoto(savedPhoto));
                });
            }
        });
    },

    deletePhoto: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deletePhoto: data is undefined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deletePhoto: id is undefined'});
            return;
        }
        var q = new Parse.Query('Photo');
        var self = this;
        q.get(data.id, {
            useMasterKey: true,
            success: function(photo){
                photo.destroy({
                    useMasterKey: true,
                    success: function(){
                        success();
                    }
                });
            }
        });
    },

    loadSessionsPhotos: function(sessionsIds, callback, shouldTransform){
        if (sessionsIds == undefined || sessionsIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('Photo');
        q.limit(1000);
        q.containedIn('sessionId', sessionsIds);
        q.addAscending('createdAt');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformPhoto(r)});
            }
            callback(results);
        });
    },

    loadUsersPhotos: function(usersIds, callback, shouldTransform){
        if (usersIds == undefined || usersIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('Photo');
        q.limit(1000);
        q.containedIn('userId', usersIds);
        q.addAscending('createdAt');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformPhoto(r)});
            }
            callback(results);
        });
    }

};

module.exports = PhotosModule;