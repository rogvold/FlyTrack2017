/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapApp from '../../map/MapApp'

import DispatcherCalendar from './DispatcherCalendar'

class DispatcherDashboardPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    render = () => {

        return (
            <div className={'dispatcher_dashboard_panel'} >

                <div className={'header_panel'} >
                    top controls
                </div>

                <div className={'content_panel'} >

                    <div className={'left_placeholder'} >
                        <div className={'mapbox_map'}>
                            <MapApp />
                        </div>
                    </div>

                    <div className={'right_placeholder'} >

                        <div className={'calendar_placeholder'} >
                            <DispatcherCalendar />
                        </div>

                    </div>

                </div>

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

//DispatcherDashboardPanel = connect(mapStateToProps, mapDispatchToProps)(DispatcherDashboardPanel)

export default DispatcherDashboardPanel