// import React, {PropTypes} from 'react';
// import moment from 'moment'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as dashboardActions from '../../redux/actions/DashboardActions'
//
// import InputRange from 'react-input-range';
// // import Slider from './Slider';
//
//
// const iconsList = {
//     'PLANE': L.icon({
//         iconUrl: './assets/images/planes/plane0.png',
//         iconSize: [40, 40],
//     }),
//     'GYROPLANE': L.icon({
//         iconUrl: './assets/images/planes/gyroplane0.png',
//         iconSize: [40, 40],
//     }),
//     'HELICOPTER': L.icon({
//         iconUrl: './assets/images/planes/helicopter0.png',
//         iconSize: [40, 40],
//     }),
//     'GLIDER': L.icon({
//         iconUrl: './assets/images/planes/glider0.png',
//         iconSize: [40, 40],
//     })
// };
//
// class TestinG extends React.Component {
//
//     static defaultProps = {
//
//     }
//
//     static propTypes = {
//
//     }
//
//     state = {
//         startTimestamp: 0,
//         endTimestamp: 0,
//         currentTime: 0,
//         gotColors: false,
//         speed: 1,
//         defaut_dt: 1000,
//         changeFromSlider: false,
//         activePlanes: new Set(),
//         colorList: {},
//
//     }
//
//
//     //ES5 - componentWillMount
//     constructor(props) {
//         super(props);
//     }
//
//     componentDidMount(){
//
//     }
//
//     componentWillReceiveProps(){
//
//     }
//
//     componentWillUnmount(){
//         if (this.map != undefined){
//             this.map.remove();
//         }
//     }
//
//     setTimeLimits = () => {
//         if (this.state.currentTime === 0) {
//             let timesData = this.getMinAndMaxTimes();
//             this.setState({currentTime: timesData.min, endTimestamp: timesData.max})
//         }
//     }
//
//     moveTimestamp = () => {
//         if (this.state.currentTime < this.state.endTimestamp) {
//             this.setState({currentTime: this.state.currentTime + this.state.defaut_dt})
//         }
//     }
//
//     getActivePlanes = () => {
//         let {sessions} = this.props;
//         for (let route in sessions) {
//             if (sessions[route].points.times[0] < this.state.currentTime && this.state.currentTime < sessions[route].points.times[sessions[route].points.times.length - 1]) {
//                 let activePlanes = this.state.activePlanes;
//                 activePlanes.add(sessions[route].id);
//                 this.setState({activePlanes: activePlanes});
//             }
//         }
//     }
//
//     removeInactive = () => {
//         let {sessions} = this.props;
//         for (let route of sessions) {
//             if (this.state.activePlanes.has(route.id) && (this.state.currentTime > route.points.times[route.points.times.length-1] || this.state.currentTime < route.points.times[0])) {
//                 let newActivePlanes = this.state.activePlanes;
//                 newActivePlanes.delete(route.id);
//                 this.setState({activePlanes: newActivePlanes});
//             } else if ((this.state.currentTime > route.points.times[route.points.times.length - 1] ||
//                         this.state.currentTime < route.points.times[0]) || this.state.changeFromSlider ) {
//                 try {
//                     this.markers[route.id].remove();
//                     this.polylines[route.id].remove();
//                 } catch (e){ null }
//
//                 this.markers[route.id] = undefined;
//                 this.polylines[route.id] = undefined;
//                 if (this.state.changeFromSlider) {
//                     this.setState({changeFromSlider:false});
//                 }
//             }
//         }
//     }
//
//     createMarkerPolyline = (route) => {
//         let {id, aircraft} = route;
//         this.polylines[id] = L.polyline([], {
//             color: this.state.colorList[id],
//             width: 10,
//             opacity: 0.75
//         })
//
//         this.markers[id] = L.marker([0, 0], {
//             icon: iconsList[aircraft.aircraftType],
//             rotationOrigin: 'center'
//         }).bindPopup(this.getPopupInfo(route));
//
//     }
//
//     getPopupInfo = (route, i) => {
//         return (
//             `Позывной: ${route.aircraft.callName}<br/>
//             Тип: ${route.aircraft.aircraftType}<br/>
//             Координаты:<br/>
//             [Широта: ${(''+route.points.lat[i]).slice(0, 8)},
//             Долгота: ${(''+route.points.lon[i]).slice(0, 8)}]`
//         );
//     }
//
//     getAngle = (prevPoint, currPoint) => {
//         if (prevPoint === undefined) return;
//
//         let dx = +currPoint.lng - +prevPoint.lng;
//         let dy = +currPoint.lat - +prevPoint.lat;
//
//         let dLon = (dx);
//         let lat1 = +prevPoint.lat;
//         let lat2 = +currPoint.lat;
//
//         let y = Math.sin(+dLon) * Math.cos(+lat2);
//         let x = Math.cos(+lat1) * Math.sin(+lat2) - Math.sin(+lat1) * Math.cos(+lat2) * Math.cos(+dLon);
//
//         let brng = Math.atan2(x, y);
//
//         brng = (brng*180/Math.PI);
//         brng = (brng + 360) % 360;
//
//         return 90 - brng;
//     };
//
//     drawActive = () => {
//         let {sessions} = this.props;
//
//         for (let route of sessions) {
//
//
//             if (this.state.activePlanes.has(route.id)){
//
//                 if (this.polylines[route.id] === undefined || this.polylines[route.id]._latlngs.length === 0){
//                     this.createMarkerPolyline(route);
//                 }
//
//                 let i = 0;
//
//                 for (let i = this.polylines[route.id]._latlngs.length; route.points.times[i] < this.state.currentTime; i++) {
//
//                     if (this.polylines[route.id]._latlngs.length > 0){
//                         this.markers[route.id].setRotationAngle(this.getAngle({
//                             'lat': route.points.lat[i-1],
//                             'lng': route.points.lon[i-1]
//                         }, {
//                             'lat': route.points.lat[i],
//                             'lng': route.points.lon[i]
//                         }));
//                         this.markers[route.id].bindPopup(this.getPopupInfo(route,i));
//                     }
//
//                     this.markers[route.id].setLatLng({
//                         'lat': route.points.lat[i],
//                         'lng': route.points.lon[i]
//                     }).addTo(this.map);
//
//                     this.polylines[route.id].addLatLng({
//                         'lat': route.points.lat[i],
//                         'lng': route.points.lon[i]
//                     }).addTo(this.map);
//                 }
//                 // route.popUp = this.getPopupInfo(route,i);
//
//             }
//         }
//     }
//
//     getDefaultRandomColours = () => {
//         if (!this.state.gotColors) {
//             let {sessions} = this.props;
//             let colorList = {};
//             for (let route of sessions){
//                 colorList[route.id] = '#' + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9) + Math.ceil(Math.random() * 9)+Math.ceil(Math.random() * 9)+ Math.ceil(Math.random() * 9);
//             }
//             this.setState({gotColors: true});
//             this.setState({colorList: colorList});
//         }
//     }
//
//     sendToRedux = () => {
//         this.props.setActiveAircrafts(this.state.activePlanes, this.state.currentTime);
//     }
//
//     updateMap = () => {
//         let {sessions} = this.props;
//         this.setTimeLimits();
//         this.moveTimestamp();
//         this.getActivePlanes();
//         this.removeInactive();
//         this.drawActive();
//         this.sendToRedux();
//     }
//
//     callFunction = () => {
//         if (this.state.speed != 0) {
//         setTimeout(() => {
//             this.updateMap();
//             this.callFunction()
//         }, this.state.defaut_dt / this.state.speed)
//     } else {
//             setTimeout(() => {
//                 this.callFunction()
//         }, 100)}
//     }
//
//     initMap = () => {
//         let sessions = this.props.sessions;
//         const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';
//         L.mapbox.accessToken = TOKEN;
//
//         if (this.map != undefined) { return; }
//
//         this.map = L.mapbox.map(this.Container, 'mapbox.emerald', {
//             keyboard: false,
//         }).setView([36.704, 56.019,], 16, null);
//
//         this.markers = {};
//         this.polylines = {};
//
//         this.getDefaultRandomColours();
//         this.callFunction();
//
//     };
//
//     getMinAndMaxTimes = () => {
//         let {sessions} = this.props;
//         let min = +new Date();
//         let max = -1;
//         for (let i in sessions){
//             let {times} = sessions[i].points;
//             if (times == undefined || times.length == 0){continue};
//             let tStart = times[0];
//             let tEnd = times[times.length - 1];
//             if (tStart < min) {min = tStart};
//             if (tEnd > max) {max = tEnd};
//         }
//         return {
//             min,
//             max
//         }
//     }
//
//     render = () => {
//         console.log('render');
//         let {sessions} = this.props;
//         let {currentTime} = this.state;
//
//         if (sessions == undefined || sessions.length === 0 ) {
//             return (
//                 <div>
//                     loading data...
//                 </div>
//             )
//         }
//
//         let timesData = this.getMinAndMaxTimes();
//         return (
//             <div style={{width: '100%', height: '100%'}}>
//                 {((this.props.sessions[0].points.lat.length === 0) && (this.map == undefined) ) ?
//                     'map is loading...'
//                     :
//                     <div className={'mapbox_single_map'}>
//                         <div className="history_contolpanel">
//                             <div className={"ui icon buttons"}>
//                                 {this.state.speed  === 0 ?
//                                     <button
//                                         className={"ui compact icon button"}
//                                         onClick={() => {this.setState({speed:1})}} >
//                                         <i className="play icon"></i>
//                                     </button>
//                                     :
//                                     <button
//                                         className={"ui compact icon button"}
//                                         onClick={() => {this.setState({speed:0})}} >
//                                         <i className="pause icon"></i>
//                                     </button>}
//                             </div>
//
//                                     <div className={'map_clock'}>{moment(currentTime).format('HH:mm:ss')}</div>
//
//                             <div className="map_slider">
//                                 <InputRange
//                                     // formatLabel={value => `${moment(currentTime).format('HH:mm:ss')}`}
//                                     // formatLabel={value => ``}
//                                     maxValue={timesData.max}
//                                     minValue={timesData.min}
//                                     value={this.state.currentTime}
//                                     onChange={(value) => {
//                                         this.setState({
//                                             currentTime: value,
//                                             changeFromSlider: true
//                                         })
//                                     }}
//                                 />
//                             </div>
//
//                             <div className="map_buttons">
//                                 <div className={"ui icon buttons"}>
//                                         <button className={'mini ui button ' + (this.state.speed == 1 ? 'active' : '')}  onClick={() => {this.setState({speed:1})}}>x1</button>
//                                         <button className={'mini ui button ' + (this.state.speed == 10 ? 'active' : '')}  onClick={() => {this.setState({speed:10})}}>x10</button>
//                                         <button className={'mini ui button ' + (this.state.speed == 50 ? 'active' : '')}  onClick={() => {this.setState({speed:50})}}>x50</button>
//                                         <button className={'mini ui button ' + (this.state.speed == 100 ? 'active' : '')} onClick={() => {this.setState({speed:100})}}>x100</button>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div
//                             className={'mapbox_single_map'} ref={(m) => {
//                             this.Container = m;
//                             this.initMap();
//                         }}>
//                         </div>
//
//                     </div>
//                 }
//             </div>
//         )
//     }
// }
//
// // const mapStateToProps = (state) => {
// //     return {
// //         loading: state.sessions.loading,
// //         timestamp: state.dashboard.timestamp,
// //         sessions: getSessions(state)
// //     }
// // }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setActiveAircrafts: (activeAircrafts, currentTime) => {
//             return dispatch(dashboardActions.setActiveAircrafts(activeAircrafts, currentTime))
//         }
//     }
// }
//
// TestinG = connect(null, mapDispatchToProps)(TestinG);
//
// export default TestinG;