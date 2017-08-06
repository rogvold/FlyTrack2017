/**
 * Created by mityabeldii on 04.07.2017.
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
    Slider,
    Platform,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

// Components
import MVToggle from '../OpacitySc/MapViewer/MVToggle'

// Component
class RadiusSetters extends Component {

    state = {
        warningRadius: this.props.session.warningRadius,
        visibleRadius: this.props.session.visibleRadius,
    }

    render() {

        let { store, session } = this.props;

        let left = mvConsts.buttonAcceptColor
        let right = mvConsts.fontColorSecondary
        if (Platform.OS === 'android') {
            right = mvConsts.buttonAcceptColor
            left = mvConsts.fontColorSecondary
        }

        let value = false
        if (this.state.warningRadius !== undefined) {
            value = this.state.warningRadius
        }
        let warninRadiusText = this.state.warningRadius
        if (warninRadiusText === undefined) {
            warninRadiusText = 0
        }
        let disabled = false
        if (this.state.warningRadius === undefined) {
            disabled = true
        }

        return (
            <View style={{width: '100%', padding: window.height * 0.02, marginBottom: window.height * 0.02, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                
                <View style={{width: '100%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{width: '50%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.warningradius}</Text>
                        </View>
                        <View style={{width: '30%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{warninRadiusText}{store.dictionary.km}</Text>
                        </View>
                        <View style={{width: '20%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                            <MVToggle
                                value={value}
                                onTrue={() => {this.setState({warningRadius: 1}); this.props.setWarningRadius(1)}}
                                onFalse={() => {this.setState({warningRadius: undefined}); this.props.setWarningRadius(undefined)}}
                            />
                        </View>
                    </View>
                    {
                        this.state.warningRadius !== undefined ?
                            <Slider
                                disabled={disabled}
                                minimumValue={1}
                                maximumValue={5}
                                step={0.5}
                                onValueChange={(value) => {this.setState({warningRadius: value})}}
                                value={this.state.warningRadius}
                                minimumTrackTintColor={left}
                                maximumTrackTintColor={right}
                                thumbTintColor={mvConsts.buttonBackColor}
                                onSlidingComplete={(value) => {this.props.setWarningRadius(value)}}
                            />
                            : null
                    }
                </View>

                <View style={{width: '100%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{width: '70%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.visibleradius}</Text>
                        </View>
                        <View style={{width: '30%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{this.state.visibleRadius}{store.dictionary.km}</Text>
                        </View>
                    </View>
                    <Slider
                        minimumValue={10}
                        maximumValue={50}
                        step={5}
                        onValueChange={(value) => {this.setState({visibleRadius: value})}}
                        value={this.state.visibleRadius}
                        minimumTrackTintColor={left}
                        maximumTrackTintColor={right}
                        thumbTintColor={mvConsts.buttonBackColor}
                        onSlidingComplete={(value) => {this.props.setVisibleRadius(value)}}
                    />
                </View>

            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        session: state.session,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setWarningRadius: (radius) => {
            return dispatch({
                type: 'setWarningRadius',
                warningRadius: radius,
            })
        },
        setVisibleRadius: (radius) => {
            return dispatch({
                type: 'setVisibleRadius',
                visibleRadius: radius,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(RadiusSetters)