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

 class RealtimeDaemon extends React.Component {

     static defaultProps = {
         interval: 3 * 1000
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
         let {coordinates, user} = this.props;
         if (coordinates == undefined || coordinates.length == 0 || user == undefined){
             return null;
         }
         let c = coordinates[coordinates.length -1];
         let channel = FlytrackHelper.getPublishChannelByLocation(c.lat, c.lon);
         // LocalDatabaseAPI.saveGeoPoint({...c, userId: user.id}).then(
         //     () => {console.log('saved points to db');},
         //     err => {console.log('error while saving point to db: err = ', err);}
         // );
         RealTimeAPI.sendEvent(channel.name, 'client-position', {
             coordinate: c,
             user: user
         });
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
        coordinates: state.gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t)),
        user: state.users.usersMap.get(state.users.currentUserId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 RealtimeDaemon = connect(mapStateToProps, mapDispatchToProps)(RealtimeDaemon)

 export default RealtimeDaemon