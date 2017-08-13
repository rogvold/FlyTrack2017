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
         organizations: [],

         onSave: (data) => {

         }
     }

     static propTypes = {}

     state = {
         firstName: this.props.firstName,
         lastName: this.props.lastName,
         organizationId: this.props.organizationId,
         changed: false
     }

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {

     }

     componentWillReceiveProps(nextProps) {
         let {firstName, lastName, organizationId} = nextProps;
         if (this.props.firstName != firstName || lastName != this.props.lastName || organizationId != this.props.organizationId){
             this.setState({
                 firstName,
                 lastName,
                 organizationId,
                 changed: false
             });
         }
     }

     onSave = () => {
         let {firstName, lastName, organizationId} = this.state;
         this.props.onSave({
             firstName: firstName,
             lastName: lastName,
             organizationId: organizationId
         });
         this.setState({
             changed: false
         });
     }

     render = () => {
         let {firstName, lastName, organizationId, changed} = this.state;
         let {organizations} = this.props;

         return (
             <View style={styles.container} >

                 <View style={styles.field} >
                     {(firstName == undefined || firstName.trim() == '') ? null :
                         <Text style={styles.label} >
                            Имя
                         </Text>
                     }
                     <View>
                         <TextInput placeholder={'Имя'}  style={styles.input}
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
                             Фамилия
                         </Text>
                     }
                     <View>
                         <TextInput placeholder={'Фамилия'} style={styles.input}
                                    value={lastName} onChangeText={(newText) => {
                             this.setState({
                                 lastName: newText,
                                 changed: true
                             });
                         }} />
                     </View>
                 </View>

                 <View style={styles.field} >
                     <Text style={styles.label} >
                         Аэродром
                     </Text>
                     <View>
                         <Picker
                             selectedValue={this.state.organizationId}
                             onValueChange={(itemValue, itemIndex) => this.setState({organizationId: itemValue, changed: true})}>
                             {organizations.map((org, k) => {
                                return (
                                    <Picker.Item label={(org.name + ' (' + org.code + ')')} value={org.id} key={org.id} />
                                )
                             })}
                         </Picker>
                     </View>
                 </View>

                 {changed == false ? null :
                     <View style={styles.saveButtonPlaceholder} >
                         <TouchableHighlight style={styles.saveButton} onPress={() => {
                         this.onSave()
                     }} >
                             <Text style={{textAlign: 'center'}} >
                                 Сохранить
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