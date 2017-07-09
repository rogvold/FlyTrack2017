/**
 * Created by lesha on 12.06.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import moment from '../../../node_modules/moment/moment';
// import { bindActionCreators } from 'redux';

import * as dashboardActions from '../../redux/actions/DashboardActions'

const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';

const iconsList = {
    'PLANE': L.icon({
        iconUrl: './assets/images/planes/plane0.png',
        iconSize: [40, 40],
    }),
    'GYROPLANE': L.icon({
        iconUrl: './assets/images/planes/gyroplane0.png',
        iconSize: [40, 40],
    }),
    'HELICOPTER': L.icon({
        iconUrl: './assets/images/planes/helicopter0.png',
        iconSize: [40, 40],
    }),
    'GLIDER': L.icon({
        iconUrl: './assets/images/planes/glider0.png',
        iconSize: [40, 40],
    })
};

import PlanesList from './PlanesList'

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
        //this.isAircraftVisible;
        this.callFunction();
    }

    componentWillReceiveProps(){
        this.updatePlanesPositions();
    }

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

        return 90 - brng;
    };

    isAircraftVisible = (id) => {
        if (id !== undefined) {
            let {selectedAircraftsSet} = this.props;
            return selectedAircraftsSet.has(id);
        }
    }

    updatePlanesPositions = () => { //отвечает за перемещение и рендер самолетов
        let {messages, selectAircraft, unselectAircraft, selectManyAircrafts, selectedAircraftsSet} = this.props;

        messages = transformMessagesToDataArray(messages);

        if (messages.length == 0) {
            return;
        }

        let planes = getAircraftsByMessages(messages);
        let aircraftsIdsToSelect = [];

        for (let i in messages){
            let message = messages[i];
            let prevPoint = message.points[message.points.length - 2];
            let currentPoint = message.points[message.points.length - 1];

            if (undefined !== this.markers[message.aircraft.id]) {
                this.markers[message.aircraft.id].setLatLng(currentPoint);
                (this.polylines[message.aircraft.id].addLatLng(currentPoint));

                let popupInfo = popupCreator(message);
                this.markers[message.aircraft.id].bindPopup(popupInfo);

                if (this.polylines[message.aircraft.id]._latlngs.length > 1) { //ПОВОРОТ
                    this.markers[message.aircraft.id].setRotationAngle(this.getAngle(prevPoint, currentPoint));
                }

                if (this.isAircraftVisible(message.aircraft.id)) {
                    this.polylines[message.aircraft.id].addTo(this.map);
                } else {
                    this.polylines[message.aircraft.id].remove();
                }

            } else { //рисую маркер и полилайн
                this.markers[message.aircraft.id] = L.marker([0, 0], {
                    draggable: true,
                    icon: iconsList[message.aircraft.aircraftType],
                    rotationOrigin: 'center'
                }).addTo(this.map);

                this.polylines[message.aircraft.id] = L.polyline([], {
                    color: getRandomColour(),
                    width: 5,
                    opacity: 0.75
                });
            }
        }

        if (aircraftsIdsToSelect.length > 0){
            selectManyAircrafts(aircraftsIdsToSelect);
        }


    }

    componentWillUnmount(){
        if (this.map != undefined){
            console.log('removing map');
            this.map.remove();
        }
    }

    initMap = () => {
        if (this.mapContainer == undefined) { return; }

        if (this.map != undefined) { return; }

        let {messages} = this.props;

        L.mapbox.accessToken = TOKEN;

        let mapCenter = [56.1, 36.8];
        this.map = L.mapbox.map(this.mapContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView(mapCenter, 11.5, null);

        this.markers = {};
        this.polylines = {};

        // function onMapClick(e) { console.log("You clicked the map at " + e.latlng) }
        // this.map.on('click', onMapClick);

    } //end of initMap

    callFunction = () => {
        setTimeout(() => {
            updatePlanesPositions(),
                callFunction()}, 500);
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
    }
}

let popupCreator = (message) => {
    //language=HTML
    return (
        `Позывной: ${message.aircraft.callName}<br/>
         Тип: ${message.aircraft.aircraftType}<br/> 
         Последнее обновление: ${moment(message.points[message.points.length - 1].t).format('LTS')}<br/>
         Координаты:<br/> 
         [Широта: ${(''+message.points[message.points.length -1].lat).slice(0, 8)}, 
         Долгота: ${('' + message.points[message.points.length -1].lng).slice(0, 8)}]`
    );
};

let getAircraftMessages = (messages, aicraftId) => {
    if (messages == undefined){
        return [];
    }

    return messages.filter((m) => {
        let {aircraft} = m;
        return (aircraft != undefined && aircraft.id == aicraftId);
    })
}; // фильтрующая функция

let transformMessagesToDataArray = (messages) => {
    let aMap = {};
    for (let i in messages){
        let m = messages[i];
        let {aircraft} = m;
        if (aircraft != undefined){
            aMap[aircraft.id] = aircraft;
        }
    }
    let arr = [];
    for (let aId in aMap){
        arr.push({
            aircraft: aMap[aId],
            messages: getAircraftMessages(messages, aId)
        });
    }
    arr = arr.map((a) => {
        let {messages} = a;
        let newPoints = [];
        for (let i in messages){
            let {lat, lon, alt, acc, bea, vel, times} = messages[i].points;
            let pts = times.map((t, k) => {return {
                lat: lat[k],
                lng: lon[k], // было lon, если чет поломалось
                alt: alt[k],
                acc: acc[k],
                bea: bea[k],
                vel: vel[k],
                t: times[k]
            }})
            newPoints = newPoints.concat(pts);
        }
        return {
            aircraft: a.aircraft,
            // messages: a.messages,
            points: newPoints
        }
    })
    return arr;
}

let getAircraftsByMessages = (messages) => {
    let map = {};
    for (let i in messages){
        let m = messages[i];
        map[m.aircraft.id] = m.aircraft;
    }
    let arr = [];
    for (let key in map){
        arr.push(map[key]);
    }
    return arr;
}

let getRandomColour = () => {
    let colour = '#';
    for (let i = 0; i < 6; i++ ) {
        colour += Math.round(Math.random()*8)
    }
    return colour;
}

const mapStateToProps = (state) => {
    return {
        messages: state.realtime.messagesSet.toArray(),
        selectedAircraftsSet: state.dashboard.selectedAircraftsSet
        // currentUserId: state.users.currentUserId,
        // loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectAircraft: (aircratId) => {
            return dispatch(dashboardActions.selectAircraft(aircratId))
        },
        selectManyAircrafts: (ids) => {
            return dispatch(dashboardActions.selectManyAircrafts(ids))
        },
        unselectAircraft: (aircratId) => {
            return dispatch(dashboardActions.unselectAircraft(aircratId))
        }
    }
}

LeafletMap = connect(mapStateToProps, mapDispatchToProps)(LeafletMap)

export default LeafletMap