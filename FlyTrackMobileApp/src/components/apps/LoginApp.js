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

 import AuthUserPanel from '../users/panels/AuthUserPanel'

 import * as navigationActions from '../../redux/actions/NavigationActions'

 class LoginApp extends React.Component {

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
         let {switchToSignUp} = this.props;
         console.log('LoginApp: render occured');

         return (
             <View style={styles.container} >

                 <AuthUserPanel />

                 <View>
                     <TouchableOpacity
                         style={{padding: 5}}
                         onPress={() => {
                            switchToSignUp()
                         }} >
                             <Text style={{textAlign: 'center'}} >
                                 Еще не зарегистрированы? Создать аккаунт!
                             </Text>
                     </TouchableOpacity>
                 </View>


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

    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        switchToSignUp: (tab) => {
            return dispatch(navigationActions.selectTab('signup'))
        }
    }
 }

 LoginApp = connect(mapStateToProps, mapDispatchToProps)(LoginApp)

 export default LoginApp