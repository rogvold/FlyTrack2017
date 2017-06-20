/**
 * Created by lesha on 14.06.17.
 */
/**
 * Created by lesha on 12.06.17.
 */


import React, {PropTypes} from 'react';
//import rotation from 'leaflet-rotatedmarker'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

let pushMessage = 0;

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
    }

    componentWillReceiveProps(){
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


    initMap = () => {
        let {messages} = this.props;
        const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';

        if (messages.length == 0){ return; }

        if (pushMessage != messages[messages.length - 1]){
            let pushMessage = messages[messages.length - 1]
            movePlanes(nOfPlanes);
            console.log('pushMessage', pushMessage.points);
        }

        let mapCenter = [51.501872, -0.121518];//[allPoints[Math.round(allPoints.length / 2)][0], allPoints[Math.round(allPoints.length / 2)][1]]
        //[longitude, latitude]

        if (this.mapContainer == undefined) { return; }

        if (this.map != undefined) { return; }

        L.mapbox.accessToken = TOKEN;
        this.map = L.mapbox.map(this.mapContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView(mapCenter, 9, null);

        const planeIcon = L.icon({
            iconUrl: './assets/images/planes/plane0.png',
            iconSize: [35, 35],})

        /*
         let marker = L.marker([0, 0], {
         draggable: true,
         icon: planeIcon,
         rotationOrigin: 'center'
         }).addTo(this.map);
         */


        let nOfPlanes = 1;
        let planesArray = [];
        let createPlanes = (nOfPlanes) => {
            for (let i = 0; i < nOfPlanes; i++){
                planesArray[i] = L.marker([0,0], {
                    draggable: true,
                    icon: planeIcon,
                    rotationOrigin: 'center'
                }).addTo(this.map);
                planesArray[i].bindPopup(`<b>${i}</b>`)
            }
        };
        createPlanes(nOfPlanes);

        //marker.setIcon(planeIcon);

        function onMapClick(e) { console.log("You clicked the map at " + e.latlng) }
        this.map.on('click', onMapClick);

        //let polyline = L.polyline([]).addTo(this.map);

        let getFollowingAngle = (prevPoint, currPoint) => {
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
            // brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

            // console.log('--->>>>>   brng = ', brng);

            return brng-90;
        }



        let movePlanes = (nOfPlanes) => {
            let i = 0;
            let pushMessage = messages[messages.length - 1];

            if (coordinates !== { 'lat': pushMessage.points.lat[0], 'lng': pushMessage.points.lon[0]}) {
                let prevAndCur = [coordinates, {
                    'lat': pushMessage.points.lat[0],
                    'lng': pushMessage.points.lon[0]
                }];
                planesArray[i].setRotationAngle(-getFollowingAngle(...prevAndCur))
            }

            coordinates = {
                'lat': pushMessage.points.lat[0],
                'lng': pushMessage.points.lon[0]
            };

            planesArray[i].setLatLng(coordinates);
            console.log(coordinates);

            //setTimeout(() => {movePlanes(nOfPlanes)}, 1000)
        }

        /*
         let movePlane = (i) =>{
         let coordinates =  {'lat': allPoints[i][0], 'lng': allPoints[i][1]};
         marker.setLatLng(coordinates);
         polyline.addLatLng(coordinates);

         if (i>0) {
         let prevAndCur = [{'lat': allPoints[i-1][0], 'lng': allPoints[i-1][1]},
         {'lat': allPoints[i][0], 'lng': allPoints[i][1]}];


         marker.setRotationAngle(-getFollowingAngle(...prevAndCur));
         }
         if (++i < allPoints.length) setTimeout(() => {movePlane(i)}, 100)
         };
         */

    } //end of initMap


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

// LeafletMap = connect(mapStateToProps, mapDispatchToProps)(LeafletMap)

export default LeafletMap