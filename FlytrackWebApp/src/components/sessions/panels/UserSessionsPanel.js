/**
 * Created by sabir on 09.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as sessionsActions from '../../../redux/actions/SessionsActions'

import moment from 'moment'

class UserSessionsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserSessions, userId} = this.props;
        loadUserSessions(userId);
    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {sessions} = this.props;

        return (
            <div className={'user_sessions_panel'} >

                <div className={'sessions_list'} >
                    {sessions.map((session, k) => {
                        let key = 'session_' + k + '_' + session.id;

                        return (
                            <div className={'session_item'} key={key}  >

                                <div className={'name_placeholder'} >
                                    <div className={'name'} >
                                        {session.name}
                                    </div>
                                </div>

                                <div className={'date_placeholder'} >
                                    <div className={'date'} >
                                        <i className={'icon calendar'} ></i> {moment(session.timestamp)}
                                    </div>
                                </div>

                                <div className={'session_content_placeholder'} >

                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }

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
       loading: state.sessions.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserSessions: (userId) => {
           return dispatch(sessionsActions.loadUserSessions(userId))
       }
   }
}

UserSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(UserSessionsPanel)

export default UserSessionsPanel