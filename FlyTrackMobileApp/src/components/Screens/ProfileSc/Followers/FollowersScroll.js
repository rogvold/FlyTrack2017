/**
 * Created by mityabeldii on 15.06.2017.
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
import FollowingTab from '../Following/FollowingTab'

// Component
class FollowersScroll extends Component {
    render() {

        let { store, profiledata } = this.props;

        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', position: 'absolute' }}>
                <ScrollView
                    style={{width: '100%', height: '100%'}}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                        {stab.users.map((user, index) => {
                            return(
                                <View style={{width: '100%', marginBottom: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', }} key={index}  >
                                    <FollowingTab index={index} onPress={() => {this.props.opacityPush(index)}} />
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
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

let mapDispatchToProps = (dispatch) => {
    return {
        opacityPush: (userId) => {
            return dispatch({
                type: 'opacityPush',
                layerName: mvConsts.opacityLayers.unfollow,
                data: {userId: userId},
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(FollowersScroll)