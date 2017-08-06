/**
 * Created by mityabeldii on 15.06.2017.
 */

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

// Component
class InnerTab extends Component {

    colorDeterminator = (index) => {
        let { store, profiledata } = this.props;
        if (store.profileTab === index)
            return mvConsts.selectedTabBackColor
        else
            return mvConsts.tabBackColor
    }

    render() {

        let { store, profiledata } = this.props;

        let tabNames = [
            store.dictionary.following,
            store.dictionary.followers,
            store.dictionary.flights,
        ]

        return (
            <View style={{width: '100%', height: '100%', backgroundColor: this.colorDeterminator(this.props.index), borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', }}>
                <Text style={{fontFamily: 'segoeui', fontSize: window.height * 0.025, color: mvConsts.fontColorMain, }} >{tabNames[this.props.index]}</Text>
                <Text style={{fontFamily: 'segoeui', fontSize: window.height * 0.034, color: mvConsts.fontColorMain, }} >{this.props.data}</Text>
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
//         openProfileTab: (profileTabName) => {
//             console.log(profileTabName)
//             return dispatch({
//                 type: 'openProfileTab',
//                 profileTabName: profileTabName,
//             })
//         },
//     }
// }

// Export
export default connect(mapStateToProps)(InnerTab)