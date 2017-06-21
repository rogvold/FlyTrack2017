/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CalendarPanel from '../../calendar/CalendarPanel'

import * as dashboardActions from '../../../redux/actions/DashboardActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class DispatcherCalendar extends React.Component {

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

    onDayClick = (t) => {
        let {setTimestampAndLoadSessions} = this.props;
        console.log('DispatcherCalendar: onDayClick: timestamp = ', t);
        setTimestampAndLoadSessions(t)
    }

    render = () => {
        let {loading, selectedTimestamp} = this.props;

        return (
            <div className={'dispatcher_calendar'} >

                <CalendarPanel selectedTimestamp={selectedTimestamp}
                               onDayClick={this.onDayClick} />

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       currentUserId: state.users.currentUserId,
       loading: state.sessions.loading,
       selectedTimestamp: state.dashboard.timestamp
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       setTimestampAndLoadSessions: (timestamp) => {
           return dispatch(dashboardActions.setTimestampAndLoadSessions(timestamp))
       }
   }
}

DispatcherCalendar = connect(mapStateToProps, mapDispatchToProps)(DispatcherCalendar)

export default DispatcherCalendar