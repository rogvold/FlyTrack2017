var ECR = require('./helpers/ErrorCodesRegistry');
var AircraftsModule = require('./modules/AircraftsModule');
var LocationModule = require('./modules/LocationModule');
var LoModule = require('./modules/LoModule');
var OrganizationsModule = require('./modules/OrganizationsModule');
var UsersModule = require('./modules/UsersModule');
var PhotosModule = require('./modules/PhotosModule');

var UserLinksModule = require('./modules/UserLinksModule');

var CommonHelper = require('./helpers/CommonHelper');



// var crypto = require('crypto');
// require('cloud/app.js');
//WEB

//user
Parse.Cloud.define("createUser", function(request, response) {
    var data = request.params.data;

    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createUser: data is undefined'});
        return;
    }
    //todo: check permission
    UsersModule.createUser(data, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    });
});


//ANDROID


//users

Parse.Cloud.define("login", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }

    UsersModule.logIn(data, function(user){
        AircraftsModule.loadUsersAircrafts({userId: user.id}, function(aircrafts){
            var hasAircrafts = (aircrafts == undefined || aircrafts.length == 0) ? false : true;
            user.hasAircrafts = hasAircrafts;
            //user.aircrafts = (aircrafts == undefined) ? [] : aircrafts;
            var needsSetup = false;
            if (hasAircrafts == false){
                needsSetup = true;
            }
            if (CommonHelper.isEmptyString(user.firstName) == true && CommonHelper.isEmptyString(user.lastName) == true){
                needsSetup = true;
            }
            if (user.organizationId == undefined){
                user.needsSetup = true;
                response.success(user);
            }else {
                OrganizationsModule.loadOrganization({id: user.organizationId}, function(org){
                    user.organization = org;
                    user.needsSetup = needsSetup;
                    response.success(user);
                }, function(err){
                    response.error(err);
                }, false)
            }
        }, function(err){
            response.error(err);
        }, false);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getUser", function(request, response) {
    var data = request.params;
    var user = request.user;

    if (user == undefined && (data == undefined || data.userId == undefined)){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'access denied'});
        return;
    }
    if (user != undefined && data.userId == undefined){
        data.userId = user.id;
    }
    UsersModule.loadUser(data.userId, function(u){
        AircraftsModule.loadUsersAircrafts({userId: data.userId}, function(aircrafts){
            var hasAircrafts = (aircrafts == undefined || aircrafts.length == 0) ? false : true;
            user.hasAircrafts = hasAircrafts;
            //user.aircrafts = (aircrafts == undefined) ? [] : aircrafts;
            var needsSetup = false;
            if (hasAircrafts == false){
                needsSetup = true;
            }
            if (CommonHelper.isEmptyString(user.firstName) == true && CommonHelper.isEmptyString(user.lastName) == true){
                needsSetup = true;
            }
            //u.aircrafts = (aircrafts == undefined) ? [] : aircrafts;
            console.log('loadUsersAircrafts: aircrafts = ' + JSON.stringify(aircrafts));
            if (u.organizationId == undefined){
                u.needsSetup = true;
                response.success(u);
                return;
            }else {
                OrganizationsModule.loadOrganization({id: u.organizationId}, function(org){
                    u.organization = org;
                    u.needsSetup = needsSetup;
                    response.success(u);
                }, function(err){
                    response.error(err);
                }, false)
            }
        }, function(err){
            response.error(err);
        }, false);
    }, true);
});

Parse.Cloud.define("signup", function(request, response) {
    var data = request.params;
    UsersModule.signUp(data, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    });
});

//aircrafts

Parse.Cloud.define("createAircraft", function(request, response) {
    var data = request.params;
    var user = request.user;
    if (user != undefined && data.userId == undefined){
        data.userId = user.id;
    }
    //todo: check permission
    AircraftsModule.createAircraft(data, function(aircraft){
        response.success(aircraft);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateAircraft", function(request, response) {
    var data = request.params;
    //todo: check permission
    AircraftsModule.updateAircraft(data, function(aircraft){
        response.success(aircraft);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteAircraft", function(request, response) {
    var data = request.params;
    //todo: check permission
    AircraftsModule.deleteAircraft(data, function(aircraft){
        response.success(aircraft);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getUserAircrafts", function(request, response) {
    var data = request.params;
    var user = request.user;
    if (user != undefined && data.userId == undefined){
        data.userId = user.id;
    }
    AircraftsModule.loadUsersAircrafts(data, function(aircrafts){
        response.success(aircrafts);
    }, function(err){
        response.error(err);
    });
});


//points

//use this methond for real-time uploading
Parse.Cloud.define("uploadPoints", function(request, response) {
    var data = request.params;
    var user = request.user;
    if (user == undefined){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'access denied'});
        return;
    }
    data.userId = user.id;
    if (data.startTimestamp == undefined || data.aircraftId == undefined || data.lat == undefined || data.lon == undefined || data.acc == undefined || data.vel == undefined || data.bea == undefined || data.times == undefined || data.alt == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'incorrect input data'});
        return;
    }

    //todo: check permission
    LoModule.uploadAirPoints(data, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});

//Parse.Cloud.define("finishSession", function(request, response) {
//    var data = request.params;
//    var user = request.user;
//    if (user == undefined){
//        response.error({code: ECR.ACCESS_DENIED.code, message: 'access denied'});
//        return;
//    }
//    data.userId = user.id;
//
//    if (data.startTimestamp == undefined){
//        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'startTimestamp is not defined'});
//        return;
//    }
//
//    LoModule.finishAirSession(data, function(session){
//        response.success(session);
//    }, function(err){
//        response.error(err);
//    });
//});


Parse.Cloud.define("createUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.createLink(data, function(link){
        response.success(link);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.deleteLink(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateUserLink", function(request, response) {
    var data = request.params.data;
    UserLinksModule.updateLink(data, function(updatedLink){
        response.success(updatedLink);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadUserUserLinks", function(request, response) {
    var data = request.params.data;
    UserLinksModule.loadUserUserLinks(data, function(d){
        response.success(d);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateSession", function(request, response) {
    var data = request.params;
    LoModule.updateSession(data, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteSession", function(request, response) {
    var data = request.params;
    LoModule.deleteSession(data, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});

//Parse.Cloud.define("finishSessionAndCleanCachePoints", function(request, response) {
Parse.Cloud.define("finishSession", function(request, response) {
    var data = request.params;
    var user = request.user;
    if (user == undefined){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'access denied'});
        return;
    }
    data.userId = user.id;
    if (data.startTimestamp == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'startTimestamp is not defined'});
        return;
    }

    LoModule.finishSessionAndCleanCachePoints(data, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});


Parse.Cloud.define("savePoints", function(request, response) {
    var data = request.params.data;
    if (data == undefined){data = response.params}
    console.log('savePoints: data = ' + JSON.stringify(data));
    //todo: check permission
    LocationModule.savePoints(data, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getUserSessions", function(request, response) {
    var data = request.params;
    var user = request.user;
    if (data == undefined && user != undefined){
        data = {userId: user.id}
    }
    //todo: check permission
    LoModule.loadUserSessions(data, function(sessions){
        UsersModule.loadUser(data.userId, function(user){
            sessions = sessions.map(function(r){r.user = user; return r;});
            response.success(sessions);
        }, true);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getSessionPoints", function(request, response) {
    var data = request.params;
    if (data == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadSessionPoints: data is undefined'});
        return;
    }
    //todo: check permission
    LoModule.loadSessionPoints(data.sessionId, function(points){
        response.success(points);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadSessionsInTimeSpan", function(request, response) {
    var data = request.params;
    LoModule.loadSessionsInTimeSpan(data, function(sessions){
        response.success(sessions);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("getSessionsPoints", function(request, response) {
    var data = request.params;
    if (data == undefined || data.sessionsIds == undefined){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'getSessionsPoints: sessionsIds is undefined'});
        return;
    }
    LoModule.loadSessionsPointsMap(data.sessionsIds, function(sessions){
        response.success(sessions);
    });
});

//users
Parse.Cloud.define("updateUser", function(request, response) {
    var data = request.params;
    var currentUser = request.user;
    if (currentUser == undefined){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'you are not logged in'});
        return;
    }
    if (data != undefined && data.id == undefined){
        data.id = currentUser.id;
    }
    UsersModule.updateUser(data, function(user){
        AircraftsModule.loadUsersAircrafts({userId: user.id}, function(aircrafts){
            var hasAircrafts = (aircrafts == undefined || aircrafts.length == 0) ? false : true;
            user.hasAircrafts = hasAircrafts;
            var needsSetup = false;
            if (hasAircrafts == false){
                needsSetup = true;
            }
            //user.aircrafts = (aircrafts == undefined) ? [] : aircrafts;
            //console.log('loadUsersAircrafts: aircrafts = ' + JSON.stringify(aircrafts));
            if (user.organizationId == undefined){
                user.needsSetup = true;
                response.success(user);
                return;
            }else {
                OrganizationsModule.loadOrganization({id: user.organizationId}, function(org){
                    user.organization = org;
                    user.needsSetup = needsSetup;
                    response.success(user);
                }, function(err){
                    response.error(err);
                }, false);
            }
        }, function(err){
            response.error(err);
        });
    }, function(err){
        response.error(err);
    });
});



//organizations
Parse.Cloud.define("getAllOrganizations", function(request, response) {
    //todo: check permission
    OrganizationsModule.loadAllOrganizations({}, function(orgs){
        response.success(orgs);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadOrganization", function(request, response) {
    //todo: check permission
    var data = request.params;
    OrganizationsModule.loadOrganization(data, function(org){
        UsersModule.loadOrganizationUsers(data.id, function(users){
            org.users = users;
            response.success(org);
        });
    }, function(err){
        response.error(err);
    }, true);
});

//experiments

Parse.Cloud.define("loadSessionGoogleMapsString", function(request, response) {
    var data = request.params;
    LoModule.loadSessionGoogleMapsString(data.sessionId, function(s){
        response.success(s);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("savePhoto", function(request, response) {
    var data = request.params;
    PhotosModule.createPhoto(data, function(photo){
        response.success(photo);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deletePhoto", function(request, response) {
    var data = request.params;
    PhotosModule.deletePhoto(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

//search users
Parse.Cloud.define("searchUsers", function(request, response) {
    var data = request.params.data;
    UsersModule.searchUsers(data, function(users){
        response.success(users)
    }, function(err){
        response.error(err)
    });
});