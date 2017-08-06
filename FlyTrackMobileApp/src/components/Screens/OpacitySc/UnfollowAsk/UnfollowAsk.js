/**
 * Created by mityabeldii on 16.06.2017.
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
import MVButton from '../../ProfileSc/MVButton'
import UnfollowTab from './UnfollowTab'

// Component
class UnfollowAsk extends Component {

    state = {
        topLable: new Animated.Value(-window.height),
        topButton: new Animated.Value(window.height),
    }

    componentDidMount () {
        Animated.timing(
            this.state.topLable,
            {
                toValue: window.height * 0.25,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
        Animated.timing(
            this.state.topButton,
            {
                toValue: window.height * 0.25,
                duration: mvConsts.animationOpcityScDuration + 200
            }
        ).start();
    }

    backStep = () => {

        Animated.timing(
            this.state.topLable,
            {
                toValue: -window.height,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
        Animated.timing(
            this.state.topButton,
            {
                toValue: window.height,
                duration: mvConsts.animationOpcityScDuration + 200
            }
        ).start();

        if (this.props.store.opacityStack.length === 1){
            this.props.unmount();
        }else
            this.props.opacityPop();
    }

    render() {

        let { store, profiledata } = this.props;
        let avatarSide = window.height * 0.15;
        let user = stab.users[store.opacityStack[store.opacityStack.length - 1].data.userId];

        return (
            <TouchableWithoutFeedback onPress={() => {this.backStep()}}>
                <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                    <Animated.View style={{width: '60%', top: this.state.topLable, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center',  }}>
                        <Image
                            style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2, marginTop: '5%', }}
                            source={{uri: user.uri}}
                        />
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, marginTop: '5%' }} >{store.dictionary.doyouwanttounfollow}</Text>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, textAlign: 'center' }} >{user.name} {user.surname}</Text>
                        <View style={{width: '70%', height: window.height * 0.07, backgroundColor: 'white', borderRadius: mvConsts.bigRadius + 2, margin: '5%', alignItems: 'center', }}>
                            <TouchableOpacity style={{width: '100%', height: '100%' }} onPress={() => {this.backStep()}} >
                                <View style={{width: '100%', height: '100%', backgroundColor: mvConsts.buttonRejectColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.buttonFontColor, }} >{store.dictionary.unfollow}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <Animated.View style={{width: '60%', height: window.height * 0.08, top: this.state.topButton, marginTop: '3%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorSecondary, }} >{store.dictionary.cancel}</Text>
                    </Animated.View>
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

let mapDispatchToProps = (dispatch) => {
    return {
        opacityPop: () => {
            return dispatch({
                type: 'opacityPop',
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(UnfollowAsk)