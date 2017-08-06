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

import * as flightActions from '../../../redux/actions/FlightActions'

import * as constants from '../../../constants/AccountConstants'

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

        selectedTrackAircraftId: undefined

    }


    flightDistance = (fitst, second) => {
        return(mvConsts.distance(stab.aircrafts[fitst].latitude, stab.aircrafts[fitst].longitude, stab.aircrafts[second].latitude, stab.aircrafts[second].longitude, ))
    }

    mapToMyAircraft = () => {
        let { store, session , myPosition} = this.props;
        if (myPosition == undefined){return;}
        let newRegion = {
            latitude: myPosition.lat,
            longitude: myPosition.lon,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }
        this.setState({region: newRegion})
        this.refs.MapView.animateToRegion(region=newRegion, duration=mvConsts.animationOpcityScDuration)
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
        let {store, startFlight, stopFlight} = this.props
        this.setState({moving: !this.state.moving})
        if (this.state.moving) {
            this.hidemode()
            stopFlight();
            // this.props.setEndDate(Date.now())
            // this.props.opacityPush(mvConsts.opacityLayers.sessionedit, {})
        } else {
            this.shortmode()
            startFlight();
            // this.props.setStartDate(Date.now())
            // this.props.setEndDate(undefined)
        }
    }

    componentDidMount () {

        // this.props.opacityPush(mvConsts.opacityLayers.sessionedit, {})

        if (!this.state.moving) {
            this.hidemode();
        }


        if (this.props.session.showenTrackFlightId !== undefined) {
            this.setState({region: this.initialRegion()})
        }

        this.refreshIntervalId = setInterval(() => {
            this.forceUpdate();
        }, 2000);

    }

    componentWillUnmount(){
        if (this.refreshIntervalId != undefined){
            clearInterval(this.refreshIntervalId);
        }
    }

    render() {
        let { store, session, myPosition, currentUser, myRotation,
            realtimeAircrafts, startFlightTimestamp, myCoordinates,
            getAircraftTrack, currentAircraft, getTimeFromLastMessage} = this.props;
        let iconSide = window.height * 0.08;
        let {selectedTrackAircraftId} = this.state;
        let selectedTrackAircraftPoints = getAircraftTrack(selectedTrackAircraftId);

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


        let timeElapsed = (startFlightTimestamp == undefined) ? 0 : (+new Date() - startFlightTimestamp);
        let seconds = Math.floor((timeElapsed / 1000 )) % 60;
        let minutes = Math.floor(timeElapsed / 60000.0);
        if (seconds < 10){seconds = '0' + seconds}
        if (minutes < 10){minutes = '0' + minutes}
        let timeElapsedString = minutes + ':' + seconds;
        let myPointsFromStart = myCoordinates.filter(a => (a.t > startFlightTimestamp));
        let distanceFromStart = FlytrackHelper.getTrackDistance(myPointsFromStart);
        distanceFromStart = Math.round(distanceFromStart * 10.0) / 10.0;
        distanceFromStart = distanceFromStart + ' ' + store.dictionary.km;
        let realtimeTimeout = constants.FLIGHT_REALTIME_TIMEOUT;


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
                        let angle = (aircraft.points.length < 2) ? 0 : FlytrackHelper.angleFromCoordinates(pos.lat, pos.lon, aircraft.points[aircraft.points.length - 2].lat, aircraft.points[aircraft.points.length - 2].lon);
                        let timeFromLast = getTimeFromLastMessage(aircraft.aircraft.id);
                        timeFromLast = Math.floor(timeFromLast / 1000.0);

                        if (mvConsts.distance(pos.lat, pos.lon, myPosition.lat, myPosition.lon ) < session.visibleRadius) {
                            return(
                                <MapView.Marker
                                    key={aircraft.aircraft.id + '_' + index}
                                    coordinate={
                                        {
                                            latitude: pos.lat,
                                            longitude: pos.lon,
                                        }
                                    }
                                    image={require('../../../../assets/aircraft-01.png')}
                                    rotation={angle}
                                    identifier={aircraft.id}
                                    onPress={() => {
                                        console.log('onPlane press occured: aircraft = ', aircraft);
                                        if (selectedTrackAircraftId == aircraft.aircraft.id){
                                           this.setState({
                                                selectedTrackAircraftId: undefined
                                            });
                                            return;
                                        }
                                        this.setState({
                                            selectedTrackAircraftId: aircraft.aircraft.id
                                        });
                                    }}
                                >
                                    <View style={{backgroundColor: ((timeFromLast < realtimeTimeout) ? 'rgba(255, 255, 255, 0.6)' : 'red' ), padding: 3, borderRadius: 3}} >
                                        <Text style={{flex: 1, fontWeight: 'bold', fontSize: 14, textAlign: 'center'}} >
                                            {aircraft.aircraft.callName}
                                        </Text>
                                        {timeFromLast < realtimeTimeout ? null :
                                            <Text>
                                                {timeFromLast} s
                                            </Text>
                                        }
                                    </View>
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
                            image={require('../../../../assets/aircraft-my.png')}
                            rotation={myRotation}
                            identifier={(currentUser == undefined ? 'guest' : currentUser.id)}
                            onPress={() => {
                                        console.log('my aircraft clicked: currentAircraft = ', currentAircraft);
                                        if (currentAircraft == undefined){return}
                                        if (selectedTrackAircraftId == currentAircraft.id){
                                           this.setState({
                                                selectedTrackAircraftId: undefined
                                            });
                                            return;
                                        }
                                        this.setState({
                                            selectedTrackAircraftId: currentAircraft.id
                                        });
                                    }}
                        />
                    }
                    {myPosition == undefined ? null :
                        <MapView.Circle
                            center={{
                            latitude: myPosition.lat,
                            longitude: myPosition.lon,
                        }}
                            radius={session.warningRadius * 1000}
                            strokeWidth={0}
                            fillColor={'rgba(223, 62, 63, 0.3)'}
                        />
                    }

                    {
                        selectedTrackAircraftPoints.length == 0 ? undefined :
                            <MapView.Polyline
                                strokeWidth={4}
                                strokeColor={mvConsts.fontColorSecondary}
                                coordinates={selectedTrackAircraftPoints.map(p => {return {latitude: p.lat, longitude: p.lon}})}
                            />
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
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{distanceFromStart}</Text>
                            </View>
                            <View style={{width: window.width * 0.24, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{timeElapsedString}</Text>
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

let getMyRotation = (state) => {
    let coords = state.gps.coordinatesMap.toArray()
        .sort((a, b) => (a.t - b.t));
    if (coords == undefined || coords.length < 2){
        return undefined;
    }
    return FlytrackHelper.angleFromCoordinates(coords[coords.length - 2].lat, coords[coords.length - 2].lon,
                                               coords[coords.length - 1].lat, coords[coords.length - 1].lon)
}

let mapStateToProps = (state) => {
    return {
        store: state.store,
        session: state.session,

        myCoordinates: state.gps.coordinatesMap.toArray()
            .sort((a, b) => (a.t - b.t)),

        myPosition: getMyPosition(state),
        myRotation: getMyRotation(state),
        currentUser: state.users.usersMap.get(state.users.currentUserId),
        currentAircraft: state.aircrafts.aircraftsMap.get(state.aircrafts.selectedAircraftId),

        realtimeAircrafts: FlytrackHelper.getRealtimeAircrafts(state.realtime.pointsMap, state.users.currentUserId),

        startFlightTimestamp: state.flight.startFlightTimestamp,

        getAircraftTrack: (aircraftId) => {
            console.log('getAircraftTrack: aircraftId = ', aircraftId);
            if (aircraftId == undefined){
                return [];
            }
            if (aircraftId == state.aircrafts.selectedAircraftId){
                console.log('aircraftId == selectedAircraftId ');
                return state.gps.coordinatesMap.toArray()
                    .sort((a, b) => (a.t - b.t))
            }
            let airs = FlytrackHelper.getRealtimeAircrafts(state.realtime.pointsMap, state.users.currentUserId).filter(
                dd => (dd.aircraft.id == aircraftId)
            )
            console.log('getAircraftTrack: airs = ', airs);
            if (airs.length > 0){
                return airs[0].points;
            }
            return [];
        },

        getTimeFromLastMessage: (aircraftId) => {
            let airs = FlytrackHelper.getRealtimeAircrafts(state.realtime.pointsMap, state.users.currentUserId).filter(
                dd => (dd.aircraft.id == aircraftId)
            )
            console.log('getTimeFromLastMessage: aircraftId = ', aircraftId);
            if (airs.length == 0){
                return 0;
            }
            let points = airs[0].points;
            if (points.length == 0){return 0}
            let now = +new Date();
            return (now - +points[points.length - 1].t);
        }

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
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

        startFlight: () => {
            return dispatch(flightActions.startFlight())
        },

        stopFlight: () => {
            return dispatch(flightActions.stopFlight())
        }

    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(SessionSc)