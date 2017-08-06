/**
 * Created by mityabeldii on 02.07.2017.
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
import MapViewButtonsString from './MapViewButtonsString'

// Component
class MapViewButtons extends Component {

    state = {
        mapButtons: false,
        height: new Animated.Value((mvConsts.fontSizeMiddle + window.height * 0.055) * 1),
        spinValue: new Animated.Value(-0.25),
    }

    rotation = (value) => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration * 3,
            }
        ).start()
    }

    show = (buttons) => {
        Animated.timing(
            this.state.height,
            {
                toValue: (mvConsts.fontSizeMiddle + window.height * 0.055) * 10,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    hide = () => {
        Animated.timing(
            this.state.height,
            {
                toValue: (mvConsts.fontSizeMiddle + window.height * 0.055) * 1,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    showMapButtons = () => {
        if (this.state.mapButtons) {
            this.rotation(0)
            this.hide()
            this.setState({mapButtons: !this.state.mapButtons})
        } else {
            this.show()
            this.rotation(0.5)
            this.props.goTo(0.25)
            setTimeout(() => {this.setState({mapButtons: !this.state.mapButtons})}, mvConsts.animationOpcityScDuration)
        }
    }

    render() {

        let { store, session } = this.props;

        let buttons = [
            'SOS',
            store.dictionary.networkconnection,
            'GPS',
            store.dictionary.heightruler,
            store.dictionary.scaleplus,
            store.dictionary.scaleminus,
            store.dictionary.mylocation,
            store.dictionary.showmyairport,
            store.dictionary.shownearestairport,
        ]

        let iconSide = window.height * 0.04;

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <Animated.View style={{width: '100%', height: this.state.height, padding: '2%', marginBottom: window.height * 0.02, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <TouchableWithoutFeedback onPress={() => {this.showMapButtons()}} >
                    <View style={{width: '100%',padding: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row', }}>
                        <View style={{width: '80%', borderRadius: mvConsts.littleRadius, }}>
                            <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.visiblebuttons}</Text>
                        </View>
                        <TouchableOpacity style={{width: '20%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.showMapButtons()}} >
                            <Animated.Image
                                style={{width: iconSide, height: iconSide, transform: [{rotate: spin}] }}
                                source={require('../../../../assets/Icons2/down-arrow.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.state.mapButtons ?
                        <View>
                            {
                                buttons.map((buttonText, index) => {
                                    return(
                                        <View key={index} >
                                            <MapViewButtonsString index={index} hidemode={this.state.mapButtons} />
                                        </View>

                                    )
                                })
                            }
                        </View>
                        : null
                }
            </Animated.View>
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

// let mapDispatchToProps = (dispatch) => {
//     return {
//         editButtons: (index, value) => {
//             return dispatch({
//                 type: 'editButtons',
//                 index: index,
//                 value: value,
//             })
//         },
//     }
// }

// Export
export default connect(mapStateToProps)(MapViewButtons)