/**
 * Created by sabir on 19.09.16.
 */

var Fluxxor = require('fluxxor');

var FlyTrackHelper = require('../../helpers/FlyTrackHelper');

var co = require('../../constants');
var constants = require('../FluxConstants');

var Pusher = require('pusher-js');

var PusherStore = Fluxxor.createStore({
    self: this,

    gpsEventName: 'gps',

    initialize: function(){
        this.channelsMap = {};
        this.initPusher();
        this.initChannels();
        this.bindEvents();
        this.messages = [];

        this.bindActions(
            constants.SEND_PUSHER_MESSAGE, this.sendPusherMessage
        );
    },

    initPusher: function(){
        if (this.pusher != undefined){
            return;
        }

        this.pusher = new Pusher(co.PUSHER_KEY, {
            authEndpoint: co.PUSHER_AUTH_ENDPOINT,
            auth: {
                headers: {
                    //'X-Parse-Session-Token': sessionToken,
                    'X-Parse-Application-Id': co.PARSE_APP_ID,
                    'X-Parse-REST-API-Key': co.PARSE_REST_API_KEY
                }
            }
        });

        console.log('pusher initialized');
    },


    initChannels: function(lat, lon){
        lat = (lat == undefined) ? 56.10313 : lat;
        lon = (lon == undefined) ? 36.80168 : lon;
        if (this.pusher == undefined){
            console.log('Pusher is not initialized');
            return;
        }
        var arr = FlyTrackHelper.getSubscribeChannelsByLocation(lat, lon);
        arr = arr.map(function(a){return a.name})

        console.log('initChannels: channels = ', arr);

        for (var i in arr){
            var name = arr[i];
            if (this.channelsMap[name] != undefined){
                continue;
            }
            this.channelsMap[name] = this.pusher.subscribe('private-' + name);
        }
    },

    bindEvents: function(){
        console.log('bindEvents occured ');
        var events = [this.gpsEventName];
        var self = this;
        for (var i in events){
            var eventName = events[i];
            for (var channelName in this.channelsMap){
                if (this.channelsMap[channelName] == undefined){
                    console.log('this.channelsMap[channelName] == undefined');
                    continue;
                }
                console.log('binding event ' + eventName + ' on channel ' + channelName);
                this.channelsMap[channelName].bind('client-' + eventName, function(data){
                    console.log('cb : data = ', data);
                    self.onGPSMessage(data);
                });
            }
        }
    },

    onGPSMessage: function(m){
        console.log('onGPSMessage: m = ', m);
        this.consumeGPSMessages([m]);
        this.emit('change');
    },

    consumeGPSMessages: function(messages){
        if (messages == undefined){
            return;
        }
        for (var i in messages){
            var m = messages[i];
            this.messages.push(m);
        }
    },

    sendPusherMessage: function(payload){
        var message = payload.message;
        var channelName = payload.channelName;
        var channel = this.channelsMap[channelName];
        if (channel == undefined){
            return;
        }
        console.log('!!! --->>> triggering event');
        this.channelsMap[channelName].trigger('client-' + this.gpsEventName, message);
    },

    getUserPoints: function(userId){
        var arr = [];
        var list = this.messages;
        for (var i in list){
            var m = list[i];
            if (m.userId == userId){
                arr.push(m);
            }
        }
        return arr;
    },

    getLinesAndMarkers: function(t){
        var arr = [];
        var messages = this.messages;
        var map = {};
        for (var i in messages){
            var m = messages[i];
            var aircraftId = m.aircraft.id;
            if (map[aircraftId] == undefined){
                map[aircraftId] = {
                    id: aircraftId,
                    points: []
                }
            }
            for (var j in m.points.lat){
                map[aircraftId].points.push({
                    lat: m.points.lat[j],
                    lon: m.points.lon[j],
                    alt: m.points.alt[j],
                    acc: m.points.acc[j],
                    t: m.points.times[j],
                    vel: m.points.vel[j],
                    bea: m.points.bea[j]
                });
            }
        }
        for (var key in map){
            arr.push(map[key]);
        }
        arr = arr.filter(function(a){return (a.points.length > 0)});
        arr.sort(function(a, b){
            if (a.id > b.id){
                return 1;
            }
            if (a.id < b.id){
                return -1;
            }
            return 0;
        });
        var markers = arr.map(function(l){return {
            id: l.id,
            point: l.points[l.points.length - 1]
        }});

        return {
            lines: arr,
            markers: markers
        }
    },

    getAircrafts: function(){
        var arr = [];
        var messages = this.meassages;
        var map = {};
        for (var i in messages){
            var a = messages[i];
            map[a.id] = a;
        }
        for (var key in map){
            var air = map[key];
            arr.push(air);
        }
        return arr;
    }

});

module.exports = PusherStore;