/**
 * Created by sabir on 18.06.17.
 */


import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    // mode: 'users'
    mode: undefined
}


const SearchReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.OPEN_SEARCH_DIALOG:
            return {
                ...state,
                mode: action.mode
            }

        case types.CLOSE_SEARCH_DIALOG:
            return {
                ...state,
                mode: undefined
            }

        default:
            return state;
    }

}

export default SearchReducer