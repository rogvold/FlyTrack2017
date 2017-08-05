/**
 * Created by sabir on 13.06.17.
 */

import * as organizationsActions from './OrganizationsActions'
import * as aircraftsActions from './AircraftsActions'
import * as usersActions from './UsersActions'
import * as sessionsActions from './SessionsActions'
import * as realtimeActions from './RealtimeActions'

export function loadEverything(){
    return (dispatch, getState) => {
        dispatch(aircraftsActions.loadUsersAircrafts());
    }
}