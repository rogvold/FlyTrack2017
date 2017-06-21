/**
 * Created by lesha on 20.06.17.
 */
import React, {PropTypes} from 'react';
import DispatcherCalendar from './DispatcherCalendar'
import LeafletMap from '../../map/LeafletMonitoring'
import PlanesList from '../../map/PlanesList'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MonitoringTab extends React.Component {

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
                <div className={'content_panel'} >

                    <div className={'left_placeholder'} >
                        <div className={'mapbox_map'}>
                            <LeafletMap />
                        </div>

                    </div>

                    <div className={'right_placeholder'} >

                        {/*<div className={'calendar_placeholder'} >*/}
                            {/*<DispatcherCalendar />*/}
                        {/*</div>*/}

                        <div className="planes_list_placeholder">
                            <PlanesList />
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

//MonitoringTab = connect(mapStateToProps, mapDispatchToProps)(MonitoringTab)

export default MonitoringTab