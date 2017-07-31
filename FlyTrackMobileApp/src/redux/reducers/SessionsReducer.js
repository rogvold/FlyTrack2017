/**
 * Created by sabir on 09.06.17.
 */

import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    loading: false,
    sessionsMap: Map(),
    sessionsDataMap: Map(),
    error: undefined,
    selectedSessionId: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

let consumeSessionsData = (sessionsDataMap, dataMap) => {
    console.log('consumeSessionsData occured: dataMap = ', dataMap);
    for (let key in dataMap){
        sessionsDataMap = sessionsDataMap.set(key, dataMap[key]);
    }
    return sessionsDataMap;
}

const SessionsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_SESSION_DATA:
        case types.LOAD_SESSIONS:
        case types.LOAD_MANY_SESSIONS_DATA:
        case types.SAVE_SESSION_POINTS:
            return startLoading(state, action)

        case types.LOAD_SESSIONS_FAIL:
        case types.LOAD_SESSION_DATA_FAIL:
        case types.LOAD_MANY_SESSIONS_DATA_FAIL:
        case types.SAVE_SESSION_POINTS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_SESSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                sessionsMap: state.sessionsMap.merge(action.sessions.reduce((res, u) => {return res.set(u.id, u)}, Map()))
            }

        case types.SAVE_SESSION_POINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                sessionsMap: state.sessionsMap.set(action.session.id, action.session)
            }


        case types.LOAD_SESSION_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                sessionsDataMap: state.sessionsDataMap.set(action.sessionId, action.data)
            }

        case types.LOAD_MANY_SESSIONS_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                sessionsDataMap: consumeSessionsData(state.sessionsDataMap, action.data)
            }


        case types.SELECT_SESSION:
            return {
                ...state,
                selectedSessionId: action.id
            }

        case types.UNSELECT_SESSION:
            return {
                ...state,
                selectedSessionId: undefined
            }

        default:
            return state;
    }

}

export default SessionsReducer