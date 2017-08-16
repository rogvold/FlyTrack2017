/**
 * Created by sabir on 02.08.17.
 */

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
    Alert,
    BackAndroid,
    Keyboard,
    ActivityIndicator
} from 'react-native';

import ReactNative from 'react-native';
const { StatusBarManager } = NativeModules;

import Icon from 'react-native-vector-icons/FontAwesome'

import * as actions from '../../../redux/actions/UsersActions'
import * as navigationActions from '../../../redux/actions/NavigationActions'

let {width, height} = Dimensions.get('window');

import {Constants, AppLoading} from 'expo';

class SignUpPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    signup = () => {
        let {signup, loading} = this.props;
        let {email, password, passwordConfirmation} = this.state;
        if (passwordConfirmation != password){
            return;
        }
        if (email == undefined || email.trim() == ''){
            Alert.alert('Ошабка регистрации', '',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
            );
            return;
        }
        signup(email, password).then(
            payload => {
                console.log('login payload = ', payload);
                if (payload.error != undefined){
                    let {message} = payload.error;
                    Alert.alert('Can not login', 'Incorrect login or password',
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                    );
                }
            }
        )
    }

    render = () => {
        let {user, loading} = this.props;
        let {email, password, passwordConfirmation} = this.state;
        if (user != undefined){
            return null;
        }

        return (
            <View style={styles.container} >

                {loading == false ? null :
                    <AppLoading />
                }

                <View style={styles.loginFormPlaceholder} >

                    <View style={styles.field} >
                        {email.length == 0 ? null :
                            <Text >
                                Email
                            </Text>
                        }
                        <TextInput keyboardType='email-address'
                                   style={styles.input}
                                   underlineColorAndroid='transparent'
                                   placeholder={'Email'} value={email} onChangeText={(txt) => {
                             this.setState({
                                 email: txt.toLowerCase()
                             });
                         }} />
                    </View>

                    <View style={styles.field} >
                        {password.length == 0 ? null :
                            <Text>
                                Пароль
                            </Text>
                        }

                        <TextInput placeholder={'Пароль'}
                                   style={styles.input}
                                   underlineColorAndroid='transparent'
                                   value={password} onChangeText={(txt) => {
                             this.setState({
                                 password: txt.toLowerCase()
                             });
                         }} />
                    </View>

                    <View style={styles.field} >
                        {passwordConfirmation.length == 0 ? null :
                            <Text>
                                Пароль еще раз
                            </Text>
                        }

                        <TextInput placeholder={'Пароль еще раз'}
                                   style={styles.input}
                                   underlineColorAndroid='transparent'
                                   value={passwordConfirmation} onChangeText={(txt) => {
                             this.setState({
                                 passwordConfirmation: txt.toLowerCase()
                             });
                         }} />
                    </View>

                    <View>
                        <TouchableOpacity style={{
                                                    backgroundColor: 'pink',
                                                    padding: 10,
                                                    borderRadius: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'}}

                                          onPress={() => {
                                               this.signup();
                                               Keyboard.dismiss();
                                           }}
                        >
                            {loading == false ?
                                <Text style={{fontSize: 20}} >
                                    Зарегистрироваться
                                </Text>
                                :
                                <ActivityIndicator />
                            }

                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }

}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight * 2
    },

    loginFormPlaceholder: {
        width: width * 0.8,
        height: height / 2.0,
        padding: 10,
        paddingTop: Constants.statusBarHeight * 2,
        // backgroundColor: 'green',
        borderRadius: 4
    },

    field: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },

    input: {
        // height: 50,
        // backgroundColor: 'pink'
    }

});


const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        user: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (email, password) => {
            return dispatch(actions.signUp({
                email: email,
                password: password
            })).then(
                () => dispatch(navigationActions.selectTab('profile'))
            )
        }
    }
}

SignUpPanel = connect(mapStateToProps, mapDispatchToProps)(SignUpPanel)

export default SignUpPanel