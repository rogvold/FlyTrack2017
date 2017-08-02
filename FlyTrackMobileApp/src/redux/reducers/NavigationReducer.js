/**
 * Created by sabir on 31.07.17.
 */
import * as types from '../ActionTypes'

const initialState = {
    tab: 'flight'
}

const NavigationReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.SELECT_NAVIGATION_TAB:
            return {
                ...state,
                tab: action.tab
            }

        default:
            return state;
    }

}

export default NavigationReducer