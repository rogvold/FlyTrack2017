/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'

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
import UnfollowAsk from './UnfollowAsk/UnfollowAsk'
import FlightSc from './FlightSc/FlightSc'
import Picker from './Picker/Picker'
import MapViewer from './MapViewer/MapViewer'
import PhotoViewer from './PhotoViewer/PhotoViewer'
import HeightRuler from './HeightRuler/HeightRuler'
import SessionEdit from './SessionEdit/SessionEdit'

// Component
class OpacitySc extends Component {

    state = {
        opacity: new Animated.Value(0)
    }

    componentDidMount () {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0.8,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    unmount = () => {
        let { store, profiledata } = this.props;
        let delay = 0;
        if (store.opacityStack.length === 1) {
            delay = mvConsts.animationOpcityScDuration;
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: mvConsts.animationOpcityScDuration
                }
            ).start();
        }
        setTimeout(this.props.opacityPop, delay)

    }

    render() {

        let { store, profiledata } = this.props;
        let layerDeterminator = () => {
            switch (store.opacityStack[store.opacityStack.length - 1].layerName) {
                case mvConsts.opacityLayers.unfollow:
                    return <UnfollowAsk unmount={() => {this.unmount()}} />
                case mvConsts.opacityLayers.flightSc:
                    return <FlightSc unmount={() => {this.unmount()}} />
                case mvConsts.opacityLayers.picker:
                    return <Picker unmount={() => {this.unmount()}} />
                case mvConsts.opacityLayers.mapViewer:
                    return <MapViewer unmount={() => {this.unmount()}}/>
                case mvConsts.opacityLayers.photoViewer:
                    return <PhotoViewer unmount={() => {this.unmount()}}/>
                case mvConsts.opacityLayers.heightRuler:
                    return <HeightRuler unmount={() => {this.unmount()}}/>
                case mvConsts.opacityLayers.sessionedit:
                    return <SessionEdit unmount={() => {this.unmount()}}/>
                default: return null
            }
        }

        return (
            <View style={{width: '100%', height: '100%', position: 'relative' }}>
                <StatusBar
                    barStyle={'light-content'}
                />
                <TouchableWithoutFeedback onPress={() => {this.unmount()}}>
                    <Animated.View style={{width: '100%', height: '100%', backgroundColor: 'black', position: 'absolute', zIndex: 0, opacity: this.state.opacity  }}/>
                </TouchableWithoutFeedback>
                {layerDeterminator()}
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
        opacityPop: () => {
            return dispatch({
                type: 'opacityPop'
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(OpacitySc)