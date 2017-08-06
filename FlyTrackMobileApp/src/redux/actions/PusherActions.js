/**
 * Created by sabir on 22.07.17.
 */
import * as types from '../ActionTypes.js'

import RealTimeAPI from '../../api/RealTimeAPI'

import FlytrackHelper from '../../helpers/FlytrackHelper'

export function onPusherMessageReceived(data){
    let {points, user, aircraft} = data;
    if (points != undefined){
        points = points.map((p) => {
            return {...p, user: user, aircraft: aircraft}
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
        console.log('sendPusherEvent occured: loading = ', getState().realtime.loading);
        dispatch(sendPusherEvent_());
        let allCoordinates = getState().gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t));
        let coordinates = allCoordinates.filter(a => (a.t > getState().realtime.lastTimestamp));
        if (allCoordinates.length == 0){
            console.log('sendPusherEvent: error: nothing to send');
            return dispatch(sendPusherEventFail({message: 'nothing to send'}))
        }
        let c = (allCoordinates.length == 0) ? undefined : allCoordinates[allCoordinates.length - 1];
        if (coordinates.length == 0){
            console.log('no new coordinates');
            coordinates = [allCoordinates[allCoordinates.length -1]];
        }
        console.log('new coordinates to send = ', coordinates);
        let channelName = FlytrackHelper.getPublishChannelByLocation(c.lat, c.lon).name;
        let user = getState().users.usersMap.get(getState().users.currentUserId)
        let aircraft = getState().aircrafts.aircraftsMap.get(getState().aircrafts.selectedAircraftId)
        return RealTimeAPI.sendEvent(channelName, 'client-position', {
            points: coordinates,
            user: user,
            aircraft: aircraft
        }).then(
            () => dispatch(sendPusherEventSuccess(coordinates)),
            err => dispatch(sendPusherEventFail(err))
        );
    }
}
