
var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var UsersModule = require('./UsersModule');

var UserLinksModule = {

    transformLink: function(l){
        if (l == undefined){
            return undefined;
        }
        return {
            id: l.id,
            timestamp: (new Date(l.createdAt)).getTime(),

            creatorId: l.get('creatorId'),
            friendId: l.get('friendId'),
            status: l.get('status'),

            creatorCanWrite: l.get('creatorCanWrite')

        }
    },

    createLink: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.creatorId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'creatorId is not defined'});
            return;
        }
        if (data.friendId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'friendId is not defined'});
            return;
        }
        var q = new Parse.Query('UserLink');
        var self = this;
        q.equalTo('creatorId', data.creatorId);
        q.equalTo('friendId', data.friendId);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            if (results.length > 0){
                var link = self.transformLink(results[0]);
                success(link);
                return;
            }
            var UserLink = Parse.Object.extend('UserLink');
            var link = new UserLink();
            for (var key in data){
                link.set(key, data[key]);
            }
            link.save(null, {useMasterKey: true}).then(function(savedLink){
                success(self.transformLink(savedLink));
            });
        });
    },

    deleteLink: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('UserLink');
        q.get(data.id, {
            success: function(loadedLink){
                loadedLink.destroy({
                    success: function(){
                        success();
                    }
                });
            },
            error: function(){
                error({code: ECR.NOT_FOUND.code, message: 'link with id = ' + data.id + ' is not found'});
            }
        });
    },

    deleteLinkByCreatorIdAndFriendId: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.creatorId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'creatorId is not defined'});
            return;
        }
        if (data.friendId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'friendId is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('UserLink');
        q.equalTo('creatorId', data.creatorId);
        q.equalTo('friendId', data.friendId);
        q.find({useMasterKey: true}).then(function(resuts){
            if (resuts == undefined){
                resuts = [];
            }
            if (resuts.length == 0){
                success(data);
                return;
            }else {
                var link = resuts[0];
                link.destroy({
                    success: function(){
                        success(data);
                    },
                    error: function(){
                        error({code: ECR.UNKNOWN_ERROR.code, message: "can not make unfriending"});
                    }
                });
            }
        });

    },

    updateLink: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('UserLink');
        q.get(data.id, {
            success: function(loadedLink){
                for (var key in data){
                    if (key == 'id' || key == 'creatorId' || key == 'friendId'){
                        continue;
                    }
                    loadedLink.set(key, data[key]);
                }
                loadedLink.save(null, {useMasterKey: true}).then(function(savedLink){
                    success(self.transformLink(savedLink));
                });
            },
            error: function(){
                error({code: ECR.NOT_FOUND.code, message: 'link with id = ' + data.id + ' is not found'});
            }
        });
    },

    loadUserUserLinks: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var self = this;
        var followersQuery = new Parse.Query('UserLink');
        followersQuery.equalTo('friendId', data.userId);
        var followingQuery = new Parse.Query('UserLink');
        followingQuery.equalTo('creatorId', data.userId);
        var q = Parse.Query.or(followingQuery, followersQuery);
        q.limit(10000);
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }

            results = results.map(function(r){
                return self.transformLink(r);
            });
            var usersIds = CommonHelper.getUniqueArray(
                results.map(function(r){return r.creatorId})
                    .concat(
                        results.map(function(r){return r.friendId})
                    ));
            UsersModule.loadUsersByIds(usersIds, function(users){
                success({
                    users: users,
                    links: results
                });
            });
        });
    },

    loadFriendsIds: function(userId, callback){
        var q = new Parse.Query('UserLink');
        q.equalTo('creatorId', userId);
        q.addDescending('createdAt');
        q.limit(100000);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformLink(r);
            });
            var usersIds = results.map(function(r){return r.friendId});
            callback(usersIds);
        });
    },

    loadFriends: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var q = new Parse.Query('UserLink');
        q.equalTo('creatorId', data.userId);
        q.addDescending('createdAt');
        q.limit(100000);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformLink(r);
            });
            var usersIds = results.map(function(r){return r.friendId});
            UsersModule.loadUsersMapByIds(usersIds, function(usersMap){
                var arr = [];
                for (var i in results){
                    arr.push(usersMap[results[i].friendId]);
                }
                success(arr);
            });
        });
    }


};

module.exports = UserLinksModule;