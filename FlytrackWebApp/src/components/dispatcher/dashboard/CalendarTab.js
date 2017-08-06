/**
 * Created by lesha on 03.08.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CalendarPanel from '../../calendar/CalendarPanel.js'

import moment from 'moment'

import * as actions from '../../../redux/actions/SessionsActions'

import * as sessionsActions from '../../../redux/actions/SessionsActions'

class CalendarTab extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        selectedTimestamp: Date.now(),
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {loadUserSessions} = this.props;
        loadUserSessions();
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
        'october': 'Октябя',
        'november': 'Ноября',
        'december': 'Декабря'
    }[m.toLowerCase()])
}


    render = () => {
        this.isDateSelected = true;
        let {selectedTimestamp} = this.state;
        let {getSessionsForTheDay, allSessions} = this.props;

        if (this.isDateSelected) {
            return (
                <div className={'calendar_tab_placeholder user_calendar_placeholder '}>
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
                                        return (
                                            <div key={sess.id}
                                                 onClick={() => {this.props.selectSession(sess.id)}}
                                                 className={'calendar_element'}>
                                                {(sess.name == undefined ? 'Полет от ': sess.name) + moment(sess.startTimestamp).format('HH:mm DD.MM.YYYY')}
                                                {console.log(sess)}
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

// let getPoints = (state, sessionId) => {
//     let points = state.sessions.sessionsDataMap.get(sessionId);
//     if (points == undefined){
//         points = [];
//     }
//     return points;
// }

// points: getPoints(state, ownProps.sessionId),

const mapStateToProps = (state) => {
   return {
       allSessions: state.sessions.sessionsMap.toArray().filter(
           ss => (ss.userId == state.users.currentUserId)
       ).sort((a, b) => (a.t - b.t)),
       getSessionsForTheDay: (dayTimestamp) => {
           let from = +moment(dayTimestamp).startOf('day')
           let to = +moment(dayTimestamp).endOf('day')
           return state.sessions.sessionsMap.toArray().filter(
               ss => ((ss.userId == state.users.currentUserId) && (ss.startTimestamp > from) && (ss.startTimestamp < to))
           ).sort((a, b) => (a.t - b.t))
       }
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserSessions: () => {
           return dispatch(sessionsActions.loadUserSessions())
       },
       selectSession: (id) => {
           return dispatch(sessionsActions.selectSession(id))
       }
   }
}

CalendarTab = connect(mapStateToProps, mapDispatchToProps)(CalendarTab)

export default CalendarTab