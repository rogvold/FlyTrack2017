/**
 * Created by mityabeldii on 19.06.2017.
 */

import * as mvConsts from '../../constants/mvConsts'
const window = Dimensions.get('window');

// React
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Platform,
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
import AuthorizationScroller from './AuthorizationScroller'
import ScreenScroller from './ScreenScroller'
import OpacitySc from '../Screens/OpacitySc/OpacitySc'

// Component
class App extends Component {

    goTo = (index) => {
        this.refs.Scroller.scrollTo({x: 0, y: window.height * index, animated: true })
    }

    componentDidMount () {

        // if (this.props.store.isAutorized) {
        if (this.props.isLoggedIn) {
            this.goTo(1)
        }
    }

    componentWillReceiveProps (nextProps) {
        if ((!this.props.isLoggedIn) && (nextProps.isLoggedIn)) {
            setTimeout(() => {this.goTo(1)}, mvConsts.animationOpcityScDuration * 1.5)
        } else {
            if (!nextProps.isLoggedIn) {
                this.goTo(0)
            }
        }
    }

    render() {

        let { store, profiledata } = this.props;

        return (
            <View style={{position: 'relative'}}>
                <StatusBar animated={true} />
                <View style={{width: window.width, height: window.height, backgroundColor: 'black', position: 'absolute', zIndex: 0, }}>
                    <ScrollView
                        style={{flex: 1, borderRadius: mvConsts.littleRadius, backgroundColor: mvConsts.appBackgroundColor, }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        ref="Scroller"
                    >
                        <AuthorizationScroller goToApp={() => {this.goTo(1)}} />
                        <ScreenScroller goToAuth={() => {this.goTo(0)}} />
                    </ScrollView>
                </View>
                {store.opacityStack.length > 0 ?
                    <View style={{width: window.width, height: window.height, position: 'absolute', zIndex: 1, }}>
                        <OpacitySc/>
                    </View> : null
                }
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
export default connect(mapStateToProps)(App)