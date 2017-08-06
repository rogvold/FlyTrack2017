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

// Component
class UnfollowTab extends Component {

    state = {
        opacity: new Animated.Value(-1000)
    }

    componentDidMount () {
        Animated.timing(
            this.state.opacity,
            {
                toValue: window.height * 0.15,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    backStep = () => {

        Animated.timing(
            this.state.opacity,
            {
                toValue: -1000,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();

        if (this.props.store.opacityStack.length === 1){
            this.props.unmount();
        }else
            this.props.opacityPop();


    }
    
    goOut = () => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 200,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    render() {

        let { store, profiledata } = this.props;
        let avatarSide = window.height * 0.15;
        let user = stab.users[store.opacityStack[store.opacityStack.length - 1].data.userId];

        return (
            <Animated.View style={{width: '60%', top: this.state.opacity, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center',  }}>
                <TouchableOpacity onPress={() => {this.goOut()}}>
                    <Image
                        style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2, marginTop: '5%', }}
                        source={{uri: user.uri}}
                    />
                </TouchableOpacity>
                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, marginTop: '5%' }} >Do you want to unfollow?</Text>
                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, textAlign: 'center' }} >{user.name} {user.surname}</Text>
                <View style={{width: '70%', height: window.height * 0.07, backgroundColor: 'white', borderRadius: mvConsts.bigRadius + 2, margin: '5%', alignItems: 'center', }}>
                    <TouchableOpacity style={{width: '100%', height: '100%' }} onPress={() => {this.backStep()}} >
                        <View style={{width: '100%', height: '100%', backgroundColor: mvConsts.buttonRejectColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.buttonFontColor, }} >Unfollow</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
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
export default connect(mapStateToProps)(UnfollowTab)