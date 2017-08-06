/**
 * Created by mityabeldii on 19.06.2017.
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
import Logo from './Logo'
import SignInTab from './SignInTab'
import ErrorTab from './ErrorTab'

// Component
class SignInPage extends Component {

    state = {
        typing: true,
        errorCode: mvConsts.errors.outOfErrors,
        top: new Animated.Value(0),
        tabtop: new Animated.Value(-window.height * 0.05),
        logotop: new Animated.Value(0),
        errortop: new Animated.Value(100),
        color: new Animated.Value(0),
        opacity: new Animated.Value(0),
    }

    animation = (variable, value) => {
        Animated.timing(
            variable,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration * 2,
            }
        ).start()
    }

    move = (variable, index, duration) => {
        Animated.timing(
            variable,
            {
                toValue: -window.height * index,
                duration: mvConsts.animationOpcityScDuration * duration,
            }
        ).start()
    }

    typing = () => {
        this.setState({typing: !this.state.typing});
        if (this.state.typing) {
            this.animation(this.state.opacity, 0.9)
            this.move(this.state.top, 0.2, 1)
            this.move(this.state.tabtop, 0.4, 2)
            this.move(this.state.logotop, 0.23, 1)
        }
        else {
            this.animation(this.state.opacity, 0)
            this.move(this.state.top, 0, 2)
            this.move(this.state.tabtop, 0.05, 1)
            this.move(this.state.logotop, 0, 1)
        }
    }

    errormove = (value) => {
        if (value) {
            this.move(this.state.errortop, 0, 1)
            this.move(this.state.tabtop, 0.01, 1)
        } else {
            this.move(this.state.errortop, -0.1, 1)
            this.move(this.state.tabtop, 0.05, 1)
        }
    }

    error = (errorCode) => {
        this.setState({errorCode: errorCode})
        this.animation(this.state.color, 300)
        this.animation(this.state.opacity, 0.9)
        this.errormove(true);
        setTimeout(() => {this.animation(this.state.color, 0); this.animation(this.state.opacity, 0); this.errormove(false)}, mvConsts.animationOpcityScDuration * 7)
    }

    render() {

        let { store, profiledata , isLoggedIn} = this.props;
        if (isLoggedIn) {
            setTimeout(() => {this.props.goToApp()}, 100)
        }

        let color = this.state.color.interpolate({
            inputRange: [0, 300],
            outputRange: ['rgba(1, 60, 130, 1)', 'rgba(160, 20, 21, 1)']
        });

        return (
            <View style={{width: window.width, height: window.height, borderRadius: mvConsts.littleRadius, backgroundColor: mvConsts.appBackgroundColor, justifyContent: 'center', alignItems: 'center', }}>
                <Animated.View style={{width: window.width, height: window.height, backgroundColor: 'black', opacity: this.state.opacity, borderRadius: mvConsts.littleRadius, alignItems: 'center', position: 'absolute', zIndex: 0, }}/>
                <Animated.View style={{width: '90%', height: '90%', backgroundColor: color, borderRadius: mvConsts.littleRadius * 2, alignItems: 'center', }}>
                    <View style={{width: '100%',  borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                        <Animated.View style={{width: '100%', height: window.height * 0.1, top: this.state.top, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                            <Image
                                style={{width: window.width * 0.5, height: window.height * 0.08, }}
                                source={require('../../../../../assets/headlogo.png')}
                            />
                        </Animated.View>
                        <Animated.View style={{width: '100%', height: window.height * 0.4, top: this.state.logotop, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                            <Logo typing={this.state.typing} />
                        </Animated.View>
                        <Animated.View style={{width: '90%', height: window.height * 0.4, top: this.state.tabtop, borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                            <Animated.View style={{width: '100%', top: this.state.errortop}}>
                                <ErrorTab errorCode={this.state.errorCode} />
                            </Animated.View>
                            <SignInTab goToSignUp={() => {this.props.goToSignUp()}} onTyping={() => {this.typing()}} error={(errorCode) => {this.error(errorCode)}} />
                        </Animated.View>
                    </View>
                </Animated.View>
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
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)