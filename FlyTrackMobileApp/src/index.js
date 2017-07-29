/**
 * Created by sabir on 19.07.17.
 */

import React from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
import ParseAPI from './api/ParseAPI.js';

//actions
import * as actions from './redux/actions/SportActions.js';
import * as initActions from './redux/actions/InitActions.js';
import * as usersActions from './redux/actions/UsersActions.js';

import {reducer} from './redux/reducers'

const loggerMiddleware = createLogger()


import {persistStore, autoRehydrate} from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import {AsyncStorage} from 'react-native'

const store = (__DEV__ ? createStore(
            reducer,
            undefined,
            compose(
                applyMiddleware(thunkMiddleware, loggerMiddleware),
                autoRehydrate()
            )
        ) : createStore(
            reducer,
            undefined,
            compose(
                applyMiddleware(thunkMiddleware),
                autoRehydrate()
            )
        )
)



// const store = (__DEV__ ? createStore(
//             reducer,
//             applyMiddleware(thunkMiddleware, loggerMiddleware)
//         ) :
//         createStore(
//             reducer,
//             applyMiddleware(thunkMiddleware)
//         )
// );

export default function setup() {
    class RootApp extends React.Component{

        render() {
            if (__DEV__){
                console.log('rendering app');
            }

            return (
                <Provider store={store}>

                    <App />

                </Provider>
            );
        }

    }
    ParseAPI.initParse();
    return RootApp;
}



let init = () => {
    return (dispatch, getState) => {
        dispatch(usersActions.initializeAuthorization()).then(
            () => dispatch(initActions.loadEverything())
        )
    }
}

let startNotFirstTime = () => {
    // persistStore(store, {storage: AsyncStorage, transforms: [immutableTransform()]}, () => {
        store.dispatch(init());
    // })
}

let startFirstTime = () => {
    if (__DEV__){
        console.log('startFirstTime occured - not using redux persist');
    }
    store.dispatch(init());
}


//checking if the launch is the first
AsyncStorage.getItem("alreadyLaunched").then(value => {
    if(value == null){
        console.log('this is the first launch!');
        AsyncStorage.setItem('alreadyLaunched', '1');
        startFirstTime();
    }else {
        console.log('not first launch');
        startNotFirstTime();
    }
})