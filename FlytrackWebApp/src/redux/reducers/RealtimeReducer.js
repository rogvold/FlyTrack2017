/**
 * Created by sabir on 13.06.17.
 */

import * as types from '../ActionTypes.js'

import {Map, Set} from 'immutable'

const initialState = {
    // channelsMap: Map(),
    pointsMap: Map(),
    loading: false,
    lastTimestamp: 0,
    messagesSet: Set()
}


let consumeMessages = (messagesSet, messages) => {
    for (let i in messages){
        messagesSet = messagesSet.add(messages[i])
    }
    return messagesSet;
}

const RealtimeReducer =  (state = initialState, action = {}) => {

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

        case types.REALTIME_MESSAGE_RECEIVED:
            return {
                ...state,
                loading: false,
                error: undefined,
                messagesSet: consumeMessages(state.messagesSet, action.messages)
                // messagesMap: state.messagesMap.merge(action.messages.reduce((res, u) => {return res.set(u.id, u)}, Map()))
                // messagesSet: consumeMessages(state.messagesSet, action.messages)
            }


        default:
            return state;
    }

}

export default RealtimeReducer