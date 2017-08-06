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

     state = {
         tab: 'my_points'
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps() {

     }

     render = () => {
         let {coordinates, startFlightTimestamp, pusherLoading,
             parseBufferPoints, pusherNotMinePoints,
             startFlight, stopFlight, aircraft, pusherPoints} = this.props;
         let lastCoordinate = (coordinates == undefined || coordinates.length == 0) ? undefined : coordinates[coordinates.length -1];

         let {tab} = this.state;
         let shouldShowMap = false;

         console.log('CurrentUserGPSPanel: render: pusherLoading = ', pusherLoading);

         return (
             <ScrollView style={styles.container} >

                 {(lastCoordinate == undefined || shouldShowMap == false) ? null :
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


                 <View>
                     {pusherLoading == false ? <Text>pusher: not sending</Text> :
                         <Text>
                             <ActivityIndicator /> loading
                         </Text>
                     }
                 </View>

                 <View style={{
                     flexDirection: 'row',
                     padding: 10,
                     paddingLeft: 0,
                     paddingRight: 0,
                     borderTopWidth: 1,
                     borderBottomWidth: 1,
                     borderColor: 'lightgrey',
                     alignItems: 'center',
                     justifyContent: 'center',
                     marginTop: 80
                 }} >
                     <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => {this.setState({tab: 'my_points'})}} >
                         <Text style={{textAlign: 'center', fontWeight: (tab == 'my_points') ? 'bold' : 'normal'}} >
                             GPS
                         </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => {this.setState({tab: 'pusher_not_mine_points'})}} >
                         <Text style={{textAlign: 'center', fontWeight: (tab == 'pusher_not_mine_points') ? 'bold' : 'normal'}} >
                             Pusher ({pusherNotMinePoints.length})
                         </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => {this.setState({tab: 'parse_buffer'})}} >
                         <Text style={{textAlign: 'center', fontWeight: (tab == 'parse_buffer') ? 'bold' : 'normal'}} >
                             Parse buffer ({parseBufferPoints.length})
                         </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => {this.setState({tab: 'pusher_points'})}} >
                         <Text style={{textAlign: 'center', fontWeight: (tab == 'pusher_points') ? 'bold' : 'normal'}} >
                             Pusher buffer ({pusherPoints.length})
                         </Text>
                     </TouchableOpacity>
                 </View>

                 {tab != 'my_points' ? null :
                     <View style={{paddingTop: 10}} >
                         <Text>
                             {coordinates.length}
                         </Text>
                     </View>
                 }

                 {tab != 'pusher_points' ? null :
                     <View style={{paddingTop: 10}} >
                         <Text>
                             {JSON.stringify(pusherPoints)}
                         </Text>
                     </View>
                 }

                 {tab != 'parse_buffer' ? null :
                     <View style={{paddingTop: 10}} >
                         <Text>
                             {JSON.stringify(parseBufferPoints)}
                         </Text>
                     </View>
                 }

                 {tab != 'pusher_not_mine_points' ? null  :
                    <View>
                        <Text>
                            {JSON.stringify(pusherNotMinePoints)}
                        </Text>
                    </View>
                 }



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
        aircraft: state.aircrafts.aircraftsMap.get(state.aircrafts.selectedAircraftId),

        pusherPoints: state.gps.coordinatesMap.toArray()
                      .filter((a) => (a.t > state.realtime.lastTimestamp))
                      .sort((a, b) => (a.t - b.t)),

        parseBufferPoints: state.gps.coordinatesMap.toArray()
                            .filter((a) => ((a.synced == false) && (a.startTimestamp != undefined)))
                            .sort((a, b) => (a.t - b.t)),

        pusherNotMinePoints: state.realtime.pointsMap.toArray()
            .filter((a) => {
                return ((a.user != undefined) && (a.user.id != state.users.currentUserId))})
                        .sort((a, b) => (a.t - b.t)),

        pusherLoading: state.realtime.loading

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