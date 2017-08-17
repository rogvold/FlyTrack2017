/**
 * Created by lesha on 08.06.17.
 */
import React, {PropTypes} from 'react';

import UserSessionsPanel from "../../sessions/panels/UserSessionsPanel"

import MonitoringTab from "./MonitoringTab";
import HistoryTab from "./HistoryTab";
import CalendarTab from "./CalendarTab";
import CalendarWithAllFlights from "./CalendarWithAllFlights";
import HistoryTabV2 from "./CalendarTab";
import AdminTabbedPanel from "../../admin/panels/AdminTabbedPanel"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




class DispatcherDashboardPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        activeTab: 'CalendarWithAllFlights'
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

                <div className={'header_panel'}>

                    <div className={this.state.activeTab === 'feed' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'feed'})}}>
                        Лента
                    </div>

                    <div className={this.state.activeTab === 'monitoring' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'monitoring'})}}>
                        Мониторинг
                    </div>

                    <div className={this.state.activeTab === 'history' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'history'})}}>
                        История полетов
                    </div>

                    <div className={this.state.activeTab === 'calendar' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'calendar'})}}>
                        Календарь
                    </div>

                    <div className={this.state.activeTab === 'CalendarWithAllFlights' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'CalendarWithAllFlights'})}}>
                        Календарь
                    </div>

                    <div className={this.state.activeTab === 'superuser' ? 'selected_tab':'unselected_tab pointer'} onClick={() => {this.setState({activeTab: 'superuser'})}}>
                        Панель администратора
                    </div>

                </div >

                {this.state.activeTab !== 'feed' ? null: <UserSessionsPanel userId={'HegpmMKJjp'} />}
                {this.state.activeTab !== 'monitoring' ? null: <MonitoringTab />}
                {this.state.activeTab !== 'history' ? null: <HistoryTab />}
                {this.state.activeTab !== 'calendar' ? null: <CalendarTab />}
                {this.state.activeTab !== 'CalendarWithAllFlights' ? null: <CalendarWithAllFlights />}
                {this.state.activeTab !== 'superuser' ? null: <AdminTabbedPanel />}

            </div>
        )
    }

}



export default DispatcherDashboardPanel