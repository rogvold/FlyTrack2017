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
            aircraftType: 'plane',
            callName: Math.round(Math.random() * 1000) + '_' + (+new Date() % 1000),
            aircraftNumber: (+new Date() % 1000)
        }
        createAircraft(data);
     }

     render = () => {
         let {aircrafts, loading} = this.props;

         return (
             <View style={styles.container} >

                 <View style={styles.createAircraftPlaceholder} >
                     <TouchableHighlight onPress={() => {
                         this.createRandomAircraft();
                     }} >
                         <Text>
                             create random plane (change it, Mityay)
                         </Text>
                     </TouchableHighlight>
                 </View>

                 {loading == false ? null :
                     <View>
                         <Text>
                             loading...
                         </Text>
                     </View>
                 }

                 {aircrafts.map((a, k) => {
                     return (
                         <TouchableHighlight key={a.id} >
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
                         </TouchableHighlight>
                     )
                 })}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     createAircraftPlaceholder: {

     }

 });


 const mapStateToProps = (state) => {
    return {
        loading: state.aircrafts.loading,
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
        }
    }
 }

 AircraftsPanel = connect(mapStateToProps, mapDispatchToProps)(AircraftsPanel)

 export default AircraftsPanel