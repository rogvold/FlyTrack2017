/**
 * Created by sabir on 22.07.17.
 */

import * as types from '../ActionTypes.js'

import {Map} from 'immutable'

const initialState = {
    channelsMap: Map(),
    realtimeCalcMap: Map() //userId - calc data
}


const PusherReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.PUSHER_MESSAGE_RECEIVED:
            // let data = action.data;
            // let channelName = data.channelName;
            // let channelsMap = Object.assign({}, state.channelsMap);
            // if (channelsMap[channelName] == undefined){
            //     channelsMap[channelName] = [];
            // }
            // data.t = +new Date();
            // channelsMap[channelName].push(data.message);

            return {
                ...state,
                channelsMap: (state.channelsMap.get(action.data.channelName) == undefined) ?
                                state.channelsMap.set(action.data.channelName, [action.data.message]) :
                                state.channelsMap.set(action.data.channelName, state.channelsMap.get(action.data.channelName).concat([action.data.message]))
            }


        default:
            return state;
    }

}

export default PusherReducer