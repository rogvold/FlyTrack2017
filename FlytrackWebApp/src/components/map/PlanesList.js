/**
 * Created by lesha on 17.06.17.
 */

import React, {PropTypes} from 'react';
import * as dashboardActions from '../../redux/actions/DashboardActions'
import { connect } from 'react-redux';
import moment from '../../../node_modules/moment/moment';
// import { bindActionCreators } from 'redux';

import * as constants from '../../constants/config'

class PlanesList extends React.Component {

    static defaultProps = {
        planes: [],
        onPlaneClick: (id) => {
            console.log(id);
        }
    }

    static propTypes = {

    }

    state = {
        isPopupActive: {},
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    isAircraftVisible = (id) => {
        if (id !== undefined) {
            let {selectedAircraftsSet} = this.props;
            return selectedAircraftsSet.has(id);
        }
    }

    render = () => {
       let {messages, selectAircraft, unselectAircraft, selectManyAircrafts, selectedAircraftsSet} = this.props;

        messages = transformMessagesToDataArray(messages);
        return (
            <div className={'planes_list'} >
                {messages.map((message, index) => {
                    let isActive = this.state.isPopupActive[message.aircraft.id];
                    return(
                        <div key = {index} className={'plane_item'} >
                            <div className={'plane_checkbox_placeholder'} >
                                <input className="cbox"
                                       name={message.aircraft.callName}
                                       type="checkbox"
                                       checked={this.isAircraftVisible(message.aircraft.id)}
                                       onChange={() => {
                                           if (this.isAircraftVisible(message.aircraft.id)) {
                                               unselectAircraft(message.aircraft.id);
                                           } else {
                                               selectAircraft(message.aircraft.id);
                                           }
                                       }}/>
                            </div>
                             <div
                                 className={'plane_name_placeholder ' + (isActive == true ? ' bold ' : '')}
                                 onClick={() => { // логика чекбоксов
                                     if (this.state.isPopupActive[message.aircraft.id] === undefined) {
                                         let buffer = this.state.isPopupActive;
                                         buffer[message.aircraft.id] = true;
                                         this.setState({isPopupActive: buffer});
                                     } else {
                                         let buffer = this.state.isPopupActive;
                                         buffer[message.aircraft.id] = !buffer[message.aircraft.id];
                                         this.setState({isPopupActive: buffer});
                                     }
                                 }}>
                                 {message.points[message.points.length -1].alt < constants.AIRPORT_ALERT_HEIGHT ?
                                     <div style={{color:'#FF0000'}}>{message.aircraft.callName}</div>
                                     :
                                     message.aircraft.callName}

                             </div>
                            {isActive ? <div className="plane_spoiler">{popupCreator(message)}</div> : null}
                        </div>
                    )
                })}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        messages: state.realtime.messagesSet.toArray(),
        selectedAircraftsSet: state.dashboard.selectedAircraftsSet
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
};

let popupCreator = (message) => {
    return (
        <ul>
            <li>Тип: {message.aircraft.aircraftType}</li>
            <li>Последнее обновление: {moment(message.points[message.points.length - 1].t).format('LTS')}</li>
            <li>Координаты:</li>
            <li>Широта: {(''+message.points[message.points.length -1].lat).slice(0, 8)}</li>
            <li>Долгота: {('' + message.points[message.points.length -1].lng).slice(0, 8)}</li>
            <li>Высота: {('' + message.points[message.points.length -1].alt).slice(0, 8)}</li>
        </ul>
    );
};

PlanesList = connect(mapStateToProps, mapDispatchToProps)(PlanesList);

export default PlanesList
