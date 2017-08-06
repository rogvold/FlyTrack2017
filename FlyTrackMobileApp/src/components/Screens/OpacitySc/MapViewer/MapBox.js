/**
 * Created by mityabeldii on 01.07.2017.
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
import MapView from 'react-native-maps'

// Redux
import { connect } from 'react-redux';

// Components

// Component
class MapBox extends Component {

    state = {
        askMode: this.props.askMode,
        opacity: new Animated.Value(0),
        spinValue: new Animated.Value(0.5),
        mapType: this.props.mapType,
        region: {
            latitude: 55.929489,
            longitude: 37.518258,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        },
    }

    fadeAnimation = (value) => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration
            }
        ).start();
    }

    rotation = (value) => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration,
            }
        ).start()
    }

    initialRegion = () => {
        let {store} = this.props
        let track = stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].track
        let minlatitude = 180;
        let maxlatitude = -180;
        let minlongtitude = 180;
        let maxlongtitude = -180;
        for (let i in track) {
            minlatitude = Math.min(minlatitude, track[i].latitude)
            maxlatitude = Math.max(maxlatitude, track[i].latitude)
            minlongtitude = Math.min(minlongtitude, track[i].longitude)
            maxlongtitude = Math.max(maxlongtitude, track[i].longitude)
        }

        minlatitude = minlatitude - (maxlatitude - minlatitude) * 0.1;
        maxlatitude = maxlatitude + (maxlatitude - minlatitude) * 0.1;
        minlongtitude = minlongtitude - (maxlongtitude - minlongtitude) * 0.1 ;
        maxlongtitude = maxlongtitude  + (maxlongtitude - minlongtitude) * 0.1;

        return{
            latitude: (minlatitude + maxlatitude) / 2,
            longitude: (minlongtitude + maxlongtitude) / 2,
            latitudeDelta: maxlatitude - minlatitude,
            longitudeDelta: maxlongtitude - minlongtitude,

        }
    }

    componentWillReceiveProps (newProps) {
        this.setState({askMode: newProps.askMode})
        this.setState({mapType: newProps.mapType})
        if (newProps.askMode) {
            this.rotation(0)
            this.fadeAnimation(0.7)
        } else {
            this.rotation(0.5)
            this.fadeAnimation(0)
        }
    }

    componentDidMount () {
        this.setState({region: this.initialRegion()})
    }

    render() {

        let { store, profiledata } = this.props;
        let iconSide = window.height * 0.08;

        let scaleRegion = (index) => {
            let newRegion = {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta / index ,
                longitudeDelta: this.state.region.longitudeDelta / index,
            };
            if ((newRegion.latitudeDelta > 0) && (newRegion.longitudeDelta > 0)) {
                this.setState({region: newRegion})
                this.refs.MapView.animateToRegion(region=newRegion, duration=mvConsts.animationOpcityScDuration)
            }
        }

        let buttons = [
            {
                icon: require('../../../../../assets/Icons2/add.png'),
                action: () => {
                    scaleRegion(2)
                },
            },
            {
                icon: require('../../../../../assets/Icons2/minus.png'),
                action: () => {
                    scaleRegion(0.5)
                },
            },
            {
                icon: require('../../../../../assets/Icons2/files-transit.png'),
                action: () => {
                    this.props.goTo(true)
                },
            },
        ]

        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }}>

                <MapView
                    style={{flex: 1, width: '100%', height: '100%', borderRadius: mvConsts.bigRadius,  }}
                    provider={"google"}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    rotateEnabled={false}
                    loadingEnabled={true}
                    mapType={this.state.mapType}
                    onRegionChangeComplete={e => {this.setState({region: e})}}
                    cacheEnabled={true}
                    ref="MapView"
                >

                    <MapView.Polyline
                        strokeWidth={4}
                        strokeColor={mvConsts.buttonRejectColor}
                        coordinates={stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].track}
                    />

                </MapView>

                <View style={{
                    width: iconSide,
                    height: (iconSide + window.height * 0.01) * buttons.length - window.height * 0.01,

                    left: window.width * 0.88 - iconSide,

                    borderRadius: mvConsts.bigRadius,

                    alignItems: 'center',
                    justifyContent: 'center',

                    position: 'absolute',
                    zIndex: 1,
                }}>

                    {
                        buttons.map((button, index) => {
                            return (
                                <TouchableOpacity style={{width: iconSide, height: iconSide, marginBottom: window.height * 0.01, borderRadius: mvConsts.littleRadius, }} key={index} onPress={() => {button.action()}} >

                                    <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                        <Image
                                            style={{width: iconSide * 0.6, height: iconSide * 0.6, }}
                                            source={button.icon}
                                        />
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>

                {
                    this.state.askMode ?
                        <View style={{width: '100%', height: '100%', borderRadius: mvConsts.bigRadius, position: 'absolute', zIndex: 3, }}>
                            <Animated.View style={{width: '100%', height: '100%', backgroundColor: 'black', opacity: this.state.opacity, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 2, }}>

                            </Animated.View>
                            <TouchableWithoutFeedback onPress={() => {
                                this.rotation(0.5);
                                this.fadeAnimation(0)
                                setTimeout(() => {this.props.goTo(false);}, mvConsts.animationOpcityScDuration)
                            }}>
                                <Animated.Image
                                    style={{
                                        width: iconSide * 1.5,
                                        height: iconSide * 1.5,

                                        left: (window.width * 0.9 - iconSide * 1.5) / 2,
                                        top: window.height * 0.7, borderRadius: mvConsts.littleRadius,

                                        opacity: this.state.opacity,

                                        transform: [{rotate: spin}],

                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        position: 'absolute',
                                        zIndex: 3,
                                    }}
                                    source={require('../../../../../assets/Icons2/up-arrow.png')}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        : null
                }

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
export default connect(mapStateToProps)(MapBox)