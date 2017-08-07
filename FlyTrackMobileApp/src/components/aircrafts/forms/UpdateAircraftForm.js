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

class UpdateAircraftForm extends React.Component {

    static defaultProps = {

        onSave: (data) => {

        }
    }

    static propTypes = {}

    state = {
        name: this.props.name,
        callName: this.props.callName,
        aircraftType: this.props.aircraftType,
        aircraftNumber: this.props.aircraftNumber,
        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let {name, callName, aircraftNumber, aircraftType} = nextProps;
        if (this.props.callName != callName ||
            aircraftNumber != this.props.aircraftNumber ||
            aircraftType != this.props.aircraftType ||
            name != this.props.name
        ){
            this.setState({
                name,
                callName,
                aircraftNumber,
                aircraftType,
                changed: false
            });
        }
    }

    onSave = () => {
        let {callName, name, aircraftType, aircraftNumber} = this.state;
        this.props.onSave({
            callName: callName,
            name: name,
            aircraftType: aircraftType,
            aircraftNumber: aircraftNumber
        });
        this.setState({
            changed: false
        });
    }

    getAircraftTypeSelector = () => {
        let allTypes = [{
            label: 'Самолет',
            value: 'PLANE'
        }, {
            label: 'Вертолет',
            value: 'HELICOPTER'
        }, {
            label: 'Планер',
            value: 'GLIDER'
        }, {
            label: 'Гироплан',
            value: 'GYROPLANE'
        }];
        let {aircraftType} = this.state;
        return (
            allTypes.map((aType, k) => {
                let isSelected = (aircraftType == aType.value);
                return (
                    <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        key={aType.value} onPress={() => {
                        this.setState({
                            aircraftType: aType.value,
                            changed: true
                        });
                    }} >
                        <Text style={{fontWeight: (isSelected ? 'bold' : 'normal'), fontSize: 14}} >
                            {isSelected == true ? '[x]' : '[]'} {aType.label}
                        </Text>
                    </TouchableOpacity>
                )
            })
        )
    }

    canSubmit = () => {
        let {callName, aircraftType, aircraftNumber, name, changed} = this.state;
        if (changed == false){
            return false;
        }
        let isEmptyString = (s) => {
            if (s == undefined || s.trim() == ''){
                return true;
            }
            return false;
        }
        if (isEmptyString(callName) || isEmptyString(aircraftType) || isEmptyString(name) || isEmptyString(aircraftNumber) ){
            return false;
        }
        return true;
    }

    render = () => {
        let {name, callName, aircraftType, aircraftNumber, changed} = this.state;
        let canSubmit = this.canSubmit();

        return (
            <View style={styles.container} >

                <View style={styles.field} >
                    {(name == undefined || name.trim() == '') ? null :
                        <Text style={styles.label} >
                            Название
                        </Text>
                    }
                    <View>
                        <TextInput placeholder={'Название воздушного судна'}  style={styles.input}
                                   value={name} onChangeText={(newText) => {
                             this.setState({
                                 name: newText,
                                 changed: true
                             });
                         }} />
                    </View>
                </View>

                <View style={styles.field} >
                    {(callName == undefined || callName.trim() == '') ? null :
                        <Text style={styles.label} >
                            Позывной
                        </Text>
                    }
                    <View>
                        <TextInput placeholder={'Позывной'} style={styles.input}
                                   value={callName} onChangeText={(newText) => {
                             this.setState({
                                 callName: newText,
                                 changed: true
                             });
                         }} />
                    </View>
                </View>

                <View style={styles.field} >
                    {(aircraftNumber == undefined || aircraftNumber.trim() == '') ? null :
                        <Text style={styles.label} >
                            Номер воздушного судна
                        </Text>
                    }
                    <View>
                        <TextInput placeholder={'Номер воздушного судна'} style={styles.input}
                                   value={aircraftNumber} onChangeText={(newText) => {
                             this.setState({
                                 aircraftNumber: newText,
                                 changed: true
                             });
                         }} />
                    </View>
                </View>

                <View style={styles.field} >
                    {this.getAircraftTypeSelector()}
                </View>

                {canSubmit == false ? null :
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

    },

    field: {
        marginBottom: 10,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'whitesmoke'
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

//UpdateAircraftForm = connect(mapStateToProps, mapDispatchToProps)(UpdateAircraftForm)

export default UpdateAircraftForm