/**
 * Created by sabir on 09.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MapPreview from '../../map/MapPreview'
import SessionPicture from '../../sessions/panels/SessionPicture'

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

    // constructUrl = (sessId) => {
    //     let link = 'https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap';
    //     let path = '';
    //     let apiKey = 'AIzaSyDnADvvsKlL7gDRc_vQm0aALjdJskXUTVk';
    //
    //     link = 'https://maps.googleapis.com/maps/api/staticmap?size=340x250&maptype=roadmap&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA&key=AIzaSyDnADvvsKlL7gDRc_vQm0aALjdJskXUTVk'
    //     link = 'https://lh3.googleusercontent.com/jackal.psp/R-5rDPpnZ6I/AAAAAAAAA2s/fsCoENa2TFY/s400/pspmaps1.bmp'
    //     return link
    // }

    loadFeed = () => {
        let {sessions, selectSession, getSessionPoints} = this.props;
        return sessions.map((session, key) => {
            return(
                    <div className={'session_item'} key ={session.id} onClick={() => {
                        selectSession(session.id)
                    }} >

                        <div className={'username_placeholder'}>
                            {session.name}
                        </div>

                        <SessionPicture sessionId={session.id}/>


                        <div className={'datetime_placeholder'}>
                            {moment(session.startTimestamp).format('DD.MM.YYYY HH:mm')}
                        </div>

                        <div className="overlay_panel"></div>

                    </div>
            )
        })
    }




    render = () => {
        let {sessions, loadUserSessions} = this.props;

        return (
            <div className={'user_sessions_panel'} >
                {(this.props.sessions == undefined || this.props.sessions.length == 0) ? null : this.loadFeed()}
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


////////////

// let transformArr = (points) => {
//     let pts = points.points;
//     let newPoints = {};
//     newPoints.lat = [];
//     newPoints.lon = [];
//     newPoints.alt = [];
//     newPoints.vel = [];
//     newPoints.bea = [];
//     newPoints.acc = [];
//     newPoints.times = [];
//
//     for (let i in pts) {
//         let {lat, lon, alt, acc, bea, vel, t} = pts[i];
//         newPoints.lat.push(lat);
//         newPoints.lon.push(lon);
//         newPoints.alt.push(alt);
//         newPoints.vel.push(vel);
//         newPoints.bea.push(bea);
//         newPoints.acc.push(acc);
//         newPoints.times.push(t);
//     }
//     return newPoints
// }
//
// let getUser = (state, sessionId) => {
//     let session = state.sessions.sessionsMap.get(sessionId);
//     if (session == undefined){
//         return undefined;
//     }
//     let {userId} = session;
//     return state.users.usersMap.get(userId)
// }
//
// const mapStateToProps = (state, ownProps) => {
//     return {
//         loading: state.sessions.loading,
//         session: state.sessions.sessionsMap.get(ownProps.sessionId),
//         points: getPoints(state, ownProps.sessionId)
//     }

////////////

const mapStateToProps = (state, ownProps) => {
   return {
       sessions: getUserSessions(state, ownProps.userId),
       loading: state.sessions.loading,
       getSessionPoints: (sessionId) => {
           return getPoints(state, sessionId)
       }
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

UserSessionsPanel = connect(mapStateToProps, mapDispatchToProps)(UserSessionsPanel);

export default UserSessionsPanel