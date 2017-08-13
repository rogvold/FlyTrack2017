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

 import UpdateAircraftForm from '../forms/UpdateAircraftForm'

 import * as aircraftsActions from '../../../redux/actions/AircraftsActions'

 class UpdateAircraftPanel extends React.Component {

     static defaultProps = {
         onSaved: () => {

         }
     }

     static propTypes = {

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
         let {updateAircraft, createAircraft, aircraft, onSaved} = this.props;

         return (
             <View style={styles.container} >

                 {aircraft == undefined ? null :
                     <View>
                         <UpdateAircraftForm
                             {...aircraft}
                             onSave={(data) => {{
                                let d = Object.assign({}, aircraft, data);
                                updateAircraft(d).then(
                                    () => {
                                        onSaved();
                                    }
                                );
                         }}} />
                     </View>
                 }

                 {aircraft != undefined ? null :
                     <View>
                         <UpdateAircraftForm
                             onSave={(data) => {{
                            createAircraft(data).then(
                                () => {
                                    onSaved();
                                }
                            );
                         }}} />
                     </View>
                 }

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 10,
         // backgroundColor: 'white',
         borderRadius: 5,
         borderColor: 'whitesmoke'
     },


 });


 const mapStateToProps = (state, ownProps) => {
    return {
        aircraft: state.aircrafts.aircraftsMap.get(ownProps.id),
        loading: state.aircrafts.loading
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        updateAircraft: (data) => {
            return dispatch(aircraftsActions.updateAircraft(data))
        },
        createAircraft: (data) => {
            return dispatch(aircraftsActions.createAircraft(data))
        }
    }
 }

 UpdateAircraftPanel = connect(mapStateToProps, mapDispatchToProps)(UpdateAircraftPanel)

 export default UpdateAircraftPanel