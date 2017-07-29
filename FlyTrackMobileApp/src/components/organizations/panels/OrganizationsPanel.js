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

 import * as actions from '../../../redux/actions/OrganizationsActions'

 class OrganizationsPanel extends React.Component {

     static defaultProps = {
         onOrganizationPress: (id) => {

         }
     }

     static propTypes = {}

     state = {}

     //ES5 - componentWillMount
     constructor(props) {
         super(props);
     }

     componentDidMount() {
        let {loadOrganizations} = this.props;
        loadOrganizations();
     }



     componentWillReceiveProps() {

     }

     render = () => {
         let {loading, organizations, onOrganizationPress} = this.props;

         return (
             <ScrollView style={styles.container} >

                <View>
                    {organizations.map((org, k) => {

                        return (
                            <TouchableHighlight key={org.id} onPress={() => {
                                onOrganizationPress(org.id);
                            }} >
                                <View>
                                    <Text>
                                        {org.name}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })}
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
        loading: state.organizations.loading,
        organizations: state.organizations.organizationsMap.toArray().sort(
            (a, b) => {
                return (b.timestamp - a.timestamp)
                //todo: change sorting to "A-Z"
            }
        )
    }
 }

 const mapDispatchToProps = (dispatch) => {
    return {
        loadOrganizations: () => {
            return dispatch(actions.loadOrganizations())
        }
    }
 }

 OrganizationsPanel = connect(mapStateToProps, mapDispatchToProps)(OrganizationsPanel)

 export default OrganizationsPanel