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
         let {coordinates} = this.props;
         let lastCoordinate = (coordinates == undefined || coordinates.length == 0) ? undefined : coordinates[coordinates.length -1];

         return (
             <ScrollView style={styles.container} >

                 {lastCoordinate == undefined ? null :
                    <View>
                        <Text>
                            Last point: {JSON.stringify(lastCoordinate)}
                        </Text>
                    </View>
                 }

                 <View>
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
        coordinates: state.gps.coordinatesMap.toArray().sort((a, b) => (a.t - b.t))
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 CurrentUserGPSPanel = connect(mapStateToProps, mapDispatchToProps)(CurrentUserGPSPanel)

 export default CurrentUserGPSPanel