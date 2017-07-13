/**
 * Created by lesha on 21.06.17.
 */

import React, {PropTypes} from 'react';
import InputRange from 'react-input-range';
import Diagram from "./Diagram";

const iconsList = {
    'PLANE': L.icon({
        iconUrl: './assets/images/planes/plane0.png', iconSize: [40, 40],
    }),
    'GYROPLANE': L.icon({
        iconUrl: './assets/images/planes/gyroplane0.png', iconSize: [40, 40],
    }),
    'HELICOPTER': L.icon({
        iconUrl: './assets/images/planes/helicopter0.png', iconSize: [40, 40],
    }),
    'GLIDER': L.icon({
        iconUrl: './assets/images/planes/glider0.png', iconSize: [40, 40],
    })
};

class LeafletSingleMap extends React.Component {

    static defaultProps = {
    }

    static propTypes = {
    }

    state = {
        index: 0,
        speed: 1,
        defaut_dt: 200,
        changeFromSlider: false,
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

    componentWillUnmount(){
        if (this.map != undefined) this.map.remove();
    }

    getAngle = (prevPoint, currPoint) => { //узнать угол поворота
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

    createPolyline = () => { //создать маркер и линию
        let {id, aircraft} = this.props.props;
        this.polylines[id] = L.polyline([], {
            color: '#4e4cde',
            width: 8,
            opacity: 0.75
        });

        this.markers[id] = L.marker([0, 0], {
            icon: iconsList[aircraft.aircraftType],
            rotationOrigin: 'center'
        });
    }

    updatePolyline = () => {
        let {aircraftId, id, points, start, startTimestamp, timestamp} = this.props.props;
        if (!this.state.changeFromSlider) {
            if (this.state.index < points.lon.length-1 && this.state.index > 0) {
                this.setState({defaut_dt: Math.round((points.times[this.state.index+1] - points.times[this.state.index])/2 )});

                this.markers[id].setLatLng({ // добавили текущую точку
                    'lat': points.lon[this.state.index],
                    'lng': points.lat[this.state.index]
                }).addTo(this.map);

                if (this.polylines[id]._latlngs.length > 1) { //поворот, если точек больше одной
                    this.markers[id].setRotationAngle(this.getAngle({
                        'lat': points.lon[this.state.index-1],
                        'lng': points.lat[this.state.index-1]
                    }, {
                        'lat': points.lon[this.state.index],
                        'lng': points.lat[this.state.index]
                    }));
                }
                this.polylines[id].addLatLng({ // добавили текущую точку
                    'lat': points.lon[this.state.index],
                    'lng': points.lat[this.state.index]
                }).addTo(this.map);
                this.map.setView({
                    'lat': points.lon[this.state.index],
                    'lng': points.lat[this.state.index]
                });
            }

        } else { //изменение из слайдера, т.е. когда changeFromSlider = true

            this.polylines[id].remove();
            this.markers[id].remove();
            this.polylines[id] = undefined; //destroy, re-create
            this.markers[id] = undefined;
            this.createPolyline();

            for (let i = 0; i < this.state.index; i++){
                this.polylines[id].addLatLng({ // добавили точки до текущей
                    'lat': points.lon[i],
                    'lng': points.lat[i]
                }).addTo(this.map);
            }

            if (this.state.index > 1) { //ПОВОРОТ
                this.markers[id].setRotationAngle(this.getAngle({
                    'lat': points.lon[this.state.index-1],
                    'lng': points.lat[this.state.index-1]
                }, {
                    'lat': points.lon[this.state.index],
                    'lng': points.lat[this.state.index]
                }));
            }
        }
        this.markers[id].setLatLng({ // добавили текущую точку
            'lat': points.lon[this.state.index],
            'lng': points.lat[this.state.index]
        }).addTo(this.map);

        this.setState({
            index: this.state.index += 1,
            changeFromSlider: false,
            default_dt: points.times[this.state.index],
        });
    };

    getAircraftInfo = () => {
        let message = this.props.props;
        let {index} = this.state;
        return(
            <div className="aircraftSingleInfo">
                <ul>
                    <li>Позывной: {message.aircraft.callName}</li>
                    <li>Тип: {message.aircraft.aircraftType}</li>
                    <li>Скорость: {message.points.vel[(message.points.lon[index] !== undefined ? index : message.points.lat.length-1)]} м/с</li>
                    <li>Высота: {message.points.alt[(message.points.lon[index] !== undefined ? index : message.points.lat.length-1)]} м</li>
                    <li>Координаты:</li>
                    <li>Долгота: {(''+message.points.lon[(message.points.lon[index] !== undefined ? index : message.points.lat.length-1)]).slice(0, 8)}</li>
                    <li>Широта:  {(''+message.points.lat[(message.points.lon[index] !== undefined ? index : message.points.lat.length-1)]).slice(0, 8)}</li>
                </ul>
            </div>
        )
    }

    callFunction = () => {
        if (this.state.speed !== 0) {
            let {points} = this.props.props;

            if (this.state.changeFromSlider) {
                this.updatePolyline();
            } else {
                if (this.state.index < points.lat.length) {
                    this.updatePolyline();
                }
            }

            setTimeout(() => {this.callFunction()}, Math.round(this.state.defaut_dt/this.state.speed));
        }
        else setTimeout(() => this.callFunction(), 100);
    };

    initMap = () => {
        // let {aircraftId, id, points, start, startTimestamp, timestamp} = this.props.props;
        const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';
        L.mapbox.accessToken = TOKEN;
        if (this.map != undefined)  return;
        this.map = L.mapbox.map(this.SingleContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView([56.1, 36.8], 16, null);
        this.markers = {};
        this.polylines = {};
        this.createPolyline();
        this.callFunction();
    };

    render = () => {
        let {aircraftId, id, lastPointTime, points, start, timestamp} = this.props.props;
        return (
            <div className="mapbox_single_map">
                <div className={'mapbox_single_route_map'} ref={(m) => {
                    this.SingleContainer = m;
                    this.initMap();
                }}>
                </div>

                <Diagram props = {{points : points, index:this.state.index}}/>

                {this.getAircraftInfo()}

                <div className={"single_controlpanel"}>
                    {/*playpause icons start*/}
                    <div className={"ui icon buttons"}>
                        {this.state.speed === 0 ?
                            <button className={"ui compact icon button"}
                                    onClick={() => {this.setState({speed:1})}} >
                                <i className="play icon"></i>
                            </button>
                            :
                            <button className={"ui compact icon button"}
                                    onClick={() => {this.setState({speed:0})}}>
                                <i className="pause icon"></i>
                            </button>
                        }
                    </div>
                    {/*playpause icons stop*/}
                    {/*slider start*/}
                    <div className={"map_slider"}>
                        <InputRange
                            minValue={0}
                            maxValue={points.lat.length}
                            value={this.state.index}
                            formatLabel={value => ''}
                            onChange={(value) => {
                                this.setState({index: value, changeFromSlider: true, speed: 0});
                                this.updatePolyline();
                            }}
                        />
                    </div>
                    {/*slider end*/}
                    {/*speed buttons start*/}
                    <div className= {'map_buttons'}>
                        <div className={"ui icon buttons"}>
                            <button className={'mini ui button'} onClick={() => {this.setState({speed:1})}}>x1</button>
                            <button className={'mini ui button'} onClick={() => {this.setState({speed:2})}}>x2</button>
                            <button className={'mini ui button'} onClick={() => {this.setState({speed:5})}}>x5</button>
                            <button className={'mini ui button'} onClick={() => {this.setState({speed:10})}}>x10</button>
                            <button className={'mini ui button'} onClick={() => {this.setState({speed:50})}}>x50</button>
                        </div>
                    </div>
                    {/*speed buttons end*/}
                </div>
            </div>
        )
    }
}

export default LeafletSingleMap