/**
 * Created by lesha on 30.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/DashboardActions'
import moment from 'moment';


class PlaneListInHistory extends React.Component {

    static defaultProps = {

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

    getActivePlanesList = (activePlanes) => {
        let planesList = Array.from(activePlanes).map((element) => (
            <div
                onClick={() => {
                    let popups = this.state.isPopupActive;

                    if (popups[element] === undefined) {
                      popups[element] = true;
                    } else popups[element] = !popups[element];

                    this.setState({isPopupActive: popups});
                }}>
                {element}
                <br/>
                {(this.state.isPopupActive[element] === undefined || false) ? 'hidden':'showing' }
                </div>));

        return planesList;
    }

    getPlaneName = (id) => {
        for (let session of this.props.sessions){
            if (session.id === id) {
                return session.aircraft.callName;
            }
        }
    }

    getPlaneSpoiler = (id, currentTime) => {
        let message = [];
        for (let session of this.props.sessions) {
            if (session.id === id) {
                message = session;
            }
        }

        let timePoint = 0;
        if (message.points === undefined) return;
        for (timePoint; message.points.times[timePoint] < currentTime; timePoint++){
        }

        return(
            <ul>
                <li>Тип: {message.aircraft.aircraftType}</li>
                <li>Скорость: {(''+message.points.vel[timePoint]).slice(0, 5)} м/с</li>
                <li>Координаты:</li>
                <li>Широта: {(''+message.points.lat[timePoint]).slice(0, 8)}</li>
                <li>Долгота: {('' +message.points.lon[timePoint]).slice(0, 8)}</li>
            </ul>
        )
    }

    render = () => {
        return(
            <div className={"active_planes_show_hide"}>
                {Array.from(this.props.activePlanes).map((element, index) => {
                    let isActive = this.state.isPopupActive[element];
                    return(
                        <div className="plane_oneline">
                            <div
                                key = {index}
                                className={'plane_item' + (isActive == true ? ' bold ' : '')}
                                onClick = {() => {
                                    if (this.state.isPopupActive[element] === undefined) {
                                        let buffer = this.state.isPopupActive;
                                        buffer[element] = true;
                                        this.setState({isPopupActive:buffer});
                                    } else {
                                        let buffer = this.state.isPopupActive;
                                        buffer[element] = !buffer[element];
                                        this.setState({isPopupActive: buffer});
                                    }
                                }}
                            >
                                {this.getPlaneName(element)}

                            </div>

                            {isActive ?
                                <div className="plane_spoiler">
                                    {this.getPlaneSpoiler(element, this.props.currentTime)}
                                </div> : null}
                        </div>
                    )})}
            </div>
        );
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
       activePlanes: state.dashboard.activePlanes,
       currentTime: state.dashboard.currentTime,
       sessions: getSessions(state),
       loading: state.sessions.loading,
   }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setActiveAircrafts: (activeAircrafts, currentTime) => {
//             return dispatch(dashboardActions.setActiveAircrafts(activeAircrafts, currentTime))
//         }
//     }
// }

PlaneListInHistory = connect(mapStateToProps, null)(PlaneListInHistory);

export default PlaneListInHistory