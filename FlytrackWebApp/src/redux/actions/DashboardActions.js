/**
 * Created by lesha on 17.06.17.
 */

import * as types from '../ActionTypes'
import * as sessionsActions from './SessionsActions'

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

export function updateCurrentTime(currentTime, default_dt, speed) {
    return (dispatch, getState) => {
        return dispatch({
            type: types.SET_CURRENT_TIME,
            currentTime: currentTime,
            default_dt: default_dt,
            speed: speed
        })
    }
}

export function updateActivePlanes(activePlanes) {
    return (dispatch, getState) => {
        return dispatch({
            type: types.SHOW_ACTIVE_PLANES,
            activePlanes: activePlanes,
        })
    }
}

export function setActiveAircrafts (activeAircrafts, currentTime){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SET_AIRCRAFTS_FROM_HISTORY,
            activeAircrafts: activeAircrafts,
            currentTime: currentTime
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

export function setTimestampAndLoadSessions(timestamp){
    // sessionsActions
    return (dispatch, getState) => {
        dispatch(setTimestamp(timestamp));
        dispatch(sessionsActions.loadSessionsForTheDay(timestamp)).then(
            payload => {
                let sessionsIds = payload.sessions.map(s => s.id);
                console.log('sessions ids to load data from : ', sessionsIds);
                return dispatch(sessionsActions.loadManySessionsData(sessionsIds))
            }
        )
    }
}