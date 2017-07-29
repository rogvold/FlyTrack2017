/**
 * Created by sabir on 29.07.17.
 */
import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';

import * as organizationsActions from './OrganizationsActions'
import * as aircraftsActions from './AircraftsActions'

export function loadEverything(){
    return (dispatch, getState) => {
        dispatch(organizationsActions.loadOrganizations());
        dispatch(aircraftsActions.loadUsersAircrafts());
    }
}