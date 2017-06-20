/**
 * Created by sabir on 09.06.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

import moment from 'moment';

//SESSIONS
let loadUserSessions_ = () => {
    return {
        type: types.LOAD_SESSIONS
    }
}
let loadUserSessionsSuccess = (sessions) => {
    return {
        type: types.LOAD_SESSIONS_SUCCESS,
        sessions: sessions
    }
}
let loadUserSessionsFail = (error) => {
    return {
        type: types.LOAD_SESSIONS_FAIL,
        error: error
    }
}
//thunk
export function loadUserSessions(userId){
    return (dispatch, getState) => {
        if (userId == undefined){
            userId = getState().users.currentUserId;
        }
        dispatch(loadUserSessions_());
        return ParseAPI.runCloudFunctionAsPromise('getUserSessions', {userId: userId}).then(
            sessions => dispatch(loadUserSessionsSuccess(sessions)),
            error => dispatch(loadUserSessionsFail(error))
        )
    }
}

export function loadSessionsInRange(from, to){
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        if (from == undefined || to == undefined){
            from = +moment().startOf('day');
            to = +moment().endOf('day');
        }
        return ParseAPI.runCloudFunctionAsPromise('loadSessionsInTimeSpan', {from: from, to: to}).then(
            sessions => dispatch(loadUserSessionsSuccess(sessions)),
            error => dispatch(loadUserSessionsFail(error))
        )
    }
}

export function loadSessionsForTheDay(dayTimestamp){
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        var from = +moment(dayTimestamp).startOf('day');
        var to = +moment(dayTimestamp).endOf('day');
        return ParseAPI.runCloudFunctionAsPromise('loadSessionsInTimeSpan', {from: from, to: to}).then(
            sessions => dispatch(loadUserSessionsSuccess(sessions)),
            error => dispatch(loadUserSessionsFail(error))
        )
    }
}

export function loadFriendsSessions(userId){
    console.log('loadFriendsSessions occured: userId = ', userId);
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        return ParseAPI.runCloudFunctionAsPromise("loadUserFriendsSessions", {userId: userId}).then(
            data => dispatch(loadUserSessionsSuccess(userId, data)),
            err => dispatch(loadUserSessionsFail(userId, err))
        )
    }
}

//DATA
let loadSessionData_ = (sessionId) => {
    return {
        type: types.LOAD_SESSION_DATA,
        sessionId: sessionId
    }
}
let loadSessionDataSuccess = (sessionId, data) => {
    return {
        type: types.LOAD_SESSION_DATA_SUCCESS,
        data: data,
        sessionId: sessionId
    }
}
let loadSessionDataFail = (sessionId, error) => {
    return {
        type: types.LOAD_SESSION_DATA_FAIL,
        sessionId: sessionId,
        error: error
    }
}
//thunk
export function loadSessionData(sessionId){
    return (dispatch, getState) => {
        var data = getState().sessions.sessionsDataMap[sessionId];
        // if (data != undefined){
        //     return Promise.resolve();
        // }
        dispatch(loadSessionData_());
        return ParseAPI.runCloudFunctionAsPromise('getSessionPoints', {sessionId: sessionId}).then(
            points => dispatch(loadSessionDataSuccess(sessionId, {id: sessionId, points: points})),
            error => dispatch(loadSessionDataFail(sessionId, error))
        )
    }
}

//select session
export function selectSession(id){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_SESSION,
            id: id
        });
    }
}

export function unselectSession(){
    return (dispatch, getState) => {
        return dispatch({
            type: types.UNSELECT_SESSION
        });
    }
}