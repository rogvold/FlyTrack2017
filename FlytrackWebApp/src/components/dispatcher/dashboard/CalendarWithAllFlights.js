/**
 * Created by lesha on 11.08.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CalendarPanel from '../../calendar/CalendarPanel.js'

import moment from 'moment'

// import * as actions from '../../../redux/actions/SessionsActions'
import * as userActions from '../../../redux/actions/UsersActions'

import * as sessionsActions from '../../../redux/actions/SessionsActions'

class CalendarWithAllFlights extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        selectedUserId: undefined,
        selectedTimestamp: Date.now(),
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {loadUserSessions, userId, loadAllSessions} = this.props;
        loadAllSessions();
    }

    componentWillReceiveProps(){

    }

    getRuMonth = (timestamp) => {
        let m = moment(timestamp).format('MMMM');
        return (+moment(timestamp).format('DD') + ' '  + {
            'january': 'Января',
            'february': 'Февраля',
            'march': 'Марта',
            'april': 'Апреля',
            'may': 'Мая',
            'june': 'Июня',
            'july': 'Июля',
            'august': 'Августа',
            'september': 'Сентября',
            'october': 'Октября',
            'november': 'Ноября',
            'december': 'Декабря'
        }[m.toLowerCase()])
    }


    render = () => {
        this.isDateSelected = true;
        let {selectedTimestamp} = this.state;
        let {getSessionsForTheDay, allSessions, getUserBySessionId} = this.props;
        console.log('blyaddd', this.props);

        if (this.isDateSelected) {
            return (
                <div className={'calendar_tab_placeholder user_calendar_placeholder '} >
                    <CalendarPanel

                        contentFunction={(t) => {
                            // console.log("contentFunc", t);
                            let day = moment(t).day();
                            let daySessions = getSessionsForTheDay(t);
                            if (daySessions.length == 0){
                                return null;
                            }
                            return (
                                <div className={'number_for_circle'} >
                                    {daySessions.length}
                                </div>
                            )
                        }}

                        selectedTimestamp={selectedTimestamp == undefined ? null:selectedTimestamp}

                        onDayClick={(t) => {
                            if ((+moment(t).startOf('day') == +moment(this.state.selectedTimestamp).startOf('day')) && (this.state.selectedTimestamp != undefined)){
                                this.setState({
                                    selectedTimestamp: undefined
                                });
                                return;
                            }
                            this.setState({
                                selectedTimestamp: t
                            });
                        }}

                        selectedContentFunction={(t) => {
                            let sessions = getSessionsForTheDay(selectedTimestamp);
                            return(
                                <div className={'calendar_sessions_list'}>
                                    {sessions.length === 0 ? null :
                                        <div className={'calendar_month'}>
                                            {`Активность за ${this.getRuMonth(t)}:`}
                                        </div>}

                                    {sessions.map((sess, k) => {
                                        let myUser = getUserBySessionId(sess.id);
                                        let uName = 'N/A';
                                        if (myUser != undefined){
                                            uName = myUser.firstName + ' ' + myUser.lastName;
                                        }
                                        return (
                                        <div className={'default_calendar_element'}
                                             onClick={() => {this.props.selectSession(sess.id)}}>

                                            <table className="ui celled table">
                                                <tbody>
                                                <tr>
                                                    <td style={{width: '245px'}}>
                                                        <i className="user icon"></i>
                                                        <b> {uName} </b>
                                                    </td>

                                                    <td>
                                                        <div className="sess_time">
                                                            <i className="wait icon"></i>
                                                            {moment(sess.startTimestamp).format('HH:mm/DD.MM.YYYY')}
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>

                                            {/*//*/}
                                        {/*<div key={sess.id}*/}
                                                 {/*onClick={() => {this.props.selectSession(sess.id)}}*/}
                                                 {/*style={{display: 'inline-block'}}*/}
                                                 {/*className={'calendar_element'}>*/}

                                            {/*<i className="user icon"></i>*/}
                                                {/*<b>*/}
                                                    {/*{uName + ' '}*/}
                                                {/*</b>*/}

                                            {/*{moment(sess.startTimestamp).format('HH:mm DD.MM.YYYY')}*/}
                                                {/*{console.log(sess)}*/}
                                            {/*</div>*/}
                                            {/*//*/}

                                        </div>

                                        )
                                    })}
                                </div>
                            )
                        }}
                    />
                </div>
            )
        }
        else return null;

    }
}

let getAllSessions = (state) => {
    return state.sessions.sessionsMap.toArray()
        .sort((a, b) => (a.startTimestamp - b.startTimestamp));
}

let getUser = (state, sessionId) => {
    let session = state.sessions.sessionsMap.get(sessionId);
    if (session == undefined){
        return undefined;
    }
    let {userId} = session;
    return state.users.usersMap.get(userId)
}



const mapStateToProps = (state, userId) => {
    return {
        allSessions: getAllSessions(state),

        getUserBySessionId: (sessionId) => {
            return getUser(state, sessionId)
        },

        getSessionsForTheDay: (dayTimestamp) => {
            let from = +moment(dayTimestamp).startOf('day')
            let to = +moment(dayTimestamp).endOf('day')

            if (getAllSessions(state) == undefined){
                return [];
            }

            return getAllSessions(state, userId).filter(ss => ((ss.startTimestamp > from) && (ss.startTimestamp < to)))
        },

        users: state.users.usersMap.toArray().sort((a, b) => {
            return (b.timestamp - a.timestamp);
        }),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllUsers: () => {
            return dispatch(userActions.loadAllUsers())
        },
        loadUserSessions: (userId) => {
            console.log('CalendarWithAllFlights: loadUserSessions: userId = ', userId);
            return dispatch(sessionsActions.loadUserSessions(userId))
        },
        loadAllSessions: () => {
            let from = 0 ;
            let to = +new Date();
            return dispatch(sessionsActions.loadSessionsInRange(from, to))
        },
        selectSession: (id) => {
            return dispatch(sessionsActions.selectSession(id))
        },
    }
}

CalendarWithAllFlights = connect(mapStateToProps, mapDispatchToProps)(CalendarWithAllFlights);

export default CalendarWithAllFlights