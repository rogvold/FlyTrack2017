/**
 * Created by sabir on 29.07.17.
 */
import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    coordinatesMap: Map(),

    loading: false,
    initialized: false,
    error: undefined,

}

const GPSReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.ON_GPS_POINTS_RECEIVED:
            return {
                ...state,
                coordinatesMap: state.coordinatesMap.merge(action.coordinates.reduce((map, p) => {
                    return map.set(p.t, p)
                }, Map()))
            }

        case types.SAVE_SESSION_POINTS_SUCCESS:
            return {
                ...state,
                coordinatesMap: state.coordinatesMap.merge(action.points.reduce((map, p) => {
                    let pp = {...p, synced: true};
                    return map.set(p.t, pp)
                }, Map()))
            }

        case types.INIT_GPS:
            return {
                ...state,
                loading: true
            }

        case types.INIT_GPS_FAIL:
            return {
                ...state,
                loading: false,
                initialized: false,
                error: action.error
            }

        case types.INIT_GPS_SUCCESS:
            return {
                ...state,
                loading: false,
                initialized: true
            }

        default:
            return state;
    }

}

export default GPSReducer