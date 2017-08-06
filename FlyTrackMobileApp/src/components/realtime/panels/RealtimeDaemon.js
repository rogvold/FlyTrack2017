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

import RealTimeAPI from '../../../api/RealTimeAPI'
import LocalDatabaseAPI from '../../../api/LocalDatabaseAPI'
// import RealmAPI from '../../../api/RealmAPI'
import FlytrackHelper from '../../../helpers/FlytrackHelper'

import * as actions from '../../../redux/actions/PusherActions'

 class RealtimeDaemon extends React.Component {

     static defaultProps = {
         // interval: 3 * 1000
         interval: 2 * 1000
     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
         this.initTimer();
         let {user} = this.props;
         if (user == undefined){
             return;
         }
         console.log('trying to get points from the DB');
         // LocalDatabaseAPI.getUserGeoPointsInRange(user.id).then(
         //     points => {
         //         console.log('points = ', points);
         //     },
         //     err => {
         //         console.log('error occured: err = ', err);
         //     }
         // );
     }

     componentWillReceiveProps() {

     }

     sendCoordinateToPusher(){
         let {coordinates, user, sendNewPointsEvent, loading} = this.props;
         if (user == undefined || loading == true){
             return;
         }
         // let c = coordinates[coordinates.length -1];
         // let channel = FlytrackHelper.getPublishChannelByLocation(c.lat, c.lon);
         // LocalDatabaseAPI.saveGeoPoint({...c, userId: user.id}).then(
         //     () => {console.log('saved points to db');},
         //     err => {console.log('error while saving point to db: err = ', err);}
         // );

         sendNewPointsEvent();

         // RealTimeAPI.sendEvent(channel.name, 'client-position', {
         //     coordinate: c,
         //     user: user
         // }).then(
         //     () => {
         //         console.log('successfully triggered event');
         //     },
         //     err => {
         //         console.log('error while triggering event');
         //     }
         // );
     }

     initTimer = () => {
         let {interval} = this.props;
         if (this.intervalId == undefined){
            this.intervalId = setInterval(() => {
                this.sendCoordinateToPusher();
            }, interval)
         }
     }

     componentWillUnmount(){
         if (this.intervalId != undefined){
             clearInterval(this.intervalId);
         }
     }

     render = () => {

         return (
             <View style={styles.container} >

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         display: 'none'
     },

 });


 const mapStateToProps = (state) => {
    return {
        coordinates: state.gps.coordinatesMap.toArray()
            .filter((a) => (a.t > state.realtime.lastTimestamp))
            .sort((a, b) => (a.t - b.t)),
        user: state.users.usersMap.get(state.users.currentUserId),
        loading: state.realtime.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        sendNewPointsEvent: () => {
            return dispatch(actions.sendPusherEvent())
        }
    }
 }

 RealtimeDaemon = connect(mapStateToProps, mapDispatchToProps)(RealtimeDaemon)

 export default RealtimeDaemon