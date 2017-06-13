/**
 * Created by lesha on 12.06.17.
 */


import React, {PropTypes} from 'react';
import route from './route.json';
//import rotation from 'leaflet-rotatedmarker'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class LeafletMap extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

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


    initMap = () => {
        const allPoints = route.points.map(point => [point.lng, point.lat]);
        const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';
        let mapCenter = [allPoints[Math.round(allPoints.length / 2)][0], allPoints[Math.round(allPoints.length / 2)][1]]
        //              [longitude, latitude]

        if (this.mapContainer == undefined) {
            return;
        }
        if (this.map != undefined) {
            return;
        }

        L.mapbox.accessToken = TOKEN;
        this.map = L.mapbox.map(this.mapContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView(mapCenter, 13, null);

        const planeIcon = L.icon({
            iconUrl: './assets/images/planes/plane0.png',
            iconSize: [35, 35],})

        let marker = L.marker([0, 0], {
            draggable: true,
            icon: planeIcon,
            rotationOrigin: 'center'
        }).addTo(this.map);

        //marker.setIcon(planeIcon);
        marker.bindPopup("<b>POPUP</b>"); //.openPopup();

        function onMapClick(e) { console.log("You clicked the map at " + e.latlng) }
        this.map.on('click', onMapClick);

        console.log('marker', marker.getLatLng());
        // this.map.on('load', () =>{

        let polyline = L.polyline([]).addTo(this.map);

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

            console.log('--->>>>>   brng = ', brng);

            return brng-90;
        }


        let movePlane = (i) =>{
            let coordinates =  {'lat': allPoints[i][0], 'lng': allPoints[i][1]};
            marker.setLatLng(coordinates);
            polyline.addLatLng(coordinates);

            if (i>0) {
                let prevAndCur = [{'lat': allPoints[i-1][0], 'lng': allPoints[i-1][1]},
                    {'lat': allPoints[i][0], 'lng': allPoints[i][1]}];

                marker.setRotationAngle(-getFollowingAngle(...prevAndCur));
            }

            console.log(`coordinates: ${coordinates}`);

            if (++i < allPoints.length) setTimeout(() => {movePlane(i)}, 100)
        };

        movePlane(0);

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



//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//LeafletMap = connect(mapStateToProps, mapDispatchToProps)(LeafletMap)

export default LeafletMap