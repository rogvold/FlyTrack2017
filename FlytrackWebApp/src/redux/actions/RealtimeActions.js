/**
 * Created by sabir on 13.06.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

export function addRealtimeMessages(messages){
    return (dispatch, getState) => {
        return dispatch({
            type: types.REALTIME_MESSAGE_RECEIVED,
            messages: messages
        })
    }
}