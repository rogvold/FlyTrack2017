/**
 * Created by sabir on 19.07.17.
 */
import { combineReducers } from 'redux';

import SportReducer from './SportReducer.js';
import PusherReducer from './PusherReducer.js';
import AircraftsReducer from './AircraftsReducer.js';
import OrganizationsReducer from './OrganizationsReducer.js';
import SessionsReducer from './SessionsReducer.js';
import UsersReducer from './UsersReducer.js';
import GPSReducer from './GPSReducer.js';

export const reducer = combineReducers({
    sport: SportReducer,
    realtime: PusherReducer,
    aircrafts: AircraftsReducer,
    organizations: OrganizationsReducer,
    sessions: SessionsReducer,
    users: UsersReducer,
    gps: GPSReducer
});