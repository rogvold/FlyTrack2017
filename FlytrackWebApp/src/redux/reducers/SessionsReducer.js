/**
 * Created by sabir on 09.06.17.
 */

import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    loading: false,
    sessionsMap: Map(),
    sessionsDataMap: Map(),
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}


const SessionsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_SESSION_DATA:
        case types.LOAD_USER_SESSIONS:
            return startLoading(state, action)

        case types.LOAD_USER_SESSIONS_FAIL:
        case types.LOAD_SESSION_DATA_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USER_SESSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                sessionsMap: state.sessionsMap.merge(action.sessions.reduce((res, u) => {return res.set(u.id, u)}, Map()))
            }


        case types.LOAD_SESSION_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                sessionsDataMap: state.sessionsDataMap.set(action.sessionId, action.data)
            }


        default:
            return state;
    }

}

export default SessionsReducer