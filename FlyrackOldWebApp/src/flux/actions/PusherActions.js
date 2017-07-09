/**
 * Created by sabir on 19.09.16.
 */

var constants = require('../FluxConstants');

var PusherActions = {

    sendPusherMessage: function(channelName, message){
        console.log('PusherActions: sendPusherMessage: channelName, message = ', channelName, message);
        if (channelName == undefined || message == undefined){
            return;
        }
        this.dispatch(constants.SEND_PUSHER_MESSAGE, {channelName: channelName, message: message});
    }

};

module.exports = PusherActions;