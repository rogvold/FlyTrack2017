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
import  MVButton from '../MVButton'

// Component
class FollowingTab extends Component {
    render() {

        let { store, profiledata } = this.props;
        let avatarSide = window.height * 0.08;
        id = this.props.index;

        let textDeterminator = () => {
            if (stab.users[id].following) {
                return store.dictionary.following
            }
            else {
                return store.dictionary.follow
            }
        }

        let styleDeterminator = () => {
            if (stab.users[id].following) {
                return mvConsts.buttonStyles.pushed
            }
            else {
                return mvConsts.buttonStyles.unpushed
            }

        }


        return (
            <View style={{width: '100%', padding: '2%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <TouchableOpacity style={{width: '66%', flexDirection: 'row' }}>
                    <View style={{width: '25%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2 , }}
                            source={{uri: stab.users[id].uri}}
                        />
                    </View>
                    <View style={{width: '73%', marginLeft: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                        <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{stab.users[id].name} {stab.users[id].surname}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '32%', height: window.height * 0.05, backgroundColor: 'black', borderRadius: mvConsts.littleRadius + 2, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{width: '100%', height: '100%', }} onPress={() => {this.props.onPress()}} >
                        <MVButton text={textDeterminator()} style={styleDeterminator()} />
                    </TouchableOpacity>
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
export default connect(mapStateToProps)(FollowingTab)