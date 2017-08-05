/**
 * Created by sabir on 22.07.17.
 */

import * as types from '../ActionTypes.js'

import {Map} from 'immutable'

const initialState = {
    // channelsMap: Map(),
    pointsMap: Map(),
    loading: false,
    lastTimestamp: 0
}


const PusherReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.PUSHER_MESSAGE_RECEIVED:
            return {
                ...state,
                pointsMap: state.pointsMap.merge(action.points.reduce((map, p) => map.set(p.t, p), Map()))
            }

        case types.SEND_EVENT:
            return {
                ...state,
                loading: true
            }

        case types.SEND_EVENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.SEND_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.error,
                pointsMap: state.pointsMap.merge(action.points.reduce((map, p) => map.set(p.t, p), Map())),
                lastTimestamp: (action.points.length == 0) ? state.lastTimestamp : action.points[action.points.length - 1].t
            }


        default:
            return state;
    }

}

export default PusherReducer