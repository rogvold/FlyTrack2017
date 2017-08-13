/**
 * Created by sabir on 21.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment';

class SessionsDataPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {sessions, loading} = this.props;

        let sortedSessions = sessions.sort((e1, e2) => {

            if (e1.startTimestamp > e2.startTimestamp) {
                return 1;
            }

            if (e1.startTimestamp < e2.startTimestamp) {
                return -1;
            }

                return 0;

        });


        return (
            <div className={'sessions_data_panel'} >
                sessions = {JSON.stringify(sessions)}
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

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

SessionsDataPanel = connect(mapStateToProps, mapDispatchToProps)(SessionsDataPanel);

export default SessionsDataPanel