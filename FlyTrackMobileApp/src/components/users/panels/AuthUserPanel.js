/**
 * Created by sabir on 30.07.17.
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
     BackAndroid,
     ActivityIndicator
 } from 'react-native';

 import ReactNative from 'react-native';
 const { StatusBarManager } = NativeModules;

 import Icon from 'react-native-vector-icons/FontAwesome'

 import * as usersActions from '../../../redux/actions/UsersActions'

 class AuthUserPanel extends React.Component {

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
         let {currentUserId, login, logout, loading, user} = this.props;

         return (
             <View style={styles.container} >

                 {loading == false ? null :
                    <Text>
                        loading...
                    </Text>
                 }

                 {currentUserId != undefined ? null :
                     <TouchableHighlight
                         style={{
                         padding: 10,
                         backgroundColor: 'pink',
                         marginBottom: 10
                     }}
                         onPress={() => {
                        login('test@test.ru', 'test');
                 }} >
                         <Text>
                             login as test user (email = test@test.ru, password = test)
                         </Text>
                     </TouchableHighlight>
                 }

                 {currentUserId == undefined ? null :
                    <View>
                        <Text>
                            id = {currentUserId}
                        </Text>
                    </View>
                 }

                 {user == undefined ? null :
                    <View>

                        <Text>
                            email = {user.email}
                        </Text>
                        <Text style={{fontWeight: 'bold'}} >
                            {user.firstName} {user.lastName}
                        </Text>

                        <TouchableHighlight
                            style={{padding: 3, backgroundColor: 'red'}}
                            onPress={() => {
                                logout();
                        }}>
                            <Text style={{textAlign: 'center', color: 'white'}} >
                                logout
                            </Text>
                        </TouchableHighlight>

                    </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading,
        user: state.users.usersMap.get(state.users.currentUserId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            return dispatch(usersActions.logIn({
                email, password
            }))
        },
        logout: () => {
            return dispatch(usersActions.logOut())
        }
    }
 }

 AuthUserPanel = connect(mapStateToProps, mapDispatchToProps)(AuthUserPanel)

 export default AuthUserPanel