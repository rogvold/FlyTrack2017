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

 import UpdateAircraftPanel from './UpdateAircraftPanel'
 import NoAircraftsPanel from './NoAircraftsPanel'

let {width, height} = Dimensions.get('window');

 class AircraftsPanel extends React.Component {

     static defaultProps = {}

     static propTypes = {}

     state = {
         createMode: false,

         selectedUpdateAircraftId: undefined

     }

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
         let {selectedUpdateAircraftId} = this.state;
         if (aircrafts.length == 0){
             return (<NoAircraftsPanel />)
         }

         return (
             <View style={styles.container} >

                 <View style={{padding: 5, justifyContent: 'center'}} >
                     <Text style={{fontSize: 16, fontWeight: 'bold'}} >
                         Мои воздушные судна
                     </Text>
                 </View>

                 <Modal visible={(selectedUpdateAircraftId != undefined)} >
                     <View style={{
                         padding: 10
                     }} >

                         <View style={{height: height}} >
                             <UpdateAircraftPanel id={selectedUpdateAircraftId} onSaved={() => {
                                 this.setState({
                                     selectedUpdateAircraftId: undefined
                                 });
                             }} />
                         </View>

                         <TouchableOpacity
                             style={{position: 'absolute', bottom: 20, left: 5, right: 5, padding: 10, backgroundColor: 'whitesmoke'}}
                             onPress={() => {
                                 this.setState({
                                     selectedUpdateAircraftId: undefined
                                 });
                            }} >
                             <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 5, paddingTop: 5}} >
                                 Закрыть
                             </Text>
                         </TouchableOpacity>

                     </View>
                 </Modal>

                 <Modal visible={this.state.createMode} animationType={"slide"} transparent={false} >
                     <View style={{

                         padding: 10
                     }} >

                         <View style={{height: height}} >
                             <UpdateAircraftPanel onSaved={() => {
                                 this.setState({
                                     createMode: false
                                 });
                             }} />
                         </View>

                         <TouchableOpacity
                             style={{position: 'absolute', bottom: 20, left: 5, right: 5, padding: 10, backgroundColor: 'whitesmoke'}}
                             onPress={() => {
                                 this.setState({
                                     createMode: false
                                 });
                            }} >
                             <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 5, paddingTop: 5}} >
                                 Закрыть
                             </Text>
                         </TouchableOpacity>

                     </View>
                 </Modal>

                 <View>
                     <TouchableOpacity style={{padding: 5, borderBottomWidth: 1, borderBottomColor: 'whitesmoke'}}
                                       onPress={() => {
                                                     this.setState({
                                                         createMode: true
                                                     });
                                                }} >
                        <Text style={{textAlign: 'right', fontWeight: 'bold'}} >
                            + Добавить
                        </Text>
                     </TouchableOpacity>
                 </View>

                 {loading == false ? null :
                     <View>
                         <Text>
                             загрузка...
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
                                                                position: 'relative',
                                                                backgroundColor: (isSelected == true) ? 'lightgrey' : 'white',
                                                                borderBottomColor: 'lightgrey'}} >
                             <View>

                                 <View style={{flexDirection: 'row'}} >
                                     <Text style={{fontWeight: 'bold', fontSize: 16, flex: 1}} >
                                         {a.name}
                                     </Text>
                                     <Text style={{flex: 1, textAlign: 'right', opacity: 0.5}} >
                                         ({a.aircraftNumber})
                                     </Text>
                                 </View>

                                 <Text>
                                     <Text style={{fontWeight: 'bold'}} >
                                         Тип:
                                     </Text>
                                     <Text>
                                         {a.aircraftType}
                                     </Text>
                                 </Text>

                                 <Text>
                                     <Text style={{fontWeight: 'bold'}} >
                                         Позывной:
                                     </Text>
                                     <Text>
                                         {a.callName}
                                     </Text>
                                 </Text>
                             </View>

                             <View style={{position: 'absolute', right: 5, bottom: 5}} >
                                 <TouchableOpacity onPress={() => {
                                     this.setState({
                                         selectedUpdateAircraftId: a.id
                                     });
                                 }} >
                                     <Text style={{textAlign: 'right'}} >
                                         <Icon name="pencil" size={30} color="#eeeeee" />
                                     </Text>
                                 </TouchableOpacity>
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
         backgroundColor: 'white',
         borderRadius: 5,
         padding: 5,
         marginTop: 10
     }

 });


 const mapStateToProps = (state) => {
    return {
        loading: state.aircrafts.loading,
        selectedAircraftId: state.aircrafts.selectedAircraftId,
        aircrafts: state.aircrafts.aircraftsMap.toArray()
            .filter((a) => (a.userId == state.users.currentUserId))
            .sort((a, b) => (b.timestamp - a.timestamp))
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