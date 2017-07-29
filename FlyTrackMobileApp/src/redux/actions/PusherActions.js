/**
 * Created by sabir on 22.07.17.
 */
import * as types from '../ActionTypes.js'

export function onPusherMessageReceived(data){
    return {
        type: types.PUSHER_MESSAGE_RECEIVED,
        data: data
    }
}