/**
 * Created by sabir on 21.06.16.
 */
var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');

var UsersModule = {

    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        return {
            id: u.id,
            email: u.get('email'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            phone: u.get('phone'),
            aboutMe: u.get('aboutMe'),
            avatar: u.get('avatar'),
            organizationId: u.get('organizationId'),
            timestamp: new Date(u.createdAt).getTime(),
            birthdayTimestamp: new Date(u.get('birthdayTimestamp')).getTime(),
            role: u.get('userRole')
        }
    },

    logIn: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.email == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not defined'});
            return;
        }
        if (data.password == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'password is not defined'});
            return;
        }
        var self = this;
        Parse.User.logIn(data.email.toLowerCase(), data.password, {
            useMasterKey: true,
            success: function(user){
                var sessionToken = user.sessionToken;
                var u = self.transformUser(user);
                u.sessionToken = user.get('sessionToken');
                success(u);
            },
            error: function(){
                error({code: ECR.INCORRECT_LOGIN_CREDENTIALS.code, message: 'cannot login'});
            }
        });
    },

    signUp: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.email == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not defined'});
            return;
        }
        if (data.password == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'password is not defined'});
            return;
        }
        var user = new Parse.User();
        user.set("username", data.email.toLowerCase());
        user.set("password", data.password);
        user.set("email", data.email.toLowerCase());
        if (data.userRole == undefined){
            data.userRole = 'user';
        }
        user.set('userRole', data.userRole);
        var self = this;
        user.signUp(null, {
            useMasterKey: true,
            success: function(user) {
                self.logIn(data, success, error);
            },
            error: function(user, err) {
                error({code: ECR.INCORRECT_SIGNUP_CREDENTIALS.code, message: 'cannot sign up'});
            }
        });
    },

    loadUser: function(userId, callback, shouldTransform){
        shouldTransform = (shouldTransform == undefined) ? false : shouldTransform;
        if (userId == undefined){
            callback(undefined);
            return;
        }
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, {
            useMasterKey: true,
            success: function(u){
                if (shouldTransform == true){
                    u = self.transformUser(u);
                }
                callback(u);
            },
            error: function(){
                callback(undefined);
            }
        });
    },

    loadUserByEmail: function(email, callback, notFoundCallback){
        var q = new Parse.Query(Parse.User);
        q.equalTo('email', email);
        var self = this;
        q.find({
            useMasterKey: true,
            success: function(results){
                if (results == undefined || results.length == 0){
                    notFoundCallback();
                    return;
                }
                callback(self.transformUser(results[0]));
            }
        });
    },

    createUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.firstName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'firstName is not defined'});
            return;
        }
        if (data.lastName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'lastName is not defined'});
            return;
        }

        if (data.password == undefined || data.password.length < 3){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'Password is not defined or too short. Min password length is 3'});
            return;
        }


        if (data.email == undefined || CommonHelper.validateEmail(data.email) == false){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not valid'});
            return;
        }

        if (data.userRole == undefined){
            data.userRole = 'user';
            //error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userRole is not defined'});
            //return;
        }

        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }

        var self = this;
        this.loadUserByEmail(data.email, function(foundUser){
            error({code: ECR.USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS.code, message: 'user with specified email already exists'});
        }, function(){
            var user = new Parse.User();
            user.set('username', data.email);
            user.set('email', data.email);
            user.set('password', data.password);


            user.set('firstName', data.firstName);
            user.set('lastName', data.lastName);
            user.set('phone', data.phone);
            user.set('userRole', data.userRole);
            user.set('organizationId', data.organizationId);

            user.signUp(null, {
                useMasterKey: true,
                success: function(user){
                    success(self.transformUser(user));
                },
                error: function(err){
                    error({code: ECR.UNKNOWN_ERR.code, message: 'some problems during signing up'});
                }
            });
        });
    },

    updateUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadUser(data.id, function(u){
            for (var key in data){
                if (key == 'id' || key == 'role' || key == 'userRole' || key == 'needSetup' || key == 'organization' || key == 'hasAircrafts' || key == 'aircrafts'){
                    continue;
                }
                u.set(key, data[key]);
            }
            u.save(null, {useMasterKey: true}).then(function(updatedUser){
                success(self.transformUser(updatedUser));
            });
        });
    },

    loadOrganizationUsers: function(organizationId, callback){
        if (organizationId == undefined){
            return;
        }
        var q = new Parse.Query(Parse.User);
        q.equalTo('organizationId', organizationId);
        q.limit(1000);
        q.addAscending('lastName');
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformUser(r)});
            callback(results);
        });
    },

    loadUsersByIds: function(usersIds, callback){
        if (usersIds == undefined || usersIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query(Parse.User);
        q.limit(100000);
        q.containedIn('objectId', usersIds);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            var users = results.map(function(r){
                return self.transformUser(r)
            });
            callback(users);
        });
    },

    loadUsersMapByIds: function(usersIds, callback){
        var map = {};
        var self = this;
        this.loadUsersByIds(usersIds, function (users) {
            for (var i in users){
                var u = users[i];
                map[u.id] = u;
            }
            callback(map);
        });
    }

};

module.exports = UsersModule;