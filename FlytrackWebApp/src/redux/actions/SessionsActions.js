/**
 * Created by sabir on 09.06.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

//SESSIONS
let loadUserSessions_ = (userId) => {
    return {
        type: types.LOAD_USER_SESSIONS,
        userId: userId
    }
}
let loadUserSessionsSuccess = (userId, data) => {
    return {
        type: types.LOAD_USER_SESSIONS_SUCCESS,
        sessions: data.sessions
    }
}
let loadUserSessionsFail = (userId, error) => {
    return {
        type: types.LOAD_USER_SESSIONS_FAIL,
        userId: userId,
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
            data => dispatch(loadUserSessionsSuccess(userId, data)),
            error => dispatch(loadUserSessionsFail(userId, error))
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