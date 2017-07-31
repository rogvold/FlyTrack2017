/**
 * Created by sabir on 31.07.17.
 */
import * as types from '../ActionTypes'

export function selectTab(tab){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_NAVIGATION_TAB,
            tab: tab
        })
    }
}