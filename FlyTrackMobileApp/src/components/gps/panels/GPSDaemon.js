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

import * as actions from '../../../redux/actions/GPSActions'

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
         // if (Platform.OS === 'android' && !Constants.isDevice) {
         //     this.setState({
         //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
         //     });
         // } else {
         //     this._getLocationAsync();
         // }
     }

     // _getLocationAsync = async () => {
     //     // let { status } = await Permissions.askAsync(Permissions.LOCATION);
     //     // if (status !== 'granted') {
     //     //     this.setState({
     //     //         errorMessage: 'Permission to access location was denied',
     //     //     });
     //     // }
     //     //
     //     // let location = await Location.getCurrentPositionAsync({});
     //     // this.setState({ location });
     // };



     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
        let {initialized} = nextProps;
        let {onPoint} = this.props;
        let oldInitialized = this.props.initialized;
        if (oldInitialized == false && initialized == true){
            console.log('trying to subscribe on points receiving');
            GPSAPI.subscribeOnLocationUpdate((p) => {
                onPoint(p)
            })
        }

     }

     render = () => {
         let {initialized, loading, coordinates} = this.props;

         return (
             <View style={styles.container}>
                 <Text style={styles.paragraph}>
                     initialized = {JSON.stringify(initialized)}
                 </Text>
                 <Text style={styles.paragraph}>
                     loading = {JSON.stringify(loading)}
                 </Text>
                 <Text style={styles.paragraph}>
                     coordinates = {JSON.stringify(coordinates)}
                 </Text>
             </View>
         );
     }

 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
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
        coordinates: state.gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t)),
        initialized: state.gps.initialized,
        loading: state.gps.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        onPoint: (data) => {
            return dispatch(actions.onNewLocationsReceived([data]))
        }
    }
 }

 GPSDaemon = connect(mapStateToProps, mapDispatchToProps)(GPSDaemon)

 export default GPSDaemon