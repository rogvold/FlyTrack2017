/**
 * Created by sabir on 10.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeafletSingleMap from '../../map/singleTab/LeafletSingleMap';
import CesiumView from '../../map/CesiumView'
import moment from 'moment'

import * as actions from '../../../redux/actions/SessionsActions'

class SessionPanel extends React.Component {

    static defaultProps = {
        sessionId: undefined
    }

    static propTypes = {}

    state = {
        tab: '2D',
    }

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

    getProps = () => {
        let {session, points} = this.props;
        return { session: session, points: transformArr(points) }
    }

    showMap = () => {
     let props = this.getProps();
        return (this.state.tab === '2D' ? <LeafletSingleMap props = {props}/> : <CesiumView props = {props}/>)
    };

    render = () => {
        console.log('=============', this.props.session);
        let {session} = this.props;
        if (session == undefined){
            return null;
        }
        let {user} = this.props;
        let name = 'No name';
        if (user != undefined){
            name = user.firstName + ' ' + user.lastName;
        }


        return (
            <div className={'session_panel'}>
                <div className="session_user_name"><b>{name}</b> - {session.name}</div>
                <div className="session_datetime">{moment(this.props.session.startTimestamp).format('DD.MM.YYYY HH:mm')}</div>

                    <div className={'session_tabs_placeholder'}>
                        <div className={this.state.tab === '2D' ? 'selected_tab':'unselected_tab pointer'}
                             onClick={() => {this.setState({tab:'2D'})}}> 2D </div>
                        <div className={this.state.tab === '3D' ? 'selected_tab':'unselected_tab pointer'}
                             onClick={() => {this.setState({tab:'3D'})}}> 3D </div>
                    </div>
                    {/*session = {JSON.stringify(session)}*/}
                    {/*{this.props.loading === true ? null : `points = ${JSON.stringify(transformArr(points))}`}*/}

                    {this.props.loading === true ? null : this.showMap()}

            </div>
        )
    }

}

let transformArr = (points) => {
    let pts = points.points;
    let newPoints = {};
    newPoints.lat = [];
    newPoints.lon = [];
    newPoints.alt = [];
    newPoints.vel = [];
    newPoints.bea = [];
    newPoints.acc = [];
    newPoints.times = [];

    for (let i in pts) {
        let {lat, lon, alt, acc, bea, vel, t} = pts[i];
        newPoints.lat.push(lat);
        newPoints.lon.push(lon);
        newPoints.alt.push(alt);
        newPoints.vel.push(vel);
        newPoints.bea.push(bea);
        newPoints.acc.push(acc);
        newPoints.times.push(t);
    }
    return newPoints
}

let getPoints = (state, sessionId) => {
    let points = state.sessions.sessionsDataMap.get(sessionId);
    if (points == undefined){
        points = [];
    }
    return points;
}

let getUser = (state, sessionId) => {
    let session = state.sessions.sessionsMap.get(sessionId);
    if (session == undefined){
        return undefined;
    }
    let {userId} = session;
    return state.users.usersMap.get(userId)
}

const mapStateToProps = (state, ownProps) => {
   return {
       loading: state.sessions.loading,
       session: state.sessions.sessionsMap.get(ownProps.sessionId),
       points: getPoints(state, ownProps.sessionId),
       user: getUser(state, ownProps.sessionId)
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