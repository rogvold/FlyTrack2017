/**
 * Created by mityabeldii on 17.06.2017.
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
import MainFlightTab from './MainFlightTab'
import CommentSection from './CommentSection'
import MVBackButton from './MVBackButton'

// Component
class FlightSc extends Component {

    state = {
        commentmode: false,
        maintop: new Animated.Value(-window.height * 0.5),
        commentstop: new Animated.Value(3 * window.height),
    }

    show = (main, comment) => {
        this.setState({commentmode: false})
        if (main)
        Animated.timing(
            this.state.maintop,
            {
                toValue: window.height * 0.15,
                duration: mvConsts.animationOpcityScDuration + 100
            }
        ).start();
        if (comment)
        Animated.timing(
            this.state.commentstop,
            {
                toValue: 0,
                duration: mvConsts.animationOpcityScDuration + 200
            }
        ).start();
    }

    hide = (main, comment) => {
        if (main)
        Animated.timing(
            this.state.maintop,
            {
                toValue: -2 * window.height,
                duration: mvConsts.animationOpcityScDuration + 300
            }
        ).start();
        if (comment)
        Animated.timing(
            this.state.commentstop,
            {
                toValue: 3 * window.height,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    commentmode = () => {
        this.setState({commentmode: true})
        this.refs.ScrollView.scrollTo({x: 0, y: 0, animated: true})
        Animated.timing(
            this.state.maintop,
            {
                toValue: -window.height,
                duration: mvConsts.animationOpcityScDuration + 300
            }
        ).start();

        Animated.timing(
            this.state.commentstop,
            {
                toValue: window.height * 0.5,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();

    }

    backStep = () => {

        this.setState({commentmode: true})

        setTimeout(() => {

            this.hide(true, true)

            if (this.props.store.opacityStack.length === 1){
                this.props.unmount();
            }else
                this.props.opacityPop()

        }, mvConsts.animationOpcityScDuration)
    }

    componentDidMount () {

        if (this.props.store.screenName === mvConsts.screens[2]) {
            this.props.unmount()
        } else {
            this.show(true, true)
        }

    }

    render() {

        let { store, profiledata } = this.props;
        let iconSide = window.height * 0.035;

        return (
            <TouchableWithoutFeedback onPress={() => {this.backStep()}}>
                <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center',  }}>

                    <MVBackButton backStep={() => {this.backStep()}} hidemode={this.state.commentmode} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        ref='ScrollView'
                    >
                        <Animated.View style={{marginTop: this.state.maintop}}>
                            <MainFlightTab onComment={() => {this.refs.ScrollView.scrollTo({x: 0, y: window.height * 0.6, animated: true})}} hide={() => {this.hide(true, true); this.setState({commentmode: true})}} />
                        </Animated.View>
                        <Animated.View style={{marginTop: this.state.commentstop,}}>
                            <CommentSection commentmode={() => {this.commentmode()}} show={() => {this.show(true, true)}} />
                        </Animated.View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        profiledata: state.profiledata,
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
export default connect(mapStateToProps)(FlightSc)