/**
 * Created by sabir on 09.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MapPreview from '../../map/MapPreview'
import {bindActionCreators} from 'redux';

import * as sessionsActions from '../../../redux/actions/SessionsActions'

import moment from 'moment'

class UserSessionsPanel extends React.Component {

    static defaultProps = {
        userId: undefined
    }

    static propTypes = {

    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserSessions, userId} = this.props;
        loadUserSessions(userId);
    }

    componentWillReceiveProps(nextProps) {
        let {loadUserSessions} = this.props;
        if (nextProps.userId != this.props.userId){
            loadUserSessions(nextProps.userId);
        }
    }

    loadFeed = () => {
        let {sessions, selectSession} = this.props;
        return sessions.map((session, key) => {
            return(
                <div className={'session_item'} key ={session.id} onClick={() => {
                    selectSession(session.id)
                }} >
                    <div className={'username_placeholder'}>
                        {session.name}
                    </div>

                    <MapPreview  />

                    <div className={'datetime_placeholder'}>
                        {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                    </div>
                </div>
            )
        })
    }

    render = () => {
        let {sessions, loadUserSessions} = this.props;
        console.log('UserSessionsPanel: render: sessions = ', sessions);

        return (
            <div className={'user_sessions_panel'} >
                {this.props.loading === true ? 'loading...': this.loadFeed()}
            </div>
        )
    }

}

let getPoints = (state, sessionId) => {
    let points = state.sessions.sessionsDataMap.get(sessionId);
    if (points == undefined){
        points = [];
    }
    return points;
}

let getUserSessions = (state, userId) => {
    let {sessionsMap} = state.sessions;
    return sessionsMap.toArray().filter((s) => {
        return (s.userId == userId);
    }).sort((a, b) => {
        return (b.timestamp - a.timestamp)
    });
}

const mapStateToProps = (state, ownProps) => {
   return {
       sessions: getUserSessions(state, ownProps.userId),
       loading: state.sessions.loading,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserSessions: (userId) => {
           return dispatch(sessionsActions.loadUserSessions(userId))
       },
       selectSession: (id) => {
           return dispatch(sessionsActions.selectSession(id))
       }
   }
}

UserSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(UserSessionsPanel)

export default UserSessionsPanel