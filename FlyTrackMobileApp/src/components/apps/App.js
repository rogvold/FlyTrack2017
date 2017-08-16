/**
 * Created by sabir on 19.07.17.
 */

import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MityayApp from '../AppArchitecture/App'

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
    Dimensions,
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
import ProfileApp from './ProfileApp'
import LoginApp from './LoginApp'
import SignUpApp from './SignUpApp'

import {Constants, Font} from 'expo'

let {width, height} = Dimensions.get('window');

import NoAircraftsPanel from '../aircrafts/panels/NoAircraftsPanel'

class App extends React.Component {

    static defaultProps = {

    }

    static propTypes = {}

    state = {
        fontLoaded: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }

    async componentDidMount() {
        await Font.loadAsync({
            'segoeui': require('../../../assets/fonts/segoeui.ttf'),
            'segoeuib': require('../../../assets/fonts/segoeuib.ttf'),
            'seguisb': require('../../../assets/fonts/seguisb.ttf'),
        });

        this.setState({ fontLoaded: true });
    }



    render = () => {
        let {initialized, tab, user, isLoggedIn, aircrafts, aircraftsLoading} = this.props;
        Expo.ScreenOrientation.allow('PORTRAIT_UP');

        if (this.state.fontLoaded == false){
            return <View style={styles.container}>
                <Text>

                </Text>
            </View>;
        }

        if (initialized == false){
            return <InitializingApp />
        }

        if (user == undefined){
            return (
                <View style={{flex: 1}} >
                    {tab == 'signup' ? <SignUpApp /> : <LoginApp />}
                </View>
            )
        }

        return (
            <View style={styles.container} >

                {true == true ? null :
                    <MityayApp />
                }

                {(aircrafts.length == 0 && aircraftsLoading == false) ?
                    <View style={{height: height * 2.0 / 3.0, marginTop: height / 16.0}} >
                        <NoAircraftsPanel />
                    </View> :
                    <ScrollView>

                        {tab != 'settings' ? null :
                            <SettingsApp />
                        }

                        {tab != 'flight' ? null :
                            <GPSApp />
                        }

                        {tab != 'profile' ? null :
                            <ProfileApp />
                        }

                    </ScrollView>
                }

                {((aircrafts.length == 0) && (aircraftsLoading == false)) ? null :
                    <BottomNavigationPanel /> }


                {(initialized == false || isLoggedIn == false) ? null :
                    <View style={{display: 'none'}} >
                        <GPSDaemon />
                        <RealtimeDaemon />
                        <ParseSenderDaemon />
                    </View>
                }

                <KeyboardSpacer />

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        paddingTop: Constants.statusBarHeight,

        flex: 1,
        backgroundColor: 'whitesmoke'
    },

});


const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizationsMap.toArray().sort((a, b) => (b.timestamp - a.timestamp)),
        initialized: state.users.initialized,
        tab: state.navigation.tab,
        user: state.users.usersMap.get(state.users.currentUserId),

        aircrafts: state.aircrafts.aircraftsMap.toArray().filter((a) => (a.userId == state.users.currentUserId)),
        aircraftsLoading: state.aircrafts.loading,

        isLoggedIn: (state.users.currentUserId != undefined)

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App