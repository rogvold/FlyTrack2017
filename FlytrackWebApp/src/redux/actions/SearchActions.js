/**
 * Created by sabir on 18.06.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

export function openSearchDialog(mode){
    return (dispatch, getState) => {
        return dispatch({
            type: types.OPEN_SEARCH_DIALOG,
            mode: mode
        })
    }
}

export function closeSearchDialog(){
    return (dispatch, getState) => {
        return dispatch({
            type: types.CLOSE_SEARCH_DIALOG
        })
    }
}

export function openUsersSearchDialog(){
    return (dispatch, getState) => {
        return dispatch({
            type: types.OPEN_SEARCH_DIALOG,
            mode: 'users'
        })
    }
}