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
import moment from 'moment'

// Redux
import { connect } from 'react-redux';

// Components
import UpperTab from './UpperTab'
import PhotosScroll from './PhotosScroll'
import ButtonPanel from './ButtonPanel'

// Component
class MainFlightTab extends Component {
    render() {

        let { store, profiledata } = this.props;

        return (
            <TouchableWithoutFeedback>
                <View style={{width: window.width * 0.88, padding: '2%', backgroundColor: mvConsts.appBackgroundColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <UpperTab/>
                    <PhotosScroll hide={() => {this.props.hide()}} />
                    <ButtonPanel panelType={mvConsts.panelType.author} onComment={() => {this.props.onComment()}} hide={() => {this.props.hide()}} />
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
export default connect(mapStateToProps)(MainFlightTab)