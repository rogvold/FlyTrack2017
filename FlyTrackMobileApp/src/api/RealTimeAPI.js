/**
 * Created by sabir on 22.07.17.
 */

import * as constants from '../constants/AccountConstants'

import Pusher from 'pusher-js/react-native';
import CryptoJS from 'crypto-js'

import FlytrackHelper from '../helpers/FlytrackHelper'

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
            pusher.connection.bind('state_change', function(states) {
                console.log('pusher: state_change: states = ', states);

                // states = {previous: 'oldState', current: 'newState'}
            });
            global.pusher = pusher;
            return pusher;
        }
        return pusher;
    },

    subscribeOnChannel(channelName, onDataReceivedCallback){
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
            let ch = global.pusher.subscribe(channelName);
            ch.bind('client-position', function(data){
                if (onDataReceivedCallback != undefined){
                    onDataReceivedCallback(data);
                }
            })
            return ch;
        }
    },

    subscribeOnManyChannels(channelNames, onDataReceivedCallback){
        let self = this;
        for (let i in channelNames){
            let chName = channelNames[i];
            ((name, interval) => {
                setTimeout(() => {
                    self.subscribeOnChannel(name, onDataReceivedCallback);
                }, interval)
            })(chName, 20 * i);
        }
    },

    subscribeOnCellChannelsByLatAndLon(lat, lon, onDataReceivedCallback){
        console.log('subscribeOnCellChannelsByLatAndLon: lat, lon = ', lat, lon);
        let channels = FlytrackHelper.getSubscribeChannelsByLocation(lat, lon);
        let names = channels.map(c => c.name);
        this.subscribeOnManyChannels(names, onDataReceivedCallback);
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
        return new Promise((resolve, reject) => {
            let pusher = this.getPusherInstance();
            console.log('sendEvent: channelName, eventName, data = ', channelName, eventName, data);
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
                let triggered = channel.trigger(eventName, data);
                if (triggered == false){
                    reject({message: 'can not trigger event'});
                }else {
                    console.log('successfully triggered event');
                    resolve();
                }
            }catch(exc){
                console.log('can not trigger event: exception = ', exc);
                reject(exc);
            }
        })
    }

}

export  default RealTimeAPI;