/**
 * Created by sabir on 29.07.17.
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

 import { Constants, Location, Permissions } from 'expo';

 import GPSAPI from '../../../api/GPSAPI'
 import RealTimeAPI from '../../../api/RealTimeAPI'
 // import RealmAPI from '../../../api/RealmAPI'

import * as actions from '../../../redux/actions/GPSActions'
import * as pusherActions from '../../../redux/actions/PusherActions'

 class GPSDaemon extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
         location: null,
         errorMessage: null,
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentWillMount() {

     }

     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
        let {initialized, user} = nextProps;
        let {onPoint, onPusherMessageReceived} = this.props;
        let oldInitialized = this.props.initialized;
        if (oldInitialized == false && initialized == true){
            console.log('trying to subscribe on points receiving');
            GPSAPI.subscribeOnLocationUpdate((p) => {
                onPoint(p)
            })
        }
        if (this.props.coordinates.length == 0 && nextProps.coordinates.length > 0){
            RealTimeAPI.subscribeOnCellChannelsByLatAndLon(
                nextProps.coordinates[0].lat,
                nextProps.coordinates[0].lon, function(data){
                    // console.log('data received from Pusher: data = ', data);
                    onPusherMessageReceived(data);
                })
        }

     }

     render = () => {
         let {initialized, loading, coordinates, user} = this.props;

         return (
             <View style={styles.container}>

             </View>
         );
     }

 }

const styles = StyleSheet.create({
    container: {
            display: 'none'
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});


 const mapStateToProps = (state) => {
    return {
        currentUserId: state.users.currentUserId,
        user: state.users.usersMap.get(state.users.currentUserId),
        coordinates: state.gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t)),
        initialized: state.gps.initialized,
        loading: state.gps.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onPoint: (data) => {
            return dispatch(actions.onNewLocationsReceived([data]))
        },
        onPusherMessageReceived: (data) => {
            return dispatch(pusherActions.onPusherMessageReceived(data))
        }
    }
 }

 GPSDaemon = connect(mapStateToProps, mapDispatchToProps)(GPSDaemon)

 export default GPSDaemon