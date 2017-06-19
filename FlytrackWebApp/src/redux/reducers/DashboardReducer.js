/**
 * Created by lesha on 17.06.17.
 */

import * as types from '../ActionTypes'

import {Map, Set} from 'immutable'

const initialState = {
    loading: false,
    error: undefined,
    selectedAircraftsSet: Set(),
    timestamp: undefined
}


const DashboardReducer =  (state = initialState, action = {}) => {

    switch (action.type) {



        case types.SELECT_AIRCRAFT_IN_DASHBOARD:
            return {
                ...state,
                selectedAircraftsSet: state.selectedAircraftsSet.add(action.id)
            }

        case types.UNSELECT_AIRCRAFT_IN_DASHBOARD:
            return {
                ...state,
                selectedAircraftsSet: state.selectedAircraftsSet.delete(action.id)
            }

        case types.SET_TIMESTAMP_IN_DASHBOARD:
            return {
                ...state,
                timestamp: action.timestamp
            }

        case types.SELECT_MANY_AIRCRAFTS_IN_DASHBOARD:
            return {
                ...state,
                selectedAircraftsSet: state.selectedAircraftsSet.merge(action.ids.reduce((set, id) => {
                    return set.add(id);
                }, Set()))
            }


        default:
            return state;
    }

}

export default DashboardReducer