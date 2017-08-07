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
     ActivityIndicator,
     Keyboard
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as actions from '../../../redux/actions/UsersActions'

 let {width, height} = Dimensions.get('window');

 import {Constants, AppLoading} from 'expo';

 import navigationActions from '../../../redux/actions/NavigationActions'

 class LoginPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
         email: '',
         password: ''
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     login = () => {
         let {login, user, loading} = this.props;
         let {email, password} = this.state;
         if (email == undefined || email.trim() == ''){
             Alert.alert('Can not login', 'Incorrect login or password',
                 [{text: 'OK', onPress: () => console.log('OK Pressed')}]
             );
             return;
         }
         login(email, password).then(
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
         let {login, user, loading} = this.props;
         let {email, password} = this.state;
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
                             <Text>
                                 Email
                             </Text>
                         }
                         <TextInput keyboardType='email' placeholder={'Email'} value={email} onChangeText={(txt) => {
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

                         <TextInput placeholder={'Пароль'} value={password} onChangeText={(txt) => {
                             this.setState({
                                 password: txt
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
                                               this.login();
                                               Keyboard.dismiss();
                                           }}
                         >
                             {loading == false ?
                                 <Text>
                                     Вход
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
         flex: 1,
     },

     loginFormPlaceholder: {
         width: width,
         height: 200,
         padding: 10,
         paddingTop: Constants.statusBarHeight * 2
     },

     field: {
         marginBottom: 30
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
        login: (email, password) => {
            return dispatch(actions.logIn({
                email: email,
                password: password
            })).then(
                () => dispatch(navigationActions.selectTab('profile'))
            )
        }
    }
 }

 LoginPanel = connect(mapStateToProps, mapDispatchToProps)(LoginPanel)

 export default LoginPanel