/**
 * Created by mityabeldii on 30.06.2017.
 */

import  * as mvConsts from '../../../../constants/mvConsts'
import * as stab from '../../../../../stab.json'
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

// Component
class MVBackButton extends Component {

    state = {
        right: new Animated.Value(-window.width * 0.2),
        spinValue: new Animated.Value(0),
    }

    show = () => {
        Animated.timing(
            this.state.right,
            {
                toValue: window.width * 0.06,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
        this.rotation(0.25)
    }

    hide = () => {
        Animated.timing(
            this.state.right,
            {
                toValue: -window.width * 0.3,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
        this.rotation(0)
    }

    rotation = (value) => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration,
            }
        ).start()
    }

    backStep = () => {

        this.hide();
        setTimeout(() => {this.props.backStep()}, mvConsts.animationOpcityScDuration * 1 )

    }

    componentDidMount () {
        if (this.props.hidemode) {
            setTimeout(() => {this.show()}, mvConsts.animationOpcityScDuration * 0.5)
        }
    }
    
    componentWillReceiveProps (newProps) {
        if (newProps.hidemode !== undefined) {
            if (newProps.hidemode) {
                this.hide()
            } else {
                this.show()
            }
        }
    }

    render() {

        // Requeires
        //  - this.props.backStep()
        //  - this.props.hidemode

        let { store, profiledata } = this.props;
        let iconSide = window.height * 0.035;
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        let style = {
            width: iconSide * 2,
            height: iconSide * 2,

            top: window.height * 0.06,
            right: this.state.right,

            backgroundColor: mvConsts.tabBackColor,

            borderRadius: 100,

            alignItems: 'center',
            justifyContent: 'center',

            position: 'absolute',
            zIndex: 3,

            transform: [{rotate: spin}],

            shadowColor: mvConsts.shadowColor,
            shadowRadius: mvConsts.shadowRadius,
            shadowOpacity: mvConsts.shadowOpacity,
            shadowOffset: mvConsts.shadowOffset,
        }

        return (
            <Animated.View style={style} >
                <TouchableOpacity
                    style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => {this.backStep()}}
                >
                    <Image
                        style={{width: iconSide, height: iconSide, borderRadius: iconSide / 2, }}
                        source={require('../../../../../assets/Icons2/close.png')}
                    />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
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
export default connect(mapStateToProps)(MVBackButton)