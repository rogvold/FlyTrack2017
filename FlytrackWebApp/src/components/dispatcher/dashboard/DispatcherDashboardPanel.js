/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapApp from '../../map/MapApp'

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

                        <MapApp />

                    </div>

                    <div className={'right_placeholder'} >
                        right controls
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