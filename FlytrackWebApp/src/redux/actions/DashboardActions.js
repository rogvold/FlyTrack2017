/**
 * Created by lesha on 17.06.17.
 */

import * as types from '../ActionTypes'

export function selectAircraft(aircratId){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_AIRCRAFT_IN_DASHBOARD,
            id: aircratId
        })
    }
}

export function selectManyAircrafts(ids){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_MANY_AIRCRAFTS_IN_DASHBOARD,
            ids: ids
        })
    }
}

export function unselectAircraft(aircratId){
    return (dispatch, getState) => {
        return dispatch({
            type: types.UNSELECT_AIRCRAFT_IN_DASHBOARD,
            id: aircratId
        })
    }
}

export function setTimestamp(timestamp){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SET_TIMESTAMP_IN_DASHBOARD,
            timestamp: timestamp
        })
    }
}