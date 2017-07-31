/**
 * Created by sabir on 31.07.17.
 */

import * as types from '../ActionTypes.js'

import {Map} from 'immutable'

const initialState = {
    startFlightTimestamp: undefined
}


const FlightReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.START_FLIGHT:
            return {
                ...state,
                startFlightTimestamp: +new Date()
            }

        case types.STOP_FLIGHT:
            return {
                ...state,
                startFlightTimestamp: undefined
            }


        default:
            return state;
    }

}

export default FlightReducer