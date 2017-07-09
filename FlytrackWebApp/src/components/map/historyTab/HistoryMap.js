/**
 * Created by lesha on 01.07.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as dashboardActions from '../../../redux/actions/DashboardActions';


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

class HistoryMap extends React.Component {

    static defaultProps = {
    }

    static propTypes = {
    }

    state = {
        allPlanes: new Set(),
        changeFromSlider: false,
        colorList: {},
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    componentWillReceiveProps(){
    }

    getActivePlanesSet = () => {
        let {currentTime, loading, sessions} = this.props;
        if (loading) return new Set();

        let aPlanesSet = new Set();
        for (let i in sessions){
            let s = sessions[i];
            if (s.points == undefined || s.points.times == undefined || s.points.times.length == 0) continue;

            let firstT = s.points.times[0];
            let lastT = s.points.times[s.points.times.length - 1];
            if (+firstT < currentTime && currentTime < +lastT){
                aPlanesSet.add(s.id);
            }
        }
        return aPlanesSet;
    }

    removeInactive = (activePlanesSet) => {
        let {sessions, currentTime} = this.props;

        for (let route of sessions) {
            let firstT = route.points.times[0];
            let lastT = route.points.times[route.points.times.length - 1];
            if (activePlanesSet.has(route.id) && (currentTime < firstT || lastT < currentTime)) {
                activePlanesSet.delete(route.id);
                this.markers[route.id] = undefined;
                this.polylines[route.id] = undefined;
            } else if ((currentTime > lastT || currentTime < firstT) || this.state.changeFromSlider) {
                try {
                    this.markers[route.id].remove();
                    this.polylines[route.id].remove();
                } catch (e) {null}

                this.markers[route.id] = undefined;
                this.polylines[route.id] = undefined;

                if (this.state.changeFromSlider) this.state.changeFromSlider = false;
            }
        }
    }

    createMarkerPolyline = (route) => {
        let {id, aircraft} = route;

        this.polylines[id] = L.polyline([], {
            color: this.state.colorList[id],
            width: 10,
            opacity: 0.75
        })
        this.markers[id] = L.marker([0, 0], {
            icon: iconsList[aircraft.aircraftType],
            rotationOrigin: 'center'
        }).bindPopup(this.getPopupInfo(route));
    }

    getPopupInfo = (route, i) => {
        return (
            `Позывной: ${route.aircraft.callName}<br/>
            Тип: ${route.aircraft.aircraftType}<br/> 
            Координаты:<br/> 
            [Широта: ${(''+route.points.lat[i]).slice(0, 8)}, 
            Долгота: ${(''+route.points.lon[i]).slice(0, 8)}]`
        );
    }

    randomColorsForRoutes = () => {
        if (this.state.colorList !== {}) {
            let {sessions} = this.props;
            let colorList = {};
            for (let route of sessions){
                colorList[route.id] = '#' + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9)+Math.ceil(Math.random() * 9)+ Math.ceil(Math.random() * 9);
            }
            this.setState({colorList: colorList});
        }
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
    }

    drawActive = (activePlanesSet) => {
        let {sessions} = this.props;

        for (let route of sessions) {
            if (activePlanesSet.has(route.id)){
                if (this.polylines[route.id] === undefined || this.polylines[route.id]._latlngs.length === 0){
                    this.createMarkerPolyline(route);
                }

                let i = 0;
                for (let i = this.polylines[route.id]._latlngs.length; route.points.times[i] < this.props.currentTime; i++) {

                    if (this.polylines[route.id]._latlngs.length > 0) {
                        this.markers[route.id].setRotationAngle(this.getAngle({
                            'lat': route.points.lon[i-1],
                            'lng': route.points.lat[i-1]
                        }, {
                            'lat': route.points.lon[i],
                            'lng': route.points.lat[i]
                        }));
                        this.markers[route.id].bindPopup(this.getPopupInfo(route,i));
                    }
                    this.markers[route.id].setLatLng({
                        'lat': route.points.lon[i],
                        'lng': route.points.lat[i]
                    }).addTo(this.map);

                    this.polylines[route.id].addLatLng({
                        'lat': route.points.lon[i],
                        'lng': route.points.lat[i]
                    }).addTo(this.map);
                }
            }
        }
    }

    randomColorsForRoutes = () => {
        if (this.state.colorList !== {}) {
            let {sessions} = this.props;
            let colorList = {};
            for (let route of sessions){
                colorList[route.id] = '#' + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9)+Math.ceil(Math.random() * 9)+ Math.ceil(Math.random() * 9);
            }
            this.setState({colorList: colorList});
        }
    }

    clearMapIfLoading = (activePlanesSet) => {
        for (let key in this.markers) {
            // console.log('key =', key)
            if (!activePlanesSet.has(key) || this.props.loading) {

                try {
                    this.markers[key].remove();
                    this.polylines[key].remove();
                } catch (e) {null}

                this.markers[key] = undefined;
                this.polylines[key] = undefined;
            }
        }
    }

    updateMap  = () => {
        let activePlanesSet = this.getActivePlanesSet();
        if (activePlanesSet.length == 0) return;
        this.clearMapIfLoading(activePlanesSet);
        this.randomColorsForRoutes();
        this.drawActive(activePlanesSet);
        this.removeInactive(activePlanesSet);
        this.props.updateActivePlanes(activePlanesSet);
    }

    initMap = () => {
            const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';
            L.mapbox.accessToken = TOKEN;
            if (this.map != undefined)  return;
            this.map = L.mapbox.map(this.Container, 'mapbox.emerald', {
                keyboard: false,
            }).setView([56.019, 36.704, ], 11, null);
            this.markers = {};
            this.polylines = {};
            setInterval(() => this.updateMap(), 200);
    };

    render = () => {
        return (
            <div
                className={'mapbox_single_map'} ref={(m) => {
                this.Container = m;
                this.initMap();
            }}>
            </div>
        )
    }
}

let getSessions = (state) => {
    let {timestamp} = state.dashboard;
    let {aircraftsMap} = state.aircrafts;
    if (timestamp == undefined){
        return [];
    }
    let from = +moment(timestamp).startOf('day');
    let to = +moment(timestamp).endOf('day');
    let {sessionsMap, sessionsDataMap} = state.sessions;
    return sessionsMap.toArray().filter((s) => {
        return (+s.startTimestamp > +from && +s.startTimestamp < +to)
    }).sort((a, b) => {
        return (a.startTimestamp - b.startTimestamp)
    }).map((session) => {
        let pts = sessionsDataMap.get(session.id);
        if (pts == undefined){pts = {lat: [], lon: [], alt: [], acc: [], times: [], bea: [], vel: []}}
        if (pts.times != undefined && pts.times.length > 0){
            let t0 = pts.times[0];
            pts.times = pts.times.map((t) => {return (t - t0 + session.startTimestamp)})
        }
        return Object.assign({}, session, {points: pts, aircraft: aircraftsMap.get(session.aircraftId)});
    })
}

const mapStateToProps = (state) => {
    return {
        sessions: getSessions(state),
        loading: state.sessions.loading,
        timestamp: state.dashboard.timestamp,

        currentTime: state.dashboard.currentTime,
        default_dt: state.dashboard.default_dt,
        speed: state.dashboard.speed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateActivePlanes: (activePlanes) => {
            return dispatch(dashboardActions.updateActivePlanes(activePlanes))
        }
    }
}

HistoryMap = connect(mapStateToProps, mapDispatchToProps)(HistoryMap);

export default HistoryMap;
