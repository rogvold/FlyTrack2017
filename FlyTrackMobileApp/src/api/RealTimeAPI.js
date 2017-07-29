/**
 * Created by sabir on 22.07.17.
 */

import * as constants from '../constants/AccountConstants'

import Pusher from 'pusher-js';

const RealTimeAPI = {

    getPusherInstance(){
        let pusher = window.pusher;
        if (pusher == undefined){
            pusher = new Pusher(constants.PUSHER_KEY, {cluster: 'eu'});
            window.pusher = pusher;
            return pusher;
        }
        return pusher;
    },

    subscribeOnChannel(channelName){
        console.log('subscribing on channel: channelName = ', channelName);
        let pusher = this.getPusherInstance();
        let channels = pusher.allChannels();
        let f = false;
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            if (channelName == channel.name){
                f = true;
            }
        }
        if (f == false){
            return window.pusher.subscribe(channelName);
        }
    },

    getChannelByName(channelName){
        let pusher = this.getPusherInstance();
        let channels = pusher.allChannels();
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            if (channelName == channel.name){
                return channel;
            }
        }
        return undefined;
    },

    unsubscribeFromChannel(channelName) {
        let pusher = this.getPusherInstance();
        window.pusher.unsubscrive(channelName);
    },

    bindEvent(channelName, eventName, callback){
        let channel = this.getChannelByName(channelName);
        if (channel == undefined){
            channel = this.subscribeOnChannel(channelName);
        }
        channel.bind(eventName, function (data) {
            data.channelName = channelName;
            console.log('event ' + eventName + ' is triggered with data = ', data);
            callback(data);
        });
    }

}

export  default RealTimeAPI;