
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    AppRegistry,
    Picker,
    StyleSheet,
    NativeModules,
    Text,
    Modal,
    Dimensions,
    View,
    ListView,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    NativeAppEventEmitter,
    Platform,
    BackAndroid,
    ActivityIndicator
} from 'react-native';

import ReactNative from 'react-native';
const { StatusBarManager } = NativeModules;

import Icon from 'react-native-vector-icons/FontAwesome'

import AuthUserPanel from '../users/panels/AuthUserPanel'

import {Constants} from 'expo';

import * as navigationActions from '../../redux/actions/NavigationActions'

import SignUpPanel from '../auth/panels/SignUpPanel'

class SignUpApp extends React.Component {

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

    render = () => {
        let {switchToLogin} = this.props;

        return (
            <View style={styles.container} >

                <SignUpPanel />

                <View>
                    <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => {
                            switchToLogin()
                         }} >
                        <Text style={{textAlign: 'center'}} >
                            Уже зарегистрированы? Войти!
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },

});


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchToLogin: (tab) => {
            return dispatch(navigationActions.selectTab('login'))
        }
    }
}

SignUpApp = connect(mapStateToProps, mapDispatchToProps)(SignUpApp)

export default SignUpApp