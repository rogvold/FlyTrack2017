/**
 * Created by lesha on 17.06.17.
 */

import * as types from '../ActionTypes'

import {Map, Set} from 'immutable'

const initialState = {
    loading: false,
    error: undefined,
    selectedAircraftsSet: Set(),
    timestamp: undefined,

    activePlanes: {},
    activeAircrafts: new Set(),
    currentTime: 0,
    default_dt: 200,
    speed: 1,
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


        case types.SET_AIRCRAFTS_FROM_HISTORY:
            return{
                ...state,
                activeAircrafts: action.activeAircrafts,
                currentTime: action.currentTime,
                speed: action.speed
            }


        case types.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime,
                default_dt: action.default_dt,
                speed: action.speed,
            }

        case types.SHOW_ACTIVE_PLANES:
            return {
                ...state,
                activePlanes: action.activePlanes,
            }

        default:
            return state;
    }

}

export default DashboardReducer