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

 import * as sessionsActions from '../../../redux/actions/SessionsActions'

 class ParseSenderDaemon extends React.Component {

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

     componentWillReceiveProps(nextProps) {
        let {coordinates} = nextProps;
        this.sendPointsToParse(coordinates);
     }



     sendPointsToParse = (coordinates) => {
         let {loading, saveSessionPoints, selectedAircraftId, startFlightTimestamp, user} = this.props;
         console.log('ParseSenderDaemon: sendPointsToParse: coordinates = ', coordinates);
         if (loading == true || coordinates.length == 0 || user == undefined){
             return;
         }
         let data = {
             startTimestamp: startFlightTimestamp,
             aircraftId: selectedAircraftId,
             userId: user.id,
             points: coordinates
         }
         saveSessionPoints(data);
     }

     componentWillUnmount(){

     }

     render = () => {
         let {user, initialized, startFlightTimestamp} = this.props;

         return (
             <View style={styles.container} >

             </View>
         )
     }

 }

 let styles = StyleSheet.create({
     container: {
         flex: 1,
         display: 'none'
     },

 });

let getNotSyncedCoordinated = (state) => {
    return state.gps.coordinatesMap.toArray().filter(
        c => ((c.synced == false) && (c.startTimestamp != undefined))
    ).sort((a, b) => (a.t - b.t))
}

 const mapStateToProps = (state) => {
    return {
        initialized: state.users.initialized,
        user: state.users.usersMap.get(state.users.currentUserId),
        startFlightTimestamp: state.flight.startFlightTimestamp,
        coordinates: getNotSyncedCoordinated(state),
        loading: state.sessions.loading,
        selectedAircraftId: state.aircrafts.selectedAircraftId
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        saveSessionPoints: (data) => {
            console.log('saveSessionPoints: data = ', data);
            return dispatch(sessionsActions.saveSessionPoints(data))
        }
    }
 }

 ParseSenderDaemon = connect(mapStateToProps, mapDispatchToProps)(ParseSenderDaemon)

 export default ParseSenderDaemon