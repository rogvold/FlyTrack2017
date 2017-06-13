/**
 * Created by sabir on 10.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../redux/actions/SessionsActions'

class SessionPanel extends React.Component {

    static defaultProps = {
        sessionId: undefined
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadSessionData, sessionId} = this.props;
        if (sessionId == undefined){
            return;
        }
        loadSessionData(sessionId);
    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {session, points} = this.props;

        return (
            <div className={'session_panel'} >

                <div>
                    session = {JSON.stringify(session)}
                </div>

                <div>
                    points = {JSON.stringify(points)}
                </div>

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

const mapStateToProps = (state, ownProps) => {
   return {
       loading: state.sessions.loading,
       session: state.sessions.sessionsMap.get(ownProps.sessionId),
       points: getPoints(state, ownProps.sessionId)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadSessionData: (id) => {
           return dispatch(actions.loadSessionData(id))
       }
   }
}

SessionPanel = connect(mapStateToProps, mapDispatchToProps)(SessionPanel)

export default SessionPanel