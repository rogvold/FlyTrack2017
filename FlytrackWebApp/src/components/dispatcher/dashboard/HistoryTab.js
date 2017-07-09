/**
 * Created by lesha on 20.06.17.
 */
import React, {PropTypes} from 'react';

import DispatcherCalendar from './DispatcherCalendar'
import PlaneListInHistory from '../../map/historyTab/PlaneListInHistory'

// import TestinG from '../../map/TestinG'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SessionsDataPanel from './SessionsDataPanel'

import moment from 'moment';
import HistoryActivePlanes from "./HistoryActivePlanes";

import Slider from "./slider/Slider";
import CurrentTime from "./slider/CurrentTime";
import PlayPauseButton from "./slider/PlayPauseButton";
import SpeedButtons from "./slider/SpeedButtons";
import HistoryMap from "../../map/historyTab/HistoryMap";

class HistoryTab extends React.Component {

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

    }

    componentWillReceiveProps(){

    }

    render = () => {

        if (this.props.timestamp === undefined && !this.props.loading){
            return <DispatcherCalendar />;
        }

        // let sortedSessions = this.props.sessions.sort((e1, e2) => {
        //     if (e1.startTimestamp > e2.startTimestamp) {
        //         return 1;
        //     }
        //     if (e1.startTimestamp < e2.startTimestamp) {
        //         return -1;
        //     }
        //     return 0;
        //
        // });

        return (
            <div className={'content_panel'}>

                <div className={'left_placeholder'}>

                    <div className={'history_controlpanel'}>
                        <PlayPauseButton/>
                        <CurrentTime />
                        <Slider />
                        <SpeedButtons />
                    </div>

                    <HistoryMap/>
                    {/*<TestinG sessions = {sortedSessions} />*/}
                </div>

                <div className={'right_placeholder'}>

                    <div className={'calendar_placeholder'}>
                        <DispatcherCalendar />
                    </div>

                    <div className="history_planes_list">
                        <PlaneListInHistory/>
                    </div>

                    {/*<SessionsDataPanel />*/}
                </div>

            </div>

        )
    }
}


// const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }getSortedSessions()

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
        loading: state.sessions.loading,
        timestamp: state.dashboard.timestamp,
        sessions: getSessions(state)
    }
}


HistoryTab = connect(mapStateToProps, null)(HistoryTab);

export default HistoryTab