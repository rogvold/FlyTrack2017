/**
 * Created by sabir on 10.06.17.
 */

import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    loading: false,
    selectedAircraftId: undefined,
    aircraftsMap: Map(),
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}


const AircraftsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_AIRCRAFTS:
        case types.UPDATE_AIRCRAFT:
        case types.DELETE_AIRCRAFT:
        case types.CREATE_AIRCRAFT:
            return startLoading(state, action)

        case types.LOAD_AIRCRAFTS_FAIL:
        case types.UPDATE_AIRCRAFT_FAIL:
        case types.DELETE_AIRCRAFT_FAIL:
        case types.CREATE_AIRCRAFT_FAIL:
            return stopLoading(state, action)

        case types.LOAD_AIRCRAFTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                aircraftsMap: state.aircraftsMap.merge(action.aircrafts.reduce((res, u) => {return res.set(u.id, u)}, Map()))
            }

        case types.CREATE_AIRCRAFT_SUCCESS:
        case types.UPDATE_AIRCRAFT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                aircraftsMap: state.aircraftsMap.set(action.aircraft.id, action.aircraft)
            }

        case types.DELETE_AIRCRAFT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                aircraftsMap: state.aircraftsMap.delete(action.id)
            }

        case types.SELECT_AIRCRAFT:
            return {
                ...state,
                selectedAircraftId: action.id
            }

        default:
            return state;
    }

}

export default AircraftsReducer