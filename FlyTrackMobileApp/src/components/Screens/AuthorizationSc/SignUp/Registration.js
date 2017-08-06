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
import RegistrationTab from './RegistrationTab'
import ErrorTab from '../SignIn/ErrorTab'

// Component
class Registration extends Component {

    state = {
        typing: false,
        errorCode: mvConsts.errors.outOfErrors,
        top: new Animated.Value(0),
        errortop: new Animated.Value(window.height * 0.2),
    }

    move = (variable, index, duration) => {
        if (duration === undefined) duration = 1
        Animated.timing(
            variable,
            {
                toValue: -window.height * index,
                duration: mvConsts.animationOpcityScDuration * duration,
            }
        ).start()
    }

    typing = () => {
        this.props.typing();
        this.setState({typing: !this.state.typing})
        if (!this.state.typing) {
            this.move(this.state.top, 0.35, 2)
            this.move(this.state.errortop, 0.2, 2)
        } else {
            this.move(this.state.top, 0)
            this.move(this.state.errortop, -0.2, 1)
        }
    }

    error = (errorCode) => {
        this.setState({errorCode: errorCode})
        this.props.error(errorCode);
        this.move(this.state.errortop, -0.04, 1)
        this.move(this.state.top, -0.02, 1)
        setTimeout(() => {
            this.move(this.state.errortop, -0.2, 1)
            this.move(this.state.top, 0, 1)
        }, mvConsts.animationOpcityScDuration * 7)
    }

    render() {

        let { store, profiledata } = this.props;

        return (
            <View style={{width: window.width, height: window.height, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{width: '90%', height: '92%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{width: '100%', height: '40%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>

                    </View>
                    <Animated.View style={{width: '100%', top: this.state.errortop, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <ErrorTab errorCode={this.state.errorCode} />
                    </Animated.View>
                    <Animated.View style={{width: '100%', height: '50%', top: this.state.top, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <RegistrationTab next={() => {this.props.next()}} goToSignIn={() => {this.props.goToSignIn()}} typing={() => {this.typing()}} error={(errorCode) => {this.error(errorCode)}} />
                    </Animated.View>
                </View>
            </View>
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
export default connect(mapStateToProps)(Registration)