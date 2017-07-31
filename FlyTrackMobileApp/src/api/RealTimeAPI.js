/**
 * Created by sabir on 22.07.17.
 */

import * as constants from '../constants/AccountConstants'

import Pusher from 'pusher-js/react-native';
import CryptoJS from 'crypto-js'

const RealTimeAPI = {

    getPusherInstance(){
        let pusher = global.pusher;
        if (pusher == undefined){
            pusher = new Pusher(constants.PUSHER_KEY, {
                cluster: constants.PUSHER_CLUSTER,
                authorizer: (channel, options) => {
                    return {
                        authorize: (socketId, callback) => {
                            console.log('authorizer: channel = ', channel);
                            console.log('authorizer: socketId = ', socketId);
                            let stringToSign = socketId + ':' + channel.name;
                            let hash = CryptoJS.HmacSHA256(stringToSign, constants.PUSHER_SECRET);
                            let authToken = constants.PUSHER_KEY + ':' + CryptoJS.enc.Hex.stringify(hash);
                            let authInformation = {
                                auth: authToken
                            }
                            callback(false, authInformation);
                        }
                    };
                }
            });
            global.pusher = pusher;
            return pusher;
        }
        return pusher;
    },

    subscribeOnChannel(channelName){
        console.log('subscribeOnChannel: channelName = ', channelName);
        if (channelName.indexOf('private-') == -1){
            channelName = 'private-' + channelName;
        }
        console.log('subscribeOnChannel: after checking channelName = ', channelName);

        console.log('subscribing on channel: channelName = ', channelName);
        let pusher = this.getPusherInstance();
        let channels = pusher.allChannels();
        console.log('all channels = ', channels);
        let f = false;
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            if (channelName == channel.name){
                f = true;
            }
        }
        console.log('channelName = ', channelName);
        if (f == false){
            return global.pusher.subscribe(channelName);
        }
    },

    getChannelByName(channelName){
        let pusher = this.getPusherInstance();
        let channels = pusher.allChannels();
        if (channelName.indexOf('private-') == -1){
            channelName = 'private-' + channelName;
        }
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            if (channelName == channel.name){
                return channel;
            }
        }
        return undefined;
    },

    unsubscribeFromChannel(channelName) {
        console.log('unsubscribeFromChannel: channelName = ', channelName);
        if (channelName.indexOf('private-') == -1){
            channelName = 'private-' + channelName;
        }
        console.log('unsubscribeFromChannel: after checking channelName = ', channelName);
        let pusher = this.getPusherInstance();
        global.pusher.unsubscribe(channelName);
    },

    bindEvent(channelName, eventName, callback){
        console.log('bindEvent: channelName = ', channelName);
        if (channelName.indexOf('private-') == -1){
            channelName = 'private-' + channelName;
        }
        console.log('bindEvent: after checking channelName = ', channelName);
        let channel = this.getChannelByName(channelName);
        if (channel == undefined){
            channel = this.subscribeOnChannel(channelName);
        }
        channel.bind(eventName, function (data) {
            data.channelName = channelName;
            console.log('event ' + eventName + ' is triggered with data = ', data);
            callback(data);
        });
    },

    sendEvent(channelName, eventName, data){
        let pusher = this.getPusherInstance();
        // console.log('sendEvent: channelName = ', channelName);
        // console.log('sendEvent: eventName, data = ', eventName, data);
        if (channelName.indexOf('private-') == -1){
            channelName = 'private-' + channelName;
        }
        // console.log('sendEvent: after checking: channelName = ', channelName);
        let channel = this.getChannelByName(channelName);
        if (channel == undefined){
            channel = this.subscribeOnChannel(channelName);
        }
        // console.log('triggering channel = ', channel);
        try{
            channel.trigger(eventName, data);
        }catch(exc){
            console.log('Exception: ', exc);
        }

    }

}

export  default RealTimeAPI;