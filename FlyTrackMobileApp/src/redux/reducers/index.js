/**
 * Created by sabir on 19.07.17.
 */
import { combineReducers } from 'redux';

import PusherReducer from './PusherReducer.js';
import AircraftsReducer from './AircraftsReducer.js';
import OrganizationsReducer from './OrganizationsReducer.js';
import SessionsReducer from './SessionsReducer.js';
import UsersReducer from './UsersReducer.js';
import GPSReducer from './GPSReducer.js';
import FlightReducer from './FlightReducer.js';
import NavigationReducer from './NavigationReducer.js';

//shit from Mitya
import session from './session.js';
import store from './store.js';

export const reducer = combineReducers({
    realtime: PusherReducer,
    aircrafts: AircraftsReducer,
    organizations: OrganizationsReducer,
    sessions: SessionsReducer,
    users: UsersReducer,
    gps: GPSReducer,
    navigation: NavigationReducer,
    flight: FlightReducer,

    session: session,
    store: store

});