/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../redux/actions/UsersActions'

import CoolPreloader from '../../../preloader/CoolPreloader'
// import UserSessionsPanel from '../../../sessions/panels/UserSessionsPanel'

import moment from 'moment'

import CoolModal from '../../../modals/CoolModal'
import CalendarTab from "../../../dispatcher/dashboard/CalendarTab";
import AircraftsPanel from "../../../aircrafts/panels/AircraftsPanel";

class AllUsersPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        selectedUserId: undefined,
        activeTab: 'calendar'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadAllUsers} = this.props;
        loadAllUsers();
    }

    componentWillReceiveProps() {

    }

    getSelectedUserComponent = () => {

    }

    getSelectedUser = () => {
        let {users} = this.props;
        let {selectedUserId} = this.state;
        if (selectedUserId == undefined){
            return undefined;
        }
        let usrs = users.filter((u) => {
            return (u.id == selectedUserId);
        })
        if (usrs == undefined || usrs.length == 0){
            return undefined;
        }
        return usrs[0];
    }

    render = () => {
        let {loading, users} = this.props;
        let {selectedUserId} = this.state;
        let selectedUser = this.getSelectedUser();

        return (
            <div className={'all_users_panel'} >


                    {users.map((u, k) => {
                        let key = 'user_' + u.id;

                        return (

                                <div className={"item pointer single_user"} key={key}
                                     onClick={() => {
                                        this.setState({selectedUserId: u.id});
                                }}>

                                    <div className="ui icon message">
                                        <i className="inbox icon"></i>
                                        <div className="content" style={{textAlign: 'left'}}>
                                            <div className="header">
                                                {u.firstName} {u.lastName}
                                            </div>
                                            <div>
                                                ID пользователя: {u.id}
                                                <br/>
                                                ID организации: {u.organizationId}
                                                <br/>
                                                E-mail: {u.email}
                                                <br/>
                                                Дата регистрации: {moment(u.timestamp).format('DD.MM.YYYY HH:mm')}
                                                <br/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                        )

                    })}

                {/*</div>*/}

                {selectedUserId == undefined ? null :

                    <CoolModal onClose={() => {
                        this.setState({
                            selectedUserId: undefined
                        });
                    }} >

                        <div className={'selected_user_panel'} >
                            {/*<div className={'header_placeholder'} >*/}
                                {/*<div className={'center p10'} >*/}
                                    {/*{selectedUser.firstName} {selectedUser.lastName}*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <div className={'allUsersTopPanel'} >

                                <div className={"panels_tabs"}>
                                    <div className={this.state.activeTab === 'calendar' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'calendar'})}}>
                                        Полеты
                                    </div>

                                    <div className={this.state.activeTab === 'aircrafts' ? 'selected_tab':'unselected_tab pointer '} onClick={() => {this.setState({activeTab: 'aircrafts'})}}>
                                        Авиасудна
                                    </div>
                                </div>

                                <div className={'user_name'}>
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </div>
                            </div >

                            {this.state.activeTab !== 'calendar' ? null: <div style={{height: '100%'}} > <CalendarTab userId={selectedUserId} /> </div>}
                            {this.state.activeTab !== 'aircrafts' ? null: <div style={{height: '100%'}} > <AircraftsPanel userId={selectedUserId} /> </div>}

                        </div>

                    </CoolModal>
                }

                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       loading: state.users.loading,
       users: state.users.usersMap.toArray().sort((a, b) => {
           return (b.timestamp - a.timestamp);
       }).filter((a) => {
           return (a.id != state.users.currentUserId)
       })
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        loadAllUsers: () => {
            return dispatch(actions.loadAllUsers())
        },
       loadOneUser: (userId) => {
            return dispatch(actions.loadOneUser(userId))
       },
   }
}

AllUsersPanel = connect(mapStateToProps, mapDispatchToProps)(AllUsersPanel)

export default AllUsersPanel