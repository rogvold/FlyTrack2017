/**
 * Created by sabir on 31.07.17.
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

 import AuthUserPanel from '../users/panels/AuthUserPanel'

 import UpdateUserProfilePanel from '../profile/panels/UpdateUserProfilePanel'

 import AircraftsPanel from '../aircrafts/panels/AircraftsPanel'

 import * as usersActions from '../../redux/actions/UsersActions'

 class SettingsApp extends React.Component {

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
         let {logout, currentUserId} = this.props;
         if (currentUserId == undefined){
             return null;
         }

         return (
             <ScrollView style={styles.container} >

                 <UpdateUserProfilePanel />

                 <AircraftsPanel />

                 <View style={{marginTop: 10}} >
                     <TouchableHighlight
                        style={{alignItems: 'center', justifyContent: 'center',

                                padding: 8, backgroundColor: 'pink'}}
                         onPress={() => {
                            logout()
                        }} >
                         <Text>
                             Выход
                         </Text>
                     </TouchableHighlight>
                 </View>

             </ScrollView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 10
     },

 });


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        loading: state.users.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            return dispatch(usersActions.logOut())
        }
    }
 }

 SettingsApp = connect(mapStateToProps, mapDispatchToProps)(SettingsApp)

 export default SettingsApp