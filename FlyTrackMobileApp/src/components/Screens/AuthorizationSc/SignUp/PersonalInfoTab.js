/**
 * Created by mityabeldii on 23.06.2017.
 */

import * as stab from '../../../../../stab.json'
import * as mvConsts from '../../../../constants/mvConsts'
const window = Dimensions.get('window');

// React
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Animated,
    Text,
    View,
    WebView,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

// Components
import MVButton from '../../ProfileSc/MVButton'

// Component
class PersonalInfoTab extends Component {

    state = {
        name: '',
        surname: '',
        airport: '',
    }

    componentWillReceiveProps (nextProps) {
        if ((!nextProps.isLoggedIn) && (this.props.isLoggedIn)) {
            this.setState({name: '', surname: '', airport: '', })
        }
    }

    checkCorrectness = () => {

        // Name
        if (this.state.name.length === 0) {
            return mvConsts.errors.outOfName
        }

        // Surname
        if (this.state.surname.length === 0) {
            return mvConsts.errors.outOfSurname
        }

        // Airport
        if (this.state.airport.length === 0) {
            return mvConsts.errors.outOfAirport
        }

        //Out of Errors
        return mvConsts.errors.outOfErrors
    }

    onButtonPress = () => {
        if (this.checkCorrectness() === mvConsts.errors.outOfErrors) {
            this.props.next();
        } else {
            this.props.error(this.checkCorrectness());
        }
    }

    choosingAirport = () => {
        this.refs.airportinput.editable = true
    }

    openPicker = () => {
        this.props.opacityPush(stab.airports, (value) => {this.setState({airport: value})})
    }

    render() {

        let { store, profiledata } = this.props;
        let inputHeight = mvConsts.fontSizeMiddle * 1.2;
        let picker = (
            <View style={{width: '100%', height: mvConsts.fontSizeMiddle * 2.2, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                <TouchableOpacity style={{width: '80%', height: '100%', paddingLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }} onPress={() => {this.openPicker()}} >
                    <TextInput
                        placeholder={store.dictionary.airport}
                        placeholderTextColor={mvConsts.fontColorSecondary}
                        multiline={false}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        style={{width: '98%', height: inputHeight, color: mvConsts.fontColorMain, fontSize: mvConsts.fontSizeMiddle * 0.9, }}
                        keyboardAppearance={'dark'}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onFocus={() => {this.props.typing()}}
                        onEndEditing={() => {this.props.typing()}}
                        onChangeText={(text) => this.setState({airport: text,})}
                        value={this.state.airport}
                        editable={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: '18%', height: '100%', marginLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.openPicker()}} >
                    <Image
                        style={{width: inputHeight * 0.8, height: inputHeight * 0.8, }}
                        source={require('../../../../../assets/Icons2/down-arrow.png')}
                    />
                </TouchableOpacity>
            </View>
        )

        return (
            <View style={{width: '100%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%', marginTop: '2%', justifyContent: 'center', alignItems: 'center', }} onPress={() => {this.props.goToSignIn()}}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1, color: mvConsts.fontColorSecondary, alignItems: 'center', }} >{store.dictionary.personalinfo}</Text>
                </View>

                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginTop: '3%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={store.dictionary.firstname}
                        placeholderTextColor={mvConsts.fontColorSecondary}
                        multiline={false}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        style={{width: '100%', height: inputHeight, color: mvConsts.fontColorMain, fontSize: mvConsts.fontSizeMiddle * 0.9, }}
                        keyboardAppearance={'dark'}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onFocus={() => {this.props.typing()}}
                        onEndEditing={() => {this.props.typing()}}
                        onChangeText={(text) => this.setState({name: text,})}
                        value={this.state.name}
                    />
                </View>
                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={store.dictionary.secondname}
                        placeholderTextColor={mvConsts.fontColorSecondary}
                        multiline={false}
                        numberOfLines={1}
                        style={{width: '100%', height: inputHeight, color: mvConsts.fontColorMain, fontSize: mvConsts.fontSizeMiddle * 0.9, }}
                        keyboardAppearance={'dark'}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onFocus={() => {this.props.typing()}}
                        onEndEditing={() => {this.props.typing()}}
                        onChangeText={(text) => this.setState({surname: text,})}
                        value={this.state.surname}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{width: '90%', marginBottom: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    {picker}
                </View>
                <TouchableOpacity style={{width: '90%', marginBottom: '5%', height: inputHeight * 2, borderRadius: mvConsts.littleRadius, alignItems: 'center', }} onPress={() => {this.onButtonPress()}}>
                    <MVButton text={store.dictionary.next} style={mvConsts.buttonStyles.accept} borderRadius={mvConsts.bigRadius} />
                </TouchableOpacity>
            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        isLoggedIn: (state.users.currentUserId != undefined)
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        opacityPush: (array, func) => {
            return dispatch({
                type: 'opacityPush',
                layerName: 'picker',
                data: {array, func, editable: true, search: true,},

            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoTab)