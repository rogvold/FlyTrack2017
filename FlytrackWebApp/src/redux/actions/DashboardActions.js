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