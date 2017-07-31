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
import RealtimeDaemon from '../realtime/panels/RealtimeDaemon'
import ParseSenderDaemon from '../realtime/panels/ParseSenderDaemon'

import BottomNavigationPanel from '../navigation/panels/BottomNavigationPanel'

import SettingsApp from './SettingsApp'
import GPSApp from './GPSApp'
import InitializingApp from './InitializingApp'

import {Constants} from 'expo'

class App extends React.Component {

    static defaultProps = {

    }

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
        let {initialized, tab, user} = this.props;

        if (initialized == false){
            return <InitializingApp />
        }

        if (user == undefined){
            return (
                <View style={{flex: 1, padding: 50}} >
                    <AuthUserPanel />
                </View>
            )
        }

        return (
            <View style={styles.container} >

                <ScrollView>

                    {tab != 'settings' ? null :
                        <SettingsApp />
                    }

                    {tab != 'flight' ? null :
                        <GPSApp />
                    }

                </ScrollView>

                <BottomNavigationPanel />

                {initialized == false ? null :
                    <View style={{display: 'none'}} >
                        <GPSDaemon />
                        <RealtimeDaemon />
                        <ParseSenderDaemon />
                    </View>
                }

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },

});


const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizationsMap.toArray().sort((a, b) => (b.timestamp - a.timestamp)),
        initialized: state.users.initialized,
        tab: state.navigation.tab,
        user: state.users.usersMap.get(state.users.currentUserId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App