/**
 * Created by sabir on 29.07.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import GPSAPI from '../../api/GPSAPI';

import uuid from 'uuid';

import {Map} from 'immutable'

let initGPS_ = () => {
    return {
        type: types.INIT_GPS
    }
}

let initGPSFail = (err) => {
    return {
        type: types.INIT_GPS_FAIL,
        error: err
    }
}
let initGPSSuccess = () => {
    return {
        type: types.INIT_GPS_SUCCESS,
    }
}
//thunk
export function initGPS(){
    return (dispatch, getState) => {
        dispatch(initGPS_());
        //todo: deal with GPS
        return GPSAPI.initGPS().then(
            () => dispatch(initGPSSuccess()),
            err => dispatch(initGPSFail(err))
        )
    }
}

export function onNewLocationsReceived(coordinates){
    return (dispatch, getState) => {
        let arr = [];
        let {startFlightTimestamp} = getState().flight;
        for (let i in coordinates){
            arr.push({
                ...coordinates[i],
                // id: uuid(),
                startTimestamp: startFlightTimestamp,
                synced: false
            });
        }
        return dispatch({
            type: types.ON_GPS_POINTS_RECEIVED,
            coordinates: arr
        })
    }
}