/**
 * Created by mityabeldii on 29.06.2017.
 */

import * as mvConsts from '../../../../constants/mvConsts'
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
let ScrollableTabView = require('react-native-scrollable-tab-view');

// Redux
import { connect } from 'react-redux';

// Components
import MVBackButton from '../../OpacitySc/FlightSc/MVBackButton'

// Component
class PhotoViewer extends Component {

    state = {
        mode: false,
        opacity: new Animated.Value(0),
        left: new Animated.Value(-window.width),
    }

    fade = (value) => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    showbutton = () => {
        this.setState({mode: true})
        this.fade(0)
    }

    hidebutton = () => {
        this.setState({mode: false})
        this.fade(1)
    }

    show = () => {
        Animated.timing(
            this.state.left,
            {
                toValue: 0,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    hide =() => {
        Animated.timing(
            this.state.left,
            {
                toValue: -window.width,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    changemode = () => {
        if (this.state.mode) {
            this.hidebutton()
        } else {
            this.showbutton()
        }
    }

    backStep = () => {

        this.hide()
        this.fade(0)
        setTimeout(() => {this.props.unmount()}, mvConsts.animationOpcityScDuration)

    }

    componentDidMount () {
        this.setState({mode: false})
        this.show()
        this.fade(1)
    }

    render() {

        let { store, profiledata } = this.props;
        let photoWidth = window.width * 0.96
        let photoHeight = window.height * 0.4

        // console.log(store.opacityStack[store.opacityStack.length - 1].data)
        
        return (
            <Animated.View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>

                <TouchableWithoutFeedback onPress={() => {}} >
                    <Animated.View style={{width: '100%', height: '100%', backgroundColor: 'black', opacity: this.state.opacity, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', zIndex: 0, }}>

                    </Animated.View>
                </TouchableWithoutFeedback>

                <MVBackButton backStep={() => {this.backStep()}} hidemode={true} />

                <Animated.View style={{width: window.width, height: window.height, top: 0, left: this.state.left, position: 'absolute', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                    <ScrollableTabView
                        renderTabBar={() => <View/>}
                        style={{position: 'absolute', zIndex: 2, }}
                        page={store.opacityStack[store.opacityStack.length - 1].data.photo}
                    >
                        {stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].photos.map((photo, index) => {
                            return(
                                <View style={{width: window.width, height: window.height,alignItems: 'center', justifyContent: 'center', zIndex: 1, }} key={index} >
                                    <Image
                                        style={{width: photoWidth, height: photoHeight, borderRadius: mvConsts.littleRadius, }}
                                        source={{uri: photo}}
                                    />
                                </View>
                            )
                        })}
                    </ScrollableTabView>
                </Animated.View>

            </Animated.View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
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
export default connect(mapStateToProps)(PhotoViewer)