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
import MVToggle from '../OpacitySc/MapViewer/MVToggle'

// Component
class MapViewButtonsString extends Component {

    state = {
        left: new Animated.Value(-window.width)
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

    hide = () => {
        Animated.timing(
            this.state.left,
            {
                toValue: -window.width,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    componentWillReceiveProps (newProps) {
        if (!newProps.hidemode) {
            this.hide()
        }
    }

    componentDidMount () {
        this.show()
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

        let value = false
        for (let i in session.visibleButtons) {
            if (session.visibleButtons[i] === this.props.index) {
                value = true
            }
        }

        let iconSide = window.height * 0.04;

        let iconDeterminant = () => {
            switch (this.props.index){
                case 0:
                    return(require('../../../../assets/Icons2/sos-warning.png'))
                case 1:
                    return(require('../../../../assets/Icons2/wifi-connection-signal-symbol.png'))
                case 2:
                    return(require('../../../../assets/Icons2/satellite-dish.png'))
                case 3:
                    return(require('../../../../assets/Icons2/resize.png'))
                case 4:
                    return(require('../../../../assets/Icons2/add.png'))
                case 5:
                    return(require('../../../../assets/Icons2/minus.png'))
                case 6:
                    return(require('../../../../assets/Icons2/gps-location-symbol.png'))
                case 7:
                    return(require('../../../../assets/Icons2/house-outline.png'))
                case 8:
                    return(require('../../../../assets/Icons2/warning.png'))

                default:
                    return(require('../../../../assets/Icons2/warning.png'))
            }
        }

        return (
            <Animated.View style={{width: '100%',padding: '2%', left: this.state.left, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }} >
                <View style={{width: '10%', padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <View style={{width: iconSide, height: iconSide, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            style={{width: iconSide * 0.7, height: iconSide * 0.7, }}
                            source={iconDeterminant()}
                        />
                    </View>
                </View>
                <View style={{width: '70%', padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{buttons[this.props.index]}</Text>
                </View>
                <View style={{width: '20%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection:'row', }}>
                    <MVToggle
                        value={value}
                        onTrue={() => {this.props.editButtons(this.props.index, true)}}
                        onFalse={() => {this.props.editButtons(this.props.index, false)}}
                    />
                </View>
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

let mapDispatchToProps = (dispatch) => {
    return {
        editButtons: (index, value) => {
            return dispatch({
                type: 'editButtons',
                index: index,
                value: value,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(MapViewButtonsString)