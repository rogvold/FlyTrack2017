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

 import UpdateAircraftPanel from './UpdateAircraftPanel'

 class NoAircraftsPanel extends React.Component {

     static defaultProps = {
         onSaved: () => {

         }
     }

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
         let {user, loading, aircrafts, onSaved} = this.props;

         if (aircrafts.length > 0){
             return null;
         }

         return (
             <ScrollView style={styles.container} >


                 <View style={{padding: 10}} >
                     <Text style={{textAlign: 'center', fontSize: 16}} >
                         Пожалуйста, добавьте свое воздушное судно!
                     </Text>
                 </View>

                 <View>
                     <UpdateAircraftPanel onSaved={() => {
                         onSaved();
                     }} />
                 </View>

             </ScrollView>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         // flex: 1,
         backgroundColor: 'white',
         padding: 10
     },

 });


 const mapStateToProps = (state) => {
    return {
        user: state.users.usersMap.get(state.users.currentUserId),
        loading: state.users.loading || state.aircrafts.loading,

        aircrafts: state.aircrafts.aircraftsMap.toArray()
            .filter((a) => (a.userId == state.users.currentUserId))
            .sort((a, b) => (a.t - b.t))

    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {

    }
 }

 NoAircraftsPanel = connect(mapStateToProps, mapDispatchToProps)(NoAircraftsPanel)

 export default NoAircraftsPanel