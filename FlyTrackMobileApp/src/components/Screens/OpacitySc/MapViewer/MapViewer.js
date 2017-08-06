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

// Redux
import { connect } from 'react-redux';

// Components
import MVBackButton from '../../OpacitySc/FlightSc/MVBackButton'
import MVButton from '../../ProfileSc/MVButton'
import MVToggle from './MVToggle'
import MapBox from './MapBox'

// Component
class MapViewer extends Component {

    state = {
        hideButton: false,
        askMode: false,
        mapType: mvConsts.mapTypes.standard,
        left: new Animated.Value(-window.width),
    }
    
    show = () => {
        this.setState({hideButton: false})
        Animated.timing(
            this.state.left,
            {
                toValue: window.width * 0.05,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }
    
    hide = () => {
        this.setState({hideButton: true})
        Animated.timing(
            this.state.left,
            {
                toValue: -window.width,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    backStep = () => {

        this.hide()
        setTimeout(() => {this.props.unmount()}, mvConsts.animationOpcityScDuration)

    }

    goTo = (value) => {
        this.setState({askMode: value})
        if (value) {
            this.refs.ScrollView.scrollTo({x: 0, y: window.height * 0.25, animated: true});
        } else {
            this.refs.ScrollView.scrollTo({x: 0, y: 0, animated: true})
        }
    }

    sendTrack = () => {
        let { store } = this.props;
        this.props.showTrack(store.opacityStack[store.opacityStack.length - 1].data.flightId)
        // this.backStep()
        while (store.opacityStack.length !== 0) {
            this.props.opacityPop()
        }
        this.props.openSc(mvConsts.screens[2])
    }

    componentDidMount () {
        this.show()
    }

    render() {

        let { store, profiledata } = this.props;
        let iconSide = window.height * 0.08;
        let hidemode = false;

        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }}>

                <MVBackButton backStep={() => {this.backStep(); this.setState({askMode: true})}} hidemode={this.state.askMode} />

                <ScrollView
                    style={{width: '100%', height: '100%', position: 'absolute', zIndex: 1, }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ref="ScrollView"
                >
                    <TouchableWithoutFeedback onPress={() => {if (!this.state.askMode) {this.backStep(); this.setState({askMode: true})}} } >
                        <View  style={{width: window.width, height: window.height, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1, }}>

                        </View>
                    </TouchableWithoutFeedback>

                    <Animated.View style={{width: window.width * 0.9, height: window.height * 0.9, left: this.state.left, marginTop: window.height * 0.05, marginBottom: window.height * 0.05, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', zIndex: 3, }}>
                        <MapBox goTo={(value) => {this.goTo(value)}} askMode={this.state.askMode} mapType={this.state.mapType} />
                    </Animated.View>

                    <Animated.View style={{width: window.width * 0.9, padding: '2%', left: this.state.left, marginBottom: window.height * 0.05, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', zIndex: 3, }}>
                        <View style={{width: '100%', marginBottom: '2%',borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <View style={{width: '75%', padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.sendtosession}</Text>
                            </View>
                            <TouchableOpacity style={{width: '25%', height: mvConsts.fontSizeMiddle * 2, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.sendTrack()}} >
                                <MVButton style={mvConsts.buttonStyles.accept} text={store.dictionary.send} />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '100%', marginBottom: '2%',borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <View style={{width: '75%', padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.hybrid}</Text>
                            </View>
                            <View style={{width: '25%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                <MVToggle
                                    value={this.state.mapType === mvConsts.mapTypes.hybrid}
                                    onTrue={() => {this.setState({mapType: mvConsts.mapTypes.hybrid})}}
                                    onFalse={() => {this.setState({mapType: mvConsts.mapTypes.standard})}}
                                />
                            </View>
                        </View>
                    </Animated.View>

                </ScrollView>

            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        showTrack: (flightId) => {
            return dispatch({
                type: 'showTrack',
                flightId: flightId,
            })
        },
        openSc: (screenName) => {
            return dispatch({
                type: 'openSc',
                screenName: screenName
            })
        },
        opacityPop: () => {
            return dispatch({
                type: 'opacityPop'
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(MapViewer)