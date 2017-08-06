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
import Registration from './Registration'
import PersonalInfo from './PersonalInfo'
import AircraftCreation from './AircraftCreation'
import Logo from '../SignIn/Logo'

// Component
class SignUpPage extends Component {

    state = {
        typing: false,
        color: new Animated.Value(3),
        top: new Animated.Value(window. height * 0.2),
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

    move = (variable, value, duration) => {
        if (duration === undefined) duration = 1;
        Animated.timing(
            variable,
            {
                toValue: window.height * value,
                duration: mvConsts.animationOpcityScDuration * duration,
            }
        ).start()
    }

    typing = () => {
        this.setState({typing: !this.state.typing});
        if (this.state.typing) {
            this.move(this.state.top, 0.2, 1)
            this.animation(this.state.color, 2)
        }
        else {
            this.move(this.state.top, 0, 1)
            this.animation(this.state.color, 1)
        }
    }

    error = (errorCode) => {
        this.animation(this.state.color, 0)
        setTimeout(() => {this.animation(this.state.color, 2)}, mvConsts.animationOpcityScDuration * 7)
    }

    goTo = (index) => {
        this.refs.Scroller.scrollTo({x: 0, y: window.height * index, animated: true})
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
            this.goTo(0)
        }
    }

    componentDidMount() {
        this.goTo(0)
    }

    render() {

        let { store, profiledata } = this.props;
        let color = this.state.color.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['rgba(160, 20, 21, 1)', '#383a3c', '#757779', ]
        });

        return (
            <Animated.View style={{width: window.width, height: window.height, backgroundColor: color, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                <Animated.View style={{width: '100%', height: '20%', top: this.state.top, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1 }}>
                    <Logo typing={!this.state.typing} />
                </Animated.View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ref="Scroller"
                >
                    <Registration next={() => {this.goTo(1)}} goToSignIn={() => {this.props.goToSignIn()}} typing={() => {this.typing()}} error={(errorCode) => {this.error(errorCode)}} />
                    <PersonalInfo next={() => {this.goTo(2)}} typing={() => {this.typing()}} error={(errorCode) => {this.error(errorCode)}} />
                    <AircraftCreation typing={() => {this.typing()}} error={(errorCode) => {this.error(errorCode)}} />
                </ScrollView>
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
export default connect(mapStateToProps)(SignUpPage)