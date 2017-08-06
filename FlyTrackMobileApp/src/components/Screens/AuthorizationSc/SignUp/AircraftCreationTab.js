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
        callname: '',
        number: '',
        aircrafttype: '',
    }

    componentWillReceiveProps (nextProps) {
        if ((!nextProps.isLoggedIn) && (this.props.isLoggedIn)) {
            this.setState({name: '', callname: '', number: '', aircrafttype: '',})
        }
    }

    checkCorrectness = () => {

        // // Email
        // if (this.state.email.length === 0) {
        //     return mvConsts.errors.outOfEmail
        // }
        //
        // let dog = false;
        // for (let i in this.state.email) {
        //     if (this.state.email[i] === '@')
        //         dog = true
        // }
        // if (!dog) {
        //     return mvConsts.errors.wrongEmail
        // }
        //
        // // Password
        // if (this.state.password.length === 0) {
        //     return mvConsts.errors.outOfPassword
        // }
        //
        // if (this.state.password.length < mvConsts.passwordLenght) {
        //     return mvConsts.errors.shortPassword
        // }
        //
        // // Confirm
        // if (this.state.confirm.length === 0) {
        //     return mvConsts.errors.outOfCinfirm
        // }
        //
        // if (this.state.confirm !== this.state.password) {
        //     return mvConsts.errors.wrongConfirm
        // }

        //Out of Errors
        return mvConsts.errors.outOfErrors
    }

    onButtonPress = () => {
        if (this.checkCorrectness() === mvConsts.errors.outOfErrors) {
            this.props.login();
        } else {
            this.props.error(this.checkCorrectness());
        }
    }

    openPicker = () => {
        this.props.opacityPush(mvConsts.aircraftTypes, (value) => {this.setState({aircrafttype: value})})
    }

    render() {

        let { store, profiledata } = this.props;
        let inputHeight = mvConsts.fontSizeMiddle * 1.2;
        let picker = (
            <View style={{width: '90%', height: mvConsts.fontSizeMiddle * 2.2, marginBottom: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                <TouchableOpacity style={{width: '80%', height: '100%', paddingLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }} onPress={() => {this.openPicker()}} >
                    <TextInput
                        placeholder={store.dictionary.aircrafttype}
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
                        onChangeText={(text) => this.setState({aircrafttype: text,})}
                        value={this.state.aircrafttype}
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
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1, color: mvConsts.fontColorSecondary, alignItems: 'center', textAlign: 'center', }} >{store.dictionary.aircraftinformation}</Text>
                </View>
                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginTop: '3%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={store.dictionary.name}
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
                <View style={{width: '90%', flexDirection: 'row', }}>
                    <View style={{width: '49%', borderWidth: 1, padding: '2%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <TextInput
                            placeholder={store.dictionary.callname}
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
                            onChangeText={(text) => this.setState({callname: text,})}
                            value={this.state.callname}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={{width: '49%', borderWidth: 1, padding: '2%', marginBottom: '2%', marginLeft: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <TextInput
                            placeholder={store.dictionary.number}
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
                            onChangeText={(text) => this.setState({number: text,})}
                            value={this.state.number}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
                {picker}
                <TouchableOpacity style={{width: '90%', height: inputHeight * 2, borderRadius: mvConsts.littleRadius, alignItems: 'center', }} onPress={() => {this.onButtonPress()}}>
                    <MVButton text={store.dictionary.signup} style={mvConsts.buttonStyles.accept} borderRadius={mvConsts.bigRadius} />
                </TouchableOpacity>
                <View style={{width: '90%', marginTop: '5%', marginBottom: '5%', justifyContent: 'center', alignItems: 'center', }} onPress={() => {this.props.goToSignIn()}}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, alignItems: 'center', textAlign: 'center', }} >{store.dictionary.notmandatory}</Text>
                </View>
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
        login: () => {
            return dispatch({
                type: 'login'
            })
        },
        opacityPush: (array, func) => {
            return dispatch({
                type: 'opacityPush',
                layerName: 'picker',
                data: {array, func, editable: false, search: false},

            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoTab)