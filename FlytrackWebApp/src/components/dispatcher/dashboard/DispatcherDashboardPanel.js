/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';

import UserSessionsPanel from "../../sessions/panels/UserSessionsPanel"

import MonitoringTab from "./MonitoringTab";
import HistoryTab from "./HistoryTab";
import CalendarTab from "./CalendarTab";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




class DispatcherDashboardPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        activeTab: 'calendar'
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
                    <div className={this.state.activeTab === 'feed' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'feed'})}}>
                        feed
                    </div>

                    <div className={this.state.activeTab === 'monitoring' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'monitoring'})}}>
                        monitoring_tab
                    </div>

                    <div className={this.state.activeTab === 'history' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'history'})}}>
                        history_tab
                    </div>

                    <div className={this.state.activeTab === 'calendar' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'calendar'})}}>
                        calendar
                    </div>

                </div >

                {this.state.activeTab !== 'feed' ? null: <UserSessionsPanel userId={'HegpmMKJjp'} />}
                {this.state.activeTab !== 'monitoring' ? null: <MonitoringTab />}
                {this.state.activeTab !== 'history' ? null: <HistoryTab />}
                {this.state.activeTab !== 'calendar' ? null: <CalendarTab />}

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