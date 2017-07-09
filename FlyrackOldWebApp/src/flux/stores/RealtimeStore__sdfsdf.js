/**
 * Created by sabir on 19.09.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../constants');
var Pusher = require('pusher-js');

var RealtimeStore = Fluxxor.createStore({
    self: this,
    channelName: 'sabir',

    initialize: function(){
        this.initPusher();
        this.bindEvent('player');
        this.initialized = false;

        this.messages = [];

        this.bindActions(
            constants.SEND_PUSHER_MESSAGE, this.sendPusherMessage
        );
    },

    initPusher: function(){

        if (this.pusher != undefined){
            return;
        }

        this.pusher = new Pusher('f4adb3a1aed31d09bfda', {
            //authEndpoint: 'http://sportstracker.parseapp.com/pusherAuth',
            authEndpoint: 'https://flytrack.parseapp.com/pusherAuth',
            auth: {
                headers: {
                    //'X-Parse-Session-Token': sessionToken,
                    //'X-Parse-Application-Id': "DY9RPeNTtxZoi4rkuHU5VQpx6iZiqVj0EPdTPUDE",
                    //'X-Parse-REST-API-Key': "nXBiK8HpMx3I0cheUm41WMEKKWUpoKV0QOhqy7VN"
                }
            }
        });

        this.channel = this.pusher.subscribe('private-' + this.channelName);
        var self = this;

        this.channel.bind('pusher:subscription_succeeded', function() {
            console.log('pusher:subscription_succeeded success callback');
            self.initialized = true;
            self.emit('change');
            //alert('pusher:subscription_succeeded success callback ');
            //var triggered = channel.trigger('client-someeventname', { your: data });
        });
    },

    bindEvent: function(eventName){
        this.channel.bind('client-' + eventName, function(data) {
            this.consumeMessage(data.message);
            this.emit('change');
        }.bind(this));
    },


    consumeMessage: function(message){
        console.log('consume message: message = ', message);
        if (message == undefined){
            return;
        }
        this.messages.push(message);
    },

    getLastMessage: function(){
        var messages = this.messages;
        if (messages == undefined || messages.length == 0){
            return undefined;
        }
        return messages[messages.length - 1];
    },

    sendPusherMessage: function(payload){
        this.consumeMessage(payload.message);
        this.channel.trigger('client-player', { message: payload.message });
        this.emit('change');
    }

});

module.exports = RealtimeStore;