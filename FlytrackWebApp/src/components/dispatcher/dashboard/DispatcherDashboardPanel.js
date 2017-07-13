/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';

import MonitoringTab from "./MonitoringTab";
import HistoryTab from "./HistoryTab";
import RouteViewer from "./RouteViewer";
import CesiumTab from "./CesiumTab";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




class DispatcherDashboardPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        activeTab: 'monitoring'
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

        let {activeTab} = this.state;

        return (
            <div className={'dispatcher_dashboard_panel'} >

                <div className={'header_panel'} >
                    <div className={this.state.activeTab === 'monitoring' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'monitoring'})}}>
                        monitoring_tab
                    </div>

                    <div className={this.state.activeTab === 'history' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'history'})}}>
                        history_tab
                    </div>

                    <div className={this.state.activeTab === 'route_viewer' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'route_viewer'})}}>
                        routes
                    </div>

                    <div className={this.state.activeTab === 'CesiumTab' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'CesiumTab'})}}>
                        cesiumView
                    </div>

                </div >

                {this.state.activeTab !== 'monitoring' ? null: <MonitoringTab />}
                {this.state.activeTab !== 'history' ? null: <HistoryTab />}
                {this.state.activeTab !== 'route_viewer' ? null: <RouteViewer />}
                {this.state.activeTab !== 'CesiumTab' ? null: <CesiumTab />}

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