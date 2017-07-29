/**
 * Created by sabir on 29.07.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import GPSAPI from '../../api/GPSAPI';

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
        return setTimeout(() => {
            dispatch(initGPSSuccess())
        }, 2000)
    }
}

export function onNewLocationsReceived(coordinates){
    return (dispatch, getState) => {
        return dispatch({
            type: types.ON_GPS_POINTS_RECEIVED,
            coordinates: coordinates
        })
    }
}