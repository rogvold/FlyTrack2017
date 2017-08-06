/**
 * Created by mityabeldii on 16.06.2017.
 */

// Button styles:
//  - 'pushed'
//  - 'unpushed'
//  - 'accept'
//  - 'reject'

import  * as mvConsts from '../../../constants/mvConsts'
import * as stab from '../../../../stab.json'
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
class MVButton extends Component {

    static defaultProps = {
        borderRadius: mvConsts.littleRadius,
    };

    stylesDeterminator = () => {
        let {fontsizeK} = this.props
        if (fontsizeK === undefined) {
            fontsizeK = 1
        }
        let pushed = {
            backgroundColor: mvConsts.buttonBackColor,
            fontSize: mvConsts.fontSizeMiddle * fontsizeK,
            fontColor: mvConsts.buttonFontColor,
            borderWidth: 0,
            borderColor: mvConsts.buttonBackColor,
        };
        let unpushed = {
            backgroundColor: mvConsts.tabBackColor,
            fontSize: mvConsts.fontSizeMiddle * fontsizeK,
            fontColor: mvConsts.buttonBackColor,
            borderWidth: 1,
            borderColor: mvConsts.buttonBackColor,
        };
        let accept = {
            backgroundColor: mvConsts.buttonAcceptColor,
            fontSize: mvConsts.fontSizeMiddle * fontsizeK,
            fontColor: mvConsts.buttonFontColor,
            borderWidth: 0,
            borderColor: mvConsts.buttonBackColor,
        };
        let reject = {
            backgroundColor: mvConsts.buttonRejectColor,
            fontSize: mvConsts.fontSizeMiddle * fontsizeK,
            fontColor: mvConsts.buttonFontColor,
            borderWidth: 0,
            borderColor: mvConsts.buttonBackColor,
        };
        switch (this.props.style) {
            case mvConsts.buttonStyles.pushed:
                return pushed;
            case mvConsts.buttonStyles.unpushed:
                return unpushed;
            case mvConsts.buttonStyles.accept:
                return accept;
            case mvConsts.buttonStyles.reject:
                return reject;
            default:
                return unpushed;
        }
    }

    render() {

        let { store, profiledata } = this.props;
        let styles = this.stylesDeterminator();

        return (
            <View style={{width: '100%', height: '100%', backgroundColor: styles.backgroundColor, borderWidth: styles.borderWidth, borderColor: styles.borderColor, borderRadius: this.props.borderRadius, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: styles.fontSize * 0.8, color: styles.fontColor, }} >{this.props.text}</Text>
            </View>
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
export default connect(mapStateToProps)(MVButton)