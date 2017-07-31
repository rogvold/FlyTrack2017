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

 import { MapView } from 'expo';

 let {height, width} = Dimensions.get('window')

 import * as flightActions from '../../../redux/actions/FlightActions'

 class CurrentUserGPSPanel extends React.Component {

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
         let {coordinates, startFlightTimestamp, startFlight, stopFlight, aircraft} = this.props;
         let lastCoordinate = (coordinates == undefined || coordinates.length == 0) ? undefined : coordinates[coordinates.length -1];

         return (
             <ScrollView style={styles.container} >

                 {lastCoordinate == undefined ? null :
                     <View>
                         <MapView style={{ width: width, height: height / 4.0}}
                                  initialRegion={{
                          latitude: lastCoordinate.lat,
                          longitude: lastCoordinate.lon,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                    }}
                         >
                             <MapView.Marker
                                 coordinate={{latitude: lastCoordinate.lat,
                                          longitude: lastCoordinate.lon}}
                             />
                         </MapView>

                         {aircraft == undefined ?
                            <View style={{padding: 5, backgroundColor: 'red'}} >
                                <Text style={{textAlign: 'center', fontWeight: 'bold'}} >
                                    Please select aircraft of the settings page
                                </Text>
                            </View>
                             :
                             <TouchableOpacity
                                 style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey', padding: 7}}
                                 onPress={() => {
                                     if (startFlightTimestamp == undefined){
                                         startFlight();
                                     }else {
                                         stopFlight();
                                     }
                                }} >
                                 <Text>
                                     {startFlightTimestamp == undefined ? 'Start' : 'Stop'}
                                 </Text>
                             </TouchableOpacity>
                         }


                         <View style={{marginTop: 30, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'black'}} >
                             <Text>
                                 Last point: {JSON.stringify(lastCoordinate)}
                             </Text>
                         </View>

                     </View>
                 }

                 <View style={{marginTop: 30, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'black'}} >
                     <Text>
                         All coordinates: {JSON.stringify(coordinates)}
                     </Text>
                 </View>

             </ScrollView>
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
        coordinates: state.gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t)),
        startFlightTimestamp: state.flight.startFlightTimestamp,
        selectedAircraftId: state.aircrafts.selectedAircraftId,
        aircraft: state.aircrafts.aircraftsMap.get(state.aircrafts.selectedAircraftId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        startFlight: () => {
            return dispatch(flightActions.startFlight())
        },
        stopFlight: () => {
            return dispatch(flightActions.stopFlight())
        }
    }
 }

 CurrentUserGPSPanel = connect(mapStateToProps, mapDispatchToProps)(CurrentUserGPSPanel)

 export default CurrentUserGPSPanel