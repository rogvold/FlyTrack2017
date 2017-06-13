/**
 * Created by sabir on 13.06.17.
 */

import * as types from '../ActionTypes'

import {Map, OrderedSet} from 'immutable'

const initialState = {
    loading: false,
    messagesSet: OrderedSet(),
    error: undefined
}

let consumeMessages = (messagesSet, messages) => {
    for (let i in messages){
        messagesSet = messagesSet.add(messages[i])
    }
    return messagesSet;
}

const RealtimeReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

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