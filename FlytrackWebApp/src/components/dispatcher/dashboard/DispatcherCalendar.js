/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CalendarPanel from '../../calendar/CalendarPanel'

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

    render = () => {

        return (
            <div className={'dispatcher_calendar'} >

                <CalendarPanel  />

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//DispatcherCalendar = connect(mapStateToProps, mapDispatchToProps)(DispatcherCalendar)

export default DispatcherCalendar