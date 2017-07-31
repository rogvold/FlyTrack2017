/**
 * Created by sabir on 31.07.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

export function startFlight(){
    return (dispatch, getState) => {
        return dispatch({
            type: types.START_FLIGHT
        })
    }
}

export function stopFlight(){
    return (dispatch, getState) => {
        return dispatch({
            type: types.STOP_FLIGHT
        })
    }
}