/**
 * Created by sabir on 31.07.17.
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

 class IndexApp extends React.Component {

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

         return (
             <View style={styles.container} >

             </View>
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
        user: state.users.usersMap.get(state.users.currentUserId)
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 IndexApp = connect(mapStateToProps, mapDispatchToProps)(IndexApp)

 export default IndexApp