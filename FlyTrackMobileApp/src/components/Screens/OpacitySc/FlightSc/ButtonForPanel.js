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

// Component
class ButtonForPanel extends Component {
    render() {

        let { store, profiledata } = this.props;
        let iconSide = window.height * 0.03;

        let icon = () => {
            if (this.props.type === mvConsts.buttonPanel.like)
                if (this.props.data > 0)
                    return require('../../../../../assets/Icons2/like_full.png')
                else
                    return require('../../../../../assets/Icons2/like_empty.png')
            if (this.props.type === mvConsts.buttonPanel.comments)
                if (this.props.data > 0)
                    return require('../../../../../assets/Icons2/comment_full.png')
                else
                    return require('../../../../../assets/Icons2/comment_empty.png')
            if (this.props.type === mvConsts.buttonPanel.share)
                return require('../../../../../assets/Icons2/share.png')
            if (this.props.type === mvConsts.buttonPanel.edit)
                return require('../../../../../assets/Icons2/edit.png')
        }

        let buttonWidth = window.width * 0.845;
        if (this.props.panelType === mvConsts.panelType.author) buttonWidth = buttonWidth / 4;
        if (this.props.panelType === mvConsts.panelType.visitor) buttonWidth = buttonWidth / 3;

        return (
            <View style={{width: buttonWidth, backgroundColor: mvConsts.selectedTabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                <View style={{width: '100%', padding: '8%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image
                        style={{width: iconSide, height: iconSide, }}
                        source={icon()}
                    />
                    {this.props.data > 0 ? <Text style={{marginLeft: '15%', fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorSecondary, }} >{this.props.data}</Text> : null}
                </View>
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
export default connect(mapStateToProps)(ButtonForPanel)