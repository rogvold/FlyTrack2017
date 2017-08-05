/**
 * Created by sabir on 13.06.17.
 */
import * as types from '../ActionTypes.js'

import RealTimeAPI from '../../api/RealTimeAPI'

import FlytrackHelper from '../../helpers/FlytrackHelper'

export function onPusherMessageReceived(data){
    let {points, user} = data;
    if (points != undefined){
        points = points.map((p) => {
            return {...p, user: user}
        })
    }
    return {
        type: types.PUSHER_MESSAGE_RECEIVED,
        data: data,
        points: points
    }
}

let sendPusherEvent_ = () => {
    return {
        type: types.SEND_EVENT
    }
}

let sendPusherEventFail = (err) => {
    return {
        type: types.SEND_EVENT_FAIL,
        error: err
    }
}
let sendPusherEventSuccess = (points) => {
    return {
        type: types.SEND_EVENT_SUCCESS,
        points: points
    }
}
//thunk
export function sendPusherEvent(){
    return (dispatch, getState) => {
        dispatch(sendPusherEvent_());
        let coordinates = getState().gps.coordinatesMap.toArray()
            .filter(a => (a.t > getState().realtime.lastTimestamp))
            .sort((a, b) => (a.t - b.t));
        let c = (coordinates.length == 0) ? undefined : coordinates[coordinates.length - 1];
        if (c == undefined){
            return dispatch(sendPusherEventFail({message: 'nothing to send'}))
        }
        let channelName = FlytrackHelper.getPublishChannelByLocation(c.lat, c.lon).name;
        let user = getState().users.usersMap.get(getState().users.currentUserId)
        return RealTimeAPI.sendEvent(channelName, 'client-position', {
            points: coordinates,
            user: user
        }).then(
            () => dispatch(sendPusherEventSuccess(coordinates)),
            err => dispatch(sendPusherEventFail(err))
        );
    }
}

