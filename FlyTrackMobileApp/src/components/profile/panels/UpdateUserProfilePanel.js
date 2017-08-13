/**
 * Created by sabir on 07.08.17.
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

import UpdateUserProfileForm from '../forms/UpdateUserProfileForm'

 import * as usersActions from '../../../redux/actions/UsersActions'

 import * as organizationsActions from '../../../redux/actions/OrganizationsActions'

 class UpdateUserProfilePanel extends React.Component {

     static defaultProps = {

     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {loadOrganizations} = this.props;
         loadOrganizations();
     }

     componentWillReceiveProps() {

     }

     render = () => {
         let {user, onSave, loading, organizations} = this.props;
         if (user == undefined){
             return null;
         }

         return (
             <View style={styles.container} >

                 <View>
                     <UpdateUserProfileForm {...user}
                         organizations={organizations}
                         onSave={(data) => {
                             let d = Object.assign({}, {id: user.id}, data);
                             onSave(d);
                         }}
                     />
                     {loading == false ? null :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator />
                            <Text>
                                loading...
                            </Text>
                        </View>
                     }
                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         padding: 10,
         backgroundColor: 'white',
         borderRadius: 5
     },

 });


 const mapStateToProps = (state) => {
    return {
        user: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading,
        organizations: state.organizations.organizationsMap.toArray()
                       .sort((a, b) => (a.timestamp - b.timestamp))
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (data) => {
            return dispatch(usersActions.updateUser(data))
        },
        loadOrganizations: () => {
            return dispatch(organizationsActions.loadOrganizations())
        }
    }
 }

 UpdateUserProfilePanel = connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfilePanel)

 export default UpdateUserProfilePanel