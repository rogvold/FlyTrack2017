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

import * as actions from '../../../redux/actions/AircraftsActions'

import moment from 'moment'

 class AircraftsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {loadAircrafts} = this.props;
        loadAircrafts();
     }

     componentWillReceiveProps() {

     }

     createRandomAircraft = () => {
        let {createAircraft} = this.props;
        //For Mityay: get this data from inputs
        let data = {
            name: 'plane_' + (+new Date() % 1000),
            aircraftType: 'PLANE',
            callName: Math.round(Math.random() * 1000) + '_' + (+new Date() % 1000),
            aircraftNumber: (+new Date() % 1000) + ''
        }
        createAircraft(data);
     }

     render = () => {
         let {aircrafts, loading, selectAircraft, selectedAircraftId} = this.props;

         return (
             <View style={styles.container} >

                 <View style={{padding: 5, alignItems: 'center', justifyContent: 'center'}} >
                     <Text>
                         Aircrafts
                     </Text>
                 </View>

                 <View  >
                     <TouchableOpacity
                         style={{
                             padding: 10,
                             alignItems: 'center',
                             justifyContent: 'center',
                             backgroundColor: 'pink'
                         }}
                         onPress={() => {
                            this.createRandomAircraft();
                        }} >
                         <Text style={{textAlign: 'center', fontSize: 16}} >
                             create random plane (change it, Mityay)
                         </Text>
                     </TouchableOpacity>
                 </View>

                 {loading == false ? null :
                     <View>
                         <Text>
                             loading...
                         </Text>
                     </View>
                 }

                 {aircrafts.map((a, k) => {
                     let isSelected = (selectedAircraftId == a.id);
                     return (
                         <TouchableOpacity key={a.id}
                                             onPress={() => {
                                                 if (isSelected == false){
                                                    selectAircraft(a.id)
                                                 }
                                             }}
                                             style={{
                                                                padding: 5,
                                                                borderBottomWidth: 1,
                                                                backgroundColor: (isSelected == true) ? 'lightgrey' : 'white',
                                                                borderBottomColor: 'lightgrey'}} >
                             <View>
                                 <Text>
                                     {a.aircraftType}
                                 </Text>
                                 <Text>
                                     {a.aircraftNumber}
                                 </Text>
                                 <Text>
                                     {a.name}
                                 </Text>
                                 <Text>
                                     {a.callName}
                                 </Text>
                             </View>
                         </TouchableOpacity>
                     )
                 })}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     }

 });


 const mapStateToProps = (state) => {
    return {
        loading: state.aircrafts.loading,
        selectedAircraftId: state.aircrafts.selectedAircraftId,
        aircrafts: state.aircrafts.aircraftsMap.toArray().sort(
            (a, b) => (b.timestamp - a.timestamp)
        )
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        createAircraft: (data) => {
            return dispatch(actions.createAircraft(data))
        },
        loadAircrafts: () => {
            return dispatch(actions.loadUsersAircrafts())
        },
        selectAircraft: (id) => {
            return dispatch(actions.selectAircraft(id))
        }
    }
 }

 AircraftsPanel = connect(mapStateToProps, mapDispatchToProps)(AircraftsPanel)

 export default AircraftsPanel