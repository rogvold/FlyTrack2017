/**
 * Created by sabir on 17.07.16.
 */
var express = require('express');
var app = express();
app.use(express.bodyParser());

var crypto = require('crypto');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, X-Parse-Session-Token');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
        //res.status(200).send('OK');
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

app.post('/pusherAuth', function(req, res) {

    var user = req.user;
    var sessionToken = req.get('X-Parse-Session-Token');

    var socket_id = req.body.socket_id;
    var channel_name = req.body.channel_name;

    if (socket_id == undefined || channel_name == undefined || socket_id == '' || channel_name == ''){
        res.status(403).send('socket_id or channel_name is empty ');
        return;
    }

    var pusherAppKey = 'f4adb3a1aed31d09bfda';
    var pusherAppSecret = '40a5e59a117555ee6014';
    var stringToSign = socket_id + ':' + channel_name;

    var authToken = pusherAppKey + ':' + crypto.createHmac('sha256', pusherAppSecret).update(stringToSign).digest('hex');

    res.status(200).send(JSON.stringify({auth: authToken}));

});


app.listen();