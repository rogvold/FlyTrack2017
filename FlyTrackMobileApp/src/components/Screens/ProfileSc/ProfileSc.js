/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'

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
import MainTab from './MainTab/MainTab'
import FlightsScroll from './Flights/FlightsScroll'
import FollowersScroll from './Followers/FollowersScroll'
import FollowingScroll from './Following/FollowingScroll'

// Component
class ProfileSc extends Component {

    state = {
        top: new Animated.Value(window.height)
    }

    show = () => {
        Animated.timing(
            this.state.top,
            {
                toValue: 0,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    hide = () => {
        Animated.timing(
            this.state.top,
            {
                toValue: window.height,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    componentDidMount () {
        this.show();
    }

    render() {

        let { store, profiledata } = this.props;
        
        let profileTab = () => {
            if (store.profileTab === 0) return <FollowingScroll/>
            if (store.profileTab === 1) return <FollowersScroll/>
            if (store.profileTab === 2) return <FlightsScroll/>
            return <FlightsScroll/>
        }

        return (
            <View style={{width: '100%',  height: '100%', alignItems: 'center', flexDirection: 'column', borderRadius: mvConsts.littleRadius, }}>
                <MainTab show={() => {this.show()}} hide={() => {this.hide()}} />
                <Animated.View style={{width: '100%', height: '69%', marginTop: this.state.top, borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                    {profileTab()}
                </Animated.View>
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
        changeProfileTab: (index) => {
            return dispatch({
                type: 'changeProfileTab',
                index: index
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSc)