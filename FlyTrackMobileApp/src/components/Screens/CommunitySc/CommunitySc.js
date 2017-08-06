/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'

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
class CommunitySc extends Component {
    render() {

        let { store, profiledata } = this.props;

        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{width: '100%', height: '25%', backgroundColor: mvConsts.buttonBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.appBackgroundColor, }} >{store.dictionary.developing}</Text>
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
export default connect(mapStateToProps)(CommunitySc)