/**
 * Created by mityabeldii on 20.06.2017.
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
    Platform,
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

// Component
class Logo extends Component {

    state = {
        opacity1: new Animated.Value(0),
        opacity2: new Animated.Value(0),
        opacity3: new Animated.Value(0),
        spinValue: new Animated.Value(0),
        scale: new Animated.Value(1),
        top: new Animated.Value(0),
    }

    componentDidMount () {
        this.opacityUp();
    }

    animationDelay = 2000;

    opacityUp = () => {
        setTimeout(() => {this.changeOpacity(this.state.opacity1, 0.5)}, 0);
        setTimeout(() => {this.changeOpacity(this.state.opacity2, 0.5)}, 500);
        setTimeout(() => {this.changeOpacity(this.state.opacity3, 0.5)}, 1000);
        setTimeout(() => {this.opacityDown()}, this.animationDelay * 3)
    }

    opacityDown = () => {
        setTimeout(() => {this.changeOpacity(this.state.opacity1, 0)}, 0);
        setTimeout(() => {this.changeOpacity(this.state.opacity2, 0)}, 500);
        setTimeout(() => {this.changeOpacity(this.state.opacity3, 0)}, 1000);
        setTimeout(() => {this.opacityUp()}, this.animationDelay)
    }

    changeOpacity = (variable, value) => {
        Animated.timing(
            variable,
            {
                toValue: value,
                duration: 1200
            }
        ).start();
    }

    rotation = (value) => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration * 3,
            }
        ).start()
    }

    scale = (scale) => {
        Animated.timing(
            this.state.scale,
            {
                toValue: scale,
                duration: mvConsts.animationOpcityScDuration * 3,
            }
        ).start()
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.typing) {
            this.rotation(0.5)
            this.scale(0.6)
        }
        else {
            this.rotation(1)
            this.scale(1)
        }
        if ((this.props.isLoggedIn) && (!nextProps.isLoggedIn)) {
            this.rotation(1)
            this.scale(1)
        }
    }

    fly = () => {
        if (Platform.OS === 'ios') {
            Animated.timing(
                this.state.top,
                {
                    toValue: -window.height,
                    duration: mvConsts.animationOpcityScDuration * 3,
                }
            ).start()
            setTimeout(() => {Animated.timing(
                this.state.top,
                {
                    toValue: window.height * 1.5,
                    duration: 0,
                }
            ).start()}, mvConsts.animationOpcityScDuration * 7)
            setTimeout(() => {Animated.timing(
                this.state.top,
                {
                    toValue: 0,
                    duration: mvConsts.animationOpcityScDuration * 3,
                }
            ).start()}, mvConsts.animationOpcityScDuration * 8)
        }
    }

    render() {

        let { store, profiledata } = this.props;
        let  logoSide = window.height * 0.18;

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <Animated.View style={{
                width: logoSide,
                height: logoSide,
                borderRadius: mvConsts.littleRadius,
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
                transform: [ {scale: this.state.scale}]
            }}>
                <TouchableWithoutFeedback onPress={() => {this.fly()}}>
                    <Animated.Image
                        style={{
                            width: logoSide,
                            height: logoSide,
                            top: this.state.top,
                            position: 'absolute',
                            zIndex: 3,
                            shadowColor: mvConsts.shadowColor,
                            shadowRadius: mvConsts.shadowRadius,
                            shadowOpacity: mvConsts.shadowOpacity,
                            shadowOffset: mvConsts.shadowOffset,
                            transform: [{rotate: spin}]
                        }}
                        source={require('../../../../../assets/logo3-01.png')}
                    />
                </TouchableWithoutFeedback>
                <Animated.View style={{width: logoSide * 0.9, height: logoSide * 0.9, top: '10%', opacity: this.state.opacity1, backgroundColor: 'white', borderRadius: 1000, alignItems: 'center', position: 'absolute', zIndex: 2, shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} />
                <Animated.View style={{width: logoSide * 0.7, height: logoSide * 0.7, top: '20%', opacity: this.state.opacity2, backgroundColor: 'white', borderRadius: 1000, alignItems: 'center', position: 'absolute', zIndex: 2, shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} />
                <Animated.View style={{width: logoSide * 0.5, height: logoSide * 0.5, top: '30%', opacity: this.state.opacity3, backgroundColor: 'white', borderRadius: 1000, alignItems: 'center', position: 'absolute', zIndex: 2, shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} />
            </Animated.View>
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
export default connect(mapStateToProps)(Logo)