/**
 * Created by sabir on 29.07.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

import * as organizationsActions from './OrganizationsActions'
import * as aircraftsActions from './AircraftsActions'
import * as sessionsActions from './SessionsActions'
import * as gpsActions from './GPSActions'

export function loadEverything(){
    return (dispatch, getState) => {
        dispatch(gpsActions.initGPS())
        dispatch(organizationsActions.loadOrganizations());
        dispatch(aircraftsActions.loadUsersAircrafts());
        dispatch(sessionsActions.loadUserSessions());
    }
}