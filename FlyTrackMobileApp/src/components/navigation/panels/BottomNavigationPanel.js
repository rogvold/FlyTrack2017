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

import * as constants from '../../../constants/AccountConstants'

import * as actions from '../../../redux/actions/NavigationActions'

 class BottomNavigationPanel extends React.Component {

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
         let {selectedTabName, selectTab} = this.props;
         let tabs = constants.NAVIGATION_TABS;

         return (
             <View style={styles.container} >

                 {tabs.map((tab) => {
                     let isSelected = (tab.name == selectedTabName);
                     let st = (isSelected == true) ? styles.selectedTabText : styles.tabText;

                     return (
                         <TouchableOpacity key={tab.name}  style={styles.tab} onPress={() => {
                             if (isSelected == true){
                                 return;
                             }
                             selectTab(tab.name);

                         }} >
                             <Text style={st} >
                                 {tab.label}
                             </Text>
                         </TouchableOpacity>
                     )

                 })}

             </View>
         )
     }

 }

 var styles = StyleSheet.create({
     container: {
         position: 'absolute',
         bottom: 0,
         height: 50,
         left: 0,
         right: 0,
         zIndex: 10,
         flexDirection: 'row',
         borderTopWidth: 1,
         borderColor: 'lightgrey'
     },
     tab: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
     },

     tabText: {
         justifyContent: 'center'
     },

     selectedTabText: {
         fontWeight: 'bold',
         justifyContent: 'center'
     }

 });


 const mapStateToProps = (state) => {
    return {
        selectedTabName: state.navigation.tab
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        selectTab: (tab) => {
            return dispatch(actions.selectTab(tab))
        }
    }
 }

 BottomNavigationPanel = connect(mapStateToProps, mapDispatchToProps)(BottomNavigationPanel)

 export default BottomNavigationPanel