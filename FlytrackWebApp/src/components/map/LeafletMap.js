/**
 * Created by lesha on 12.06.17.
 */

import React, {PropTypes} from 'react';
import route from './route.json';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

let howManyTimesCalledThisFunction = 0;

const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';

const planeIcon = L.icon({
    iconUrl: './assets/images/planes/plane0.png',
    iconSize: [35, 35],})


class LeafletMap extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        aircraftsMap: {

        }
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.initMap();
        this.getAngle();
        this.callFunction();
    }

    componentWillReceiveProps(){
        this.updatePlanesPositions();
    }

/*
    updatePlanesPositions = () => {
        let {messages} = this.props;
        let lastPositionsMap = this.getLastPositionsMap();
        if (messages.length == 0){
            return;
        }
        let lastMessage = messages[messages.length - 1];
        let {aircraft} = lastMessage;
        if (aircraft == undefined){
            return;
        }
        let {id} = aircraft;
        let oldPosition = lastPositionsMap[id];

        if (oldPosition == undefined){
            //todo: create marker
            const planeIcon = L.icon({
                iconUrl: './assets/images/planes/plane0.png',
                iconSize: [35, 35],})
            let marker = L.marker([lastMessage.points.lat[0], lastMessage.points.lon[0]], {
                draggable: true,
                icon: planeIcon,
                rotationOrigin: 'center'
            }).addTo(this.map);

            let polyline = L.polyline([]).addTo(this.map);

        } else {
            //todo: update marker
            let coords = [lastMessage.points.lat[0], lastMessage.points.lon[0]];
            let prevCoords = [marker.getLatLng.lat, marker.getLatLng.lon]

            marker.setRotationAngle(-getAngle(prevCoords,coords));
            marker.setLatLng(coords);
            polyline.addLatLng(coords);

        }
    }

    getLastPositionsMap = () => {
        let map = {};
        let {messages} = this.props;
        for (let i in messages){
            let {aircraft, points} = messages[i];
            if (aircraft == undefined || points == undefined || points.times == undefined || points.times.length == 0){
                continue;
            }
            let {lat, lon, alt, acc, bea, vel, times} = points;
            map[aircraft.id] = {
                lat: lat[lat.length -1],
                lon: lon[lon.length -1],
                alt: alt[alt.length -1],
                acc: acc[acc.length -1],
                vel: vel[vel.length -1],
                bea: bea[bea.length -1],
                times: times[times.length -1]
            };
        }
        return map;
    }

    let getAngle = (prevPoint, currPoint) => {
        let dy = +currPoint.lat - +prevPoint.lat;
        let dx = +currPoint.lng - +prevPoint.lng;

        let dLon = (dx);
        let lat1 = +prevPoint.lat;
        let lat2 = +currPoint.lat;

        let y = Math.sin(+dLon) * Math.cos(+lat2);
        let x = Math.cos(+lat1) * Math.sin(+lat2) - Math.sin(+lat1) * Math.cos(+lat2) * Math.cos(+dLon);

        let brng = Math.atan2(x, y);

        brng = (brng*180/Math.PI);
        brng = (brng + 360) % 360;

        return brng-90;
    }
*/

    getAngle = (prevPoint, currPoint) => {
       if (prevPoint === undefined) return;

        let dx = +currPoint.lng - +prevPoint.lng;
        let dy = +currPoint.lat - +prevPoint.lat;

        let dLon = (dx);
        let lat1 = +prevPoint.lat;
        let lat2 = +currPoint.lat;

        let y = Math.sin(+dLon) * Math.cos(+lat2);
        let x = Math.cos(+lat1) * Math.sin(+lat2) - Math.sin(+lat1) * Math.cos(+lat2) * Math.cos(+dLon);

        let brng = Math.atan2(x, y);

        brng = (brng*180/Math.PI);
        brng = (brng + 360) % 360;

        return -(brng-90);
    }


    updatePlanesPositions = () => { //отвечает за перемещение и рендер самолетов
        let {messages} = this.props;

        if (messages.length <= 1) { //проверка, что массив с координатами не пуст
            return;
        }

        let currentMessage = messages[messages.length - 1];
        let prevMessage = messages[messages.length - 2];

        console.log('howManyTimesCalledThisFunction = ', howManyTimesCalledThisFunction);
        console.log('prevMessage    = ', prevMessage)
        console.log('currentMessage = ', currentMessage)


        let coordinates = { 'lat': currentMessage.points.lat[0],
                            'lng': currentMessage.points.lon[0]};

        this.marker.setLatLng(coordinates);
        this.polyline.addLatLng(coordinates);

        this.marker.setRotationAngle(this.getAngle({
            'lat': prevMessage.points.lat[0],
            'lng': prevMessage.points.lon[0]},
            coordinates));


        //this.marker.setRotationAngle(this.getAngle(lastMessage.points., currentPoint.points));
        //todo: aircraft, что это
        //todo: непонятно, где id самолета будет лежать, чтобы нормально сделать функцию...


    }


    initMap = () => {
        if (this.mapContainer == undefined) { return; }

        if (this.map != undefined) { return; }

        let {messages} = this.props;
        console.log('messages from initmap = ', this.props);



        L.mapbox.accessToken = TOKEN;

        let mapCenter = [51.501872, -0.121518];
        this.map = L.mapbox.map(this.mapContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView(mapCenter, 0.5, null);



        this.map.setView([0,0], 0.5, null);

        this.marker = L.marker([0, 0], {
            draggable: true,
            icon: planeIcon,
            rotationOrigin: 'center'
        }).addTo(this.map);

        this.polyline = L.polyline([]).addTo(this.map);

        function onMapClick(e) { console.log("You clicked the map at " + e.latlng) }
        this.map.on('click', onMapClick);

        //setTimeout(() => {this.initMap()}, 1000);

    } //end of initMap

    callFunction = () => {
        setTimeout(() => {
            updatePlanesPositions(),
            callFunction()}, 300);
    }


    render = () => {
        return (
            <div
                className={'mapbox_map'} ref={(m) => {
                this.mapContainer = m;
                this.initMap();
            }}>

            </div>
        )
    }}



const mapStateToProps = (state) => {
   return {
       messages: state.realtime.messagesSet.toArray(),
       // currentUserId: state.users.currentUserId,
       // loading: state.users.loading
   }
}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

LeafletMap = connect(mapStateToProps, null)(LeafletMap)

export default LeafletMap