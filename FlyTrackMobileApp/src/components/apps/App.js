/**
 * Created by sabir on 19.07.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    AppRegistry,
    StyleSheet,
    Text,
    Modal,
    View,
    ScrollView,
    Image,
    TextInput,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import * as actions from '../../redux/actions/SportActions'

import GPSDaemon from '../gps/panels/GPSDaemon'

import AuthUserPanel from '../users/panels/AuthUserPanel'

class App extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }



    render = () => {

        return (
            <ScrollView style={styles.container} >

                <AuthUserPanel />

                <GPSDaemon />

            </ScrollView>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 40
    },

});


const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizationsMap.toArray().sort((a, b) => (b.timestamp - a.timestamp))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App