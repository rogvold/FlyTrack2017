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

 class UpdateUserProfileForm extends React.Component {

     static defaultProps = {
         onSave: (data) => {

         }
     }

     static propTypes = {}

     state = {
         firstName: this.props.firstName,
         lastName: this.props.lastName,
         changed: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
         let {firstName, lastName} = nextProps;
         if (this.props.firstName != firstName || lastName != this.props.lastName){
             this.setState({
                 firstName,
                 lastName,
                 changed: false
             });
         }
     }

     onSave = () => {
         let {firstName, lastName} = this.state;
         this.props.onSave({
             firstName: firstName,
             lastName: lastName
         });
         this.setState({
             changed: false
         });
     }

     render = () => {
         let {firstName, lastName, changed} = this.state;

         return (
             <View style={styles.container} >

                 <View style={styles.field} >
                     {(firstName == undefined || firstName.trim() == '') ? null :
                         <Text style={styles.label} >
                            First name
                         </Text>
                     }
                     <View>
                         <TextInput placeholder={'First name'}  style={styles.input}
                                    value={firstName} onChangeText={(newText) => {
                             this.setState({
                                 firstName: newText,
                                 changed: true
                             });
                         }} />
                     </View>
                 </View>

                 <View style={styles.field} >
                     {(lastName == undefined || lastName.trim() == '') ? null :
                         <Text style={styles.label} >
                             Last name
                         </Text>
                     }
                     <View>
                         <TextInput placeholder={'First name'} style={styles.input}
                                    value={lastName} onChangeText={(newText) => {
                             this.setState({
                                 lastName: newText,
                                 changed: true
                             });
                         }} />
                     </View>
                 </View>

                 {changed == false ? null :
                     <View style={styles.saveButtonPlaceholder} >
                         <TouchableHighlight style={styles.saveButton} onPress={() => {
                         this.onSave()
                     }} >
                             <Text style={{textAlign: 'center'}} >
                                 Save
                             </Text>
                         </TouchableHighlight>
                     </View>
                 }


             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         flex: 1,
     },

     field: {
         marginBottom: 10
     },

     label: {
        fontWeight: 'bold',
         paddingBottom: 5,
         opacity: 0.5
     },

     saveButtonPlaceholder: {

     },

     saveButton: {
         backgroundColor: 'pink',
         padding: 5,
         borderRadius: 5,
         alignItems: 'center',
         justifyContent: 'center'
     },

     input: {
         flex: 1,
         borderBottomWidth: 1,
         borderBottomColor: 'whitesmoke'
     }

 });


 //const mapStateToProps = (state) => {
 //    return {
 //        currentUserId: state.users.currentUserId,
 //        loading: state.users.loading
 //    }
 //}

 //const mapDispatchToProps = (dispatch) => {
 //    return {
 //        onLogout: (data) => {
 //            dispatch(actions.logOut())
 //        }
 //    }
 //}

 //UpdateUserProfileForm = connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfileForm)

 export default UpdateUserProfileForm