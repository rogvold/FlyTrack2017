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

 import * as sessionsActions from '../../../redux/actions/SessionsActions'

 import moment from 'moment'

 class UserSessionsPanel extends React.Component {

     static defaultProps = {

     }

     static propTypes = {
         userId: PropTypes.string.isRequired
     }

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
         let {user, sessions, loading, selectSession} = this.props;

         return (
             <View style={styles.container} >

                 <View style={styles.sessions_list} >

                     {sessions.map((session, k) => {
                         let name = (session.name == undefined || session.name.trim() == '') ? 'N/A' : session.name;

                         return (
                             <TouchableHighlight style={styles.session_item} key={session.id} onPress={() => {
                                selectSession(session.id);
                             }} >

                                 <View>

                                     <View>
                                        <Text style={{fontSize: 16, fontWeight: 'bold'}} >
                                            {name}
                                        </Text>
                                     </View>

                                     <View>
                                        <Text style={{color: 'grey'}} >
                                            {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                                        </Text>
                                     </View>

                                 </View>

                             </TouchableHighlight>
                         )

                     })}

                 </View>

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     sessions_list: {

     },

     session_item: {
         marginBottom: 10,
         backgroundColor: 'white',
         borderWidth: 1,
         borderColor: 'lightgrey',
         padding: 5,
         borderRadius: 5
     }

 });


 const mapStateToProps = (state, ownProps) => {
    return {
        sessions: state.sessions.sessionsMap.toArray()
            .filter(s => (s.userId == ownProps.userId))
            .sort((a, b) => (b.startTimestamp - a.startTimestamp)),
        loading: state.sessions.loading || state.users.loading,
        user: state.users.usersMap.get(ownProps.userId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        selectSession: (sessionId) => {
            return dispatch(sessionsActions.selectSession(sessionId))
        }
    }
 }

 UserSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(UserSessionsPanel)

 export default UserSessionsPanel