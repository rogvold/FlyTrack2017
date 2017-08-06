/**
 * Created by mityabeldii on 20.06.2017.
 */

import * as mvConsts from '../../constants/mvConsts'
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
import ProfileSc from '../Screens/ProfileSc/ProfileSc'
import SessionSc from '../Screens/SessionSc/SessionSc'
import CommunitySc from '../Screens/CommunitySc/CommunitySc'
import SettingsSc from '../Screens/SettingsSc/SettingsSc'
import TabBar from './TabBar'

// Component
class ScreenScroller extends Component {

    goTo = (index) => {
        this.refs.Scroller.scrollTo({x: window.width * index, y: 0, animated: true })
    }

    componentWillReceiveProps (nextProps) {
        if ((!this.props.isLoggedIn) && (nextProps.isLoggedIn)) {
            this.goTo(0)
        } else {
            for (let i in mvConsts.screens) {
                if (nextProps.store.screenName === mvConsts.screens[i]) this.goTo(i - 1)
            }
        }

    }

    componentDidMount () {
        this.props.openSc(mvConsts.screens[2])
    }

    render() {

        let { store, profiledata } = this.props;

        let Screens = [
            <ProfileSc/>,
            <SessionSc/>,
            <CommunitySc/>,
            <SettingsSc/>,
        ]

        return (
            <View style={{width: window.width, height: window.height, borderRadius: mvConsts.littleRadius, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' ,}}>
                <ScrollView
                    style={{
                        flex: 1,
                        borderTopLeftRadius:  mvConsts.littleRadius,
                        borderTopRightRadius: mvConsts.littleRadius,
                        backgroundColor: mvConsts.appBackgroundColor,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    scrollEnabled={false}
                    ref="Scroller"
                >
                    {Screens.map((screen, index) => {
                        return (
                            <View style={{width: window.width, height: window.height * 0.88, top: window.height * 0.04 , borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} key={index} >
                                <View style={{width: '100%', height: '100%', padding: '2%', backgroundColor: mvConsts.appBackgroundColor, borderTopRightRadius: mvConsts.littleRadius, borderTopLeftRadius: mvConsts.littleRadius, justifyContent: 'center', alignItems: 'center', }}>
                                    {store.screenName ===  mvConsts.screens[index + 1] ? screen : null}
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={{width: window.width, height: window.height * 0.08, backgroundColor: 'red', borderRadius: mvConsts.littleRadius, alignItems: 'center', }}>
                    <TabBar/>
                </View>
            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,

        isLoggedIn: (state.users.currentUserId != undefined)
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            return dispatch({
                type: 'logout'
            })
        },
        openSc: (screenName) => {
            return dispatch({
                type: 'openSc',
                screenName: screenName
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ScreenScroller)