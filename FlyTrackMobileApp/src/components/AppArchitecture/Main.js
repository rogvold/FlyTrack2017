/**
 * Created by mityabeldii on 15.06.2017.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';
import App from './App'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from '../../reducers/index';
const store = createStore(reducer);

export default class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Main', () => Main);
