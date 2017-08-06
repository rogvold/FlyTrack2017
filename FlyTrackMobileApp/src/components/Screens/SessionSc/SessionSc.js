/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'
import * as stab from '../../../../stab.json'
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
import MapView from 'react-native-maps';
import MVButton from '../ProfileSc/MVButton'

import FlytrackHelper from '../../../helpers/FlytrackHelper'

// Component
class SessionSc extends Component {

    state = {
        region: {
            latitude: 55.929489,
            longitude: 37.518258,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        },
        moving: false,
        showing: undefined,
        buttonleft: new Animated.Value(window.width * 0.25),
        buttonwidth: new Animated.Value(window.width * 0.5),
        tableft: new Animated.Value(window.width * 0.015),
        tabwidth: new Animated.Value(window.width * 0.2),
        iconright: new Animated.Value(0),
        textleft: new Animated.Value(-window.width),
        infomode: false,
        followingmode: true,
    }


    flightDistance = (fitst, second) => {
        return(mvConsts.distance(stab.aircrafts[fitst].latitude, stab.aircrafts[fitst].longitude, stab.aircrafts[second].latitude, stab.aircrafts[second].longitude, ))
    }

    mapToMyAircraft = () => {
        let { store, session } = this.props;
        let myAircraft = session.aircrafts[session.myAircraftNumber]
        let newRegion = {
            latitude: myAircraft.latitude,
            longitude: myAircraft.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }
        this.setState({region: newRegion})
        this.refs.MapView.animateToRegion(region=newRegion, duration=mvConsts.animationOpcityScDuration)
    }

    move = () => {
        let {session} = this.props
        let aircrafts = session.aircrafts
        let delta = 0.001
        if (this.state.moving) {
            for (let i in aircrafts) {
                this.props.pushTrack(i, aircrafts[i].latitude, aircrafts[i].longitude)
                this.props.moveAircraft(i, aircrafts[i].latitude + delta, aircrafts[i].longitude)
            }
        }

        // if (this.state.moving && this.state.followingmode) {
        //     this.mapToMyAircraft()
        // }
        //
        setTimeout(() => {this.move()}, 1000)
    }

    initialRegion = () => {
        let {session} = this.props
        let track = stab.flights[session.showenTrackFlightId].track
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

        minlatitude = minlatitude - (maxlatitude - minlatitude) * 0.2;
        maxlatitude = maxlatitude + (maxlatitude - minlatitude) * 0.2;
        minlongtitude = minlongtitude - (maxlongtitude - minlongtitude) * 0.2 ;
        maxlongtitude = maxlongtitude  + (maxlongtitude - minlongtitude) * 0.2;

        return{
            latitude: (minlatitude + maxlatitude) / 2,
            longitude: (minlongtitude + maxlongtitude) / 2,
            latitudeDelta: maxlatitude - minlatitude,
            longitudeDelta: maxlongtitude - minlongtitude,

        }
    }

    hidemode = () => {
        this.setState({infomode: false})
        mvConsts.animationaction(this.state.buttonleft, window.width * 0.25, 1)
        mvConsts.animationaction(this.state.tableft, -window.width, 1)
        mvConsts.animationaction(this.state.tabwidth, window.width * 0.2, 1)
    }

    shortmode = () => {
        this.setState({infomode: false})
        mvConsts.animationaction(this.state.buttonleft, window.width * 0.25, 1)
        mvConsts.animationaction(this.state.buttonwidth, window.width * 0.5, 1)
        mvConsts.animationaction(this.state.tableft, window.width * 0.015, 1)
        mvConsts.animationaction(this.state.tabwidth, window.width * 0.2, 1)
        mvConsts.animationaction(this.state.iconright, 0, 1)
        mvConsts.animationaction(this.state.textleft, -window.width, 1)
    }

    infomode = () => {
        this.setState({infomode: true})
        mvConsts.animationaction(this.state.buttonwidth, window.width * 0.48, 1)
        mvConsts.animationaction(this.state.buttonleft, window.width * 0.49, 1)
        mvConsts.animationaction(this.state.tabwidth, window.width * 0.48, 1)
        mvConsts.animationaction(this.state.tableft, window.width * -0.01, 1)
        mvConsts.animationaction(this.state.iconright, -window.width, 1)
        mvConsts.animationaction(this.state.textleft, window.width * 0.01, 1)
    }

    onButtonPress = () => {
        let {store} = this.props
        this.setState({moving: !this.state.moving})
        if (this.state.moving) {
            this.hidemode()
            this.props.setEndDate(Date.now())
            this.props.opacityPush(mvConsts.opacityLayers.sessionedit, {})
        } else {
            this.shortmode()
            this.props.setStartDate(Date.now())
            this.props.setEndDate(undefined)
        }
    }

    componentDidMount () {

        // this.props.opacityPush(mvConsts.opacityLayers.sessionedit, {})

        if (!this.state.moving) {
            this.hidemode();
        }

        this.move();
        if (this.props.session.showenTrackFlightId !== undefined) {
            this.setState({region: this.initialRegion()})
        }
    }

    render() {

        let { store, session, myPosition, currentUser, realtimeAircrafts} = this.props;
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

        let track = (aircraftNumber) => {
            let track = []
            for (let i in session.aircrafts[aircraftNumber].track) {
                track.push(
                    {
                        latitude : session.aircrafts[aircraftNumber].track[i].latitude,
                        longitude : session.aircrafts[aircraftNumber].track[i].longitude,
                    }
                )
            }
            track.push(
                {
                    latitude : session.aircrafts[aircraftNumber].latitude,
                    longitude : session.aircrafts[aircraftNumber].longitude,
                }
            )
            return (
                track
            )
        }

        let buttons = [
            {
                icon: require('../../../../assets/Icons2/sos-warning.png'),
                action: () => {},
            },
            {
                icon: require('../../../../assets/Icons2/wifi-connection-signal-symbol.png'),
                action: () => {},
            },
            {
                icon: require('../../../../assets/Icons2/satellite-dish.png'),
                action: () => {},
            },
            {
                icon: require('../../../../assets/Icons2/resize.png'),
                action: () => {this.props.opacityPush(mvConsts.opacityLayers.heightRuler, {})},
            },
            {
                icon: require('../../../../assets/Icons2/add.png'),
                action: () => {scaleRegion(2)},
            },
            {
                icon: require('../../../../assets/Icons2/minus.png'),
                action: () => {scaleRegion(0.5)},
            },
            {
                icon: require('../../../../assets/Icons2/gps-location-symbol.png'),
                action: () => {this.mapToMyAircraft(); this.setState({followingmode: !this.state.followingmode})}
            },
            {
                icon: require('../../../../assets/Icons2/house-outline.png'),
                action: () => {},
            },
            {
                icon: require('../../../../assets/Icons2/warning.png'),
                action: () => {},
            },
        ]

        let distance = () => {

            let distance = (mvConsts.trackDistane(track(session.myAircraftNumber))).toFixed(2)

            return distance + store.dictionary.km
        }

        let time = () => {

            let startTime = session.startDate
            let currentTime = Date.now()

            let duration = (currentTime - startTime)/60000;
            let hours = Math.trunc(duration / 60);
            let minutes = duration % 60;
            if (minutes === 0) {
                minutes = '00';
            }
            let seconds = Math.round(60 * (minutes%1))
            minutes = Math.trunc(minutes)
            let time = hours + ':' + minutes + ':' + seconds

            return time
        }

        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, }}>

                <MapView
                    style={{flex: 1, width: '100%', height: '100%', borderRadius: mvConsts.littleRadius,  }}
                    provider={"google"}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    loadingEnabled={true}
                    mapType={session.mapType}
                    onRegionChangeComplete={e => {this.setState({region: e})}}
                    cacheEnabled={true}
                    ref="MapView"
                >

                    {realtimeAircrafts.map((aircraft, index) => {
                        let pos = aircraft.points[aircraft.points.length - 1];

                        if (mvConsts.distance(pos.lat, pos.lon, myPosition.lat, myPosition.lon ) < session.visibleRadius) {
                            return(
                                <MapView.Marker
                                    key={aircraft.id}
                                    coordinate={
                                        {
                                            latitude: pos.lat,
                                            longitude: pos.lon,
                                        }
                                    }


                                    identifier={aircraft.id}
                                    onPress={() => {
                                        {/*if (this.state.showing === index) {*/}
                                            {/*this.setState({showing: undefined})*/}
                                        {/*} else {*/}
                                            {/*this.setState({showing: index})*/}
                                        {/*}*/}
                                    }}
                                >
                                    <Image ref='image' style={{transform: [ { rotate: `${0}deg` } ]}} source={require('../../../../assets/aircraft-01.png')} />
                                </MapView.Marker>
                            )
                        }
                    })}

                    {(myPosition == undefined ) ? null :
                        <MapView.Marker
                            coordinate={
                                        {
                                            latitude: myPosition.lat,
                                            longitude: myPosition.lon,
                                        }
                                    }


                            identifier={(currentUser == undefined ? 'guest' : currentUser.id)}
                            onPress={() => {

                                    }}
                        >
                            <Image ref='image' style={{transform: [ { rotate: `${0}deg` } ]}} source={require('../../../../assets/aircraft-my.png')} />
                        </MapView.Marker>
                    }

                    <MapView.Circle
                        center={{
                            latitude: session.aircrafts[session.myAircraftNumber].latitude,
                            longitude: session.aircrafts[session.myAircraftNumber].longitude,
                        }}
                        radius={session.warningRadius * 1000}
                        strokeWidth={0}
                        fillColor={'rgba(223, 62, 63, 0.3)'}
                    />

                    {
                        this.state.showing !== undefined ?
                            <MapView.Polyline
                                strokeWidth={4}
                                strokeColor={mvConsts.fontColorSecondary}
                                coordinates={track(this.state.showing)}
                            />
                            : null
                    }

                    {
                        stab.flights[session.showenTrackFlightId] !== undefined ?
                            <MapView.Polyline
                                strokeWidth={5}
                                strokeColor={mvConsts.buttonRejectColor}
                                coordinates={stab.flights[session.showenTrackFlightId].track}
                            />
                            : null
                    }

                </MapView>

                <View style={{width: iconSide, left: window.width * 0.94 - iconSide, top: (window.height * 0.85 - session.visibleButtons.length + 1 - iconSide * session.visibleButtons.length) / 2, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 0, }}>
                    {session.visibleButtons.map((button, index) => {
                        let opacity = 0.5
                        if ((session.visibleButtons[index] === 6) && (this.state.followingmode)) {
                            opacity = 0.8
                        }
                        return(
                            <TouchableOpacity style={{width: iconSide, height: iconSide, marginBottom: window.height * 0.01, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {buttons[session.visibleButtons[index]].action()}} key={index} >
                                <View style={{width: '100%', height: '100%', opacity: opacity, backgroundColor: 'black', borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />
                                <Image
                                    style={{width: iconSide * 0.6, height: iconSide * 0.6, position: 'absolute', }}
                                    source={buttons[session.visibleButtons[index]].icon}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        if (this.state.infomode) {
                            this.shortmode()
                        } else {
                            this.infomode()
                        }
                }} >
                    <Animated.View style={{width: this.state.tabwidth, height: window.height * 0.085, left: this.state.tableft, top: window.height * 0.75, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', }}>
                        <Animated.Image
                            style={{width: iconSide * 0.7, height: iconSide * 0.7, right: this.state.iconright, }}
                            source={require('../../../../assets/Icons2/info.png')}
                        />
                        <Animated.View style={{left: this.state.textleft, position: 'absolute', flexDirection: 'row', }}>
                            <View style={{width: window.width * 0.24, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{distance()}</Text>
                            </View>
                            <View style={{width: window.width * 0.24, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{time()}</Text>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <Animated.View style={{width: this.state.buttonwidth, left: this.state.buttonleft, position: 'absolute', }}>
                    <TouchableOpacity style={{width: '100%', height: window.height * 0.085, top: window.height * 0.75, borderRadius: mvConsts.littToucdius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 0, }} onPress={() => {this.onButtonPress()}}>
                        {!this.state.moving ?
                            <MVButton text={store.dictionary.start} style={mvConsts.buttonStyles.accept} />:
                            <MVButton text={store.dictionary.stop} style={mvConsts.buttonStyles.reject} />
                        }
                    </TouchableOpacity>
                </Animated.View>

            </View>
        );
    }
}

let getMyPosition = (state) => {
    let coords = state.gps.coordinatesMap.toArray()
        .sort((a, b) => (a.t - b.t));
    if (coords == undefined || coords.length == 0){
        return undefined;
    }
    return coords[coords.length -1];
}

let mapStateToProps = (state) => {
    return {
        store: state.store,
        session: state.session,

        myCoordinates: state.gps.coordinatesMap.toArray()
            .sort((a, b) => (a.t - b.t)),
        myPosition: getMyPosition(state),
        currentUser: state.users.usersMap.get(state.users.currentUserId),

        realtimeAircrafts: FlytrackHelper.getRealtimeAircrafts(state.realtime.pointsMap, state.users.currentUserId)

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        pushTrack: (index, latitude, longitude) => {
            return dispatch({
                type: 'pushTrack',
                index: index,
                coordinates: {
                    latitude: latitude,
                    longitude: longitude
                }
            })
        },
        moveAircraft: (index, latitude, longitude) => {
            return dispatch({
                type: 'moveAircraft',
                index: index,
                latitude: latitude,
                longitude: longitude
            })
        },
        opacityPush: (layerName, data) => {
            return dispatch({
                type: 'opacityPush',
                layerName: layerName,
                data: data,
            })
        },
        setStartDate: (startDate) => {
            return dispatch({
                type: 'setStartDate',
                startDate: startDate,
            })
        },
        setEndDate: (endDate) => {
            return dispatch({
                type: 'setEndDate',
                endDate: endDate,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(SessionSc)