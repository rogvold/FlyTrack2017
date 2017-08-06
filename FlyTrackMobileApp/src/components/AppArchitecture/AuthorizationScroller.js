/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as stab from '../../../stab.json'
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
    FlatList,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

// Components
import SignInPage from '../Screens/AuthorizationSc/SignIn/SignInPage'
import SignUpPage from '../Screens/AuthorizationSc/SignUp/SignUpPage'

// Component
class AuthorizationScroller extends Component {

    goTo = (index) => {
        this.refs.Scroller.scrollTo({x: window.width * index, y: 0, animated: true })
    }

    componentWillReceiveProps (nextProps) {
        if ((!nextProps.isLoggedIn) && (this.props.isLoggedIn)) {
            this.goTo(0)
        }
    }

    componentDidMount () {
        this.goTo(0)
    }

    render() {

        let { store, profiledata } = this.props;

        return (
            <View style={{width: window.width, height: window.height, borderRadius: mvConsts.littleRadius, backgroundColor: 'black',}}>
                <ScrollView
                    style={{flex: 1, borderRadius: mvConsts.littleRadius, backgroundColor: mvConsts.appBackgroundColor, }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    scrollEnabled={false}
                    ref="Scroller"
                >
                    <SignInPage goToApp={() => {this.props.goToApp()}} goToSignUp={() => {this.goTo(1)}} />
                    <SignUpPage goToApp={() => {this.props.goToApp()}} goToSignIn={() => {this.goTo(0)}} />
                </ScrollView>
            </View>
        )
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        profiledata: state.profiledata,

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
export default connect(mapStateToProps)(AuthorizationScroller)