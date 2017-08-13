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

class AllUsersPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        selectedUserId: undefined
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

                {/*<div className={'ui cards'} >*/}

                {/*<div className={"ui items"}>*/}
                {users.map((u, k) => {
                    let key = 'user_' + u.id;

                    return (

                        <div className={"item pointer"} style={{'margin-bottom': '10px'}} onClick={() => {
                            this.setState({selectedUserId: u.id});
                        }}>

                            <div className="ui icon message">
                                <i className="inbox icon"></i>
                                <div className="content">
                                    <div className="header">
                                        {u.firstName} {u.lastName}
                                    </div>
                                    {/*<p>{JSON.stringify(u)}</p>*/}
                                    <div>
                                        ID пользователя: {u.id}
                                        <br/>
                                        ID организации: {u.organizationId}
                                        <br/>
                                        E-mail: {u.email}
                                        <br/>
                                        Дата регистрации:{moment(u.timestamp).format('DD.MM.YYYY HH:mm')}
                                        <br/>
                                    </div>
                                </div>
                            </div>

                            {/*<div className={"image"}>*/}
                            {/*<img style={{width:'80px', height: '80px', 'text-align': 'left'}}*/}
                            {/*className={"ui avatar image"}*/}

                            {/*</div>*/}

                            {/*<div className={"content"}>*/}
                            {/**/}

                            {/*<img class="ui tiny image circular"*/}
                            {/*src={"https://semantic-ui.com/images/wireframe/square-image.png"}/>*/}

                            {/*<a className={"header"}>{u.firstName} {u.lastName}</a>*/}
                            {/*<div className={"meta"}>*/}
                            {/*<span>Описание</span>*/}
                            {/*</div>*/}
                            {/*<div className={"description"}>*/}
                            {/*<p>test</p>*/}
                            {/*</div>*/}
                            {/*<div className={"extra"}>Additional Details </div>*/}
                            {/*</div>*/}

                            {/*</div>*/}

                            {/*<div className={'card pointer'} key={key} onClick={() => {*/}
                            {/*// this.setState({*/}
                            {/*//     selectedUserId: u.id*/}
                            {/*// });*/}
                            {/*}} >*/}

                            {/*<div className={'content'} >*/}
                            {/*КОНТЕНТ*/}
                            {/*<div className={'header'} style={{'margin-bottom': "4px"}} >*/}
                            {/*ХЕАДЕР*/}
                            {/*{u.firstName} {u.lastName}*/}
                            {/*</div>*/}


                            {/*/!*<div className={'user_sessions'} >*!/*/}
                            {/*/!*Список сессий*!/*/}
                            {/*/!*</div>*!/*/}

                            {/*/!*<div className={'user_subscibers'}>*!/*/}
                            {/*/!*Подписки*!/*/}
                            {/*/!*</div>*!/*/}

                            {/*/!*<div className={'user_subscriptions'}>*!/*/}
                            {/*/!*Подписчики*!/*/}
                            {/*/!*</div>*!/*/}


                            {/*<div className={'extra content pointer'} >*/}
                            {/*ЭКстра*/}
                            {/*<button className={'ui fluid basic button'} onClick={() => {*/}
                            {/*this.setState({*/}
                            {/*selectedUserId: u.id*/}
                            {/*});*/}
                            {/*}} >*/}
                            {/*Подробно*/}
                            {/*</button>*/}
                            {/*</div>*/}


                            {/*<div className={'meta'} style={{'text-align': 'right'}}>*/}
                            {/*{moment(u.timestamp).format('DD.MM.YYYY HH:mm')}*/}
                            {/*</div>*/}


                            {/*</div>*/}
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
                            <div className={'header_placeholder'} >
                                <div className={'center p10'} >
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </div>
                            </div>

                            <div className={'content_placeholder'} >
                                <CalendarTab userId={selectedUserId}/>
                            </div>

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