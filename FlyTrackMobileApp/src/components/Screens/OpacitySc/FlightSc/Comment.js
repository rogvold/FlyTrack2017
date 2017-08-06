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
class Comment extends Component {
    render() {

        let { store, profiledata } = this.props;
        let flight = stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId];
        let author = stab.users[flight.comments[this.props.index].authorId];
        let avatarSide = window.height * 0.06;


        return (
            <View style={{width: '100%', padding: '2%', marginTop: '2%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'column', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row' }}>
                    <Image
                        style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2 }}
                        source={{uri: author.uri}}
                    />
                    <View style={{width: window.width * 0.78 - avatarSide, marginLeft: '2%', borderRadius: mvConsts.littleRadius, flexDirection: 'column' }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorMain, }} >{author.name} {author.surname}</Text>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.6, color: mvConsts.fontColorSecondary, }} >25.06.17 14:20</Text>
                    </View>
                </View>
                <View style={{width: '100%', borderRadius: mvConsts.littleRadius,}}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.9, color: mvConsts.fontColorMain, }} >{flight.comments[this.props.index].text}</Text>
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
export default connect(mapStateToProps)(Comment)