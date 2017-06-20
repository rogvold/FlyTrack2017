/**
 * Created by sabir on 19.02.17.
 */
import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import FileUploadReducer from './FileUploadReducer.js';
import ChatReducer from './ChatReducer.js';
import CommentsReducer from './CommentsReducer.js';
import SessionsReducer from './SessionsReducer.js';
import AircraftsReducer from './AircraftsReducer.js';
import OrganizationsReducer from './OrganizationsReducer.js';
import RealtimeReducer from './RealtimeReducer.js';
import DashboardReducer from './DashboardReducer.js';
import SearchReducer from './SearchReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    upload: FileUploadReducer,
    chat: ChatReducer,
    comments: CommentsReducer,
    sessions: SessionsReducer,
    aircrafts: AircraftsReducer,
    organizations: OrganizationsReducer,
    realtime: RealtimeReducer,
    dashboard: DashboardReducer,
    search: SearchReducer
});