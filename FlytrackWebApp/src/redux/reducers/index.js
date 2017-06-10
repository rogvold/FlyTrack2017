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

// import SessionsReducer from './SessionsReducer.js';
// import PusherReducer from './PusherReducer.js';
// import NotesReducer from './NotesReducer.js';
// import ECGViewerReducer from './ECGViewerReducer.js';


export const reducer = combineReducers({
    users: UsersReducer,
    upload: FileUploadReducer,
    chat: ChatReducer,
    comments: CommentsReducer,
    sessions: SessionsReducer,
    aircrafts: AircraftsReducer
    // sessions: SessionsReducer,
    // notes: NotesReducer,
    // pusher: PusherReducer,
    // ecg: ECGViewerReducer,

});