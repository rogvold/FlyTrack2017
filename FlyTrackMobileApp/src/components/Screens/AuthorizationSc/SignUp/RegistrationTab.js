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
class RegistrationTab extends Component {

    state = {
        email: '',
        password: '',
        confirm: '',
    }

    componentWillReceiveProps (nextProps) {
        if ((!nextProps.isLoggedIn) && (this.props.isLoggedIn)) {
            this.setState({email: '', password: '', confirm: '', })
        }
    }

    checkCorrectness = () => {

        // Email
        if (this.state.email.length === 0) {
            return mvConsts.errors.outOfEmail
        }

        let dog = false;
        for (let i in this.state.email) {
            if (this.state.email[i] === '@')
                dog = true
        }
        if (!dog) {
            return mvConsts.errors.wrongEmail
        }

        // Password
        if (this.state.password.length === 0) {
            return mvConsts.errors.outOfPassword
        }

        if (this.state.password.length < mvConsts.passwordLenght) {
            return mvConsts.errors.shortPassword
        }

        // Confirm
        if (this.state.confirm.length === 0) {
            return mvConsts.errors.outOfCinfirm
        }

        if (this.state.confirm !== this.state.password) {
            return mvConsts.errors.wrongConfirm
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

    render() {

        let { store, profiledata } = this.props;
        let inputHeight = mvConsts.fontSizeMiddle * 1.2;

        return (
            <View style={{width: '100%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%', marginTop: '2%', justifyContent: 'center', alignItems: 'center', }} onPress={() => {this.props.goToSignIn()}}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1, color: mvConsts.fontColorSecondary, alignItems: 'center', }} >{store.dictionary.registration}</Text>
                </View>
                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginTop: '3%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={'E-mail'}
                        placeholderTextColor={mvConsts.fontColorSecondary}
                        multiline={false}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        style={{width: '100%', height: inputHeight, color: mvConsts.fontColorMain, fontSize: mvConsts.fontSizeMiddle * 0.9, }}
                        keyboardAppearance={'dark'}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onFocus={() => {this.props.typing()}}
                        onEndEditing={() => {this.props.typing()}}
                        onChangeText={(text) => this.setState({email: text,})}
                        value={this.state.email}
                    />
                </View>
                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={store.dictionary.password}
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
                        onChangeText={(text) => this.setState({password: text,})}
                        value={this.state.password}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}

                    />
                </View>
                <View style={{width: '90%', borderWidth: 1, padding: '2%', marginBottom: '2%', borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <TextInput
                        placeholder={store.dictionary.confirm}
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
                        onChangeText={(text) => this.setState({confirm: text,})}
                        value={this.state.confirm}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onSubmitEditing={() => {this.onButtonPress()}}

                    />
                </View>
                <TouchableOpacity style={{width: '90%', height: inputHeight * 2, borderRadius: mvConsts.littleRadius, alignItems: 'center', }} onPress={() => {this.onButtonPress()}}>
                    <MVButton text={store.dictionary.next} style={mvConsts.buttonStyles.accept} borderRadius={mvConsts.bigRadius} />
                </TouchableOpacity>
                <TouchableOpacity style={{width: '100%', marginTop: '5%', marginBottom: '5%', justifyContent: 'center', alignItems: 'center', }} onPress={() => {this.props.goToSignIn()}}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.85, color: mvConsts.fontColorSecondary, alignItems: 'center', }} >{store.dictionary.alreadyhave}</Text>
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

// let mapDispatchToProps = (dispatch) => {
//     return {
//         Authorize: () => {
//             return dispatch({
//                 type: 'Authorize'
//             })
//         },
//     }
// }

// Export
export default connect(mapStateToProps)(RegistrationTab)