/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../redux/actions/UsersActions'

import CoolPreloader from '../../../preloader/CoolPreloader'

import moment from 'moment'

import CoolModal from '../../../modals/CoolModal'

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

                <div className={'ui cards'} >

                    {users.map((u, k) => {
                        let key = 'user_' + u.id;

                        return (
                            <div className={'card pointer'} key={key} onClick={() => {
                                this.setState({
                                    selectedUserId: u.id
                                });
                            }} >

                                <div className={'content'} >
                                    <div className={'header'} >
                                        {u.firstName} {u.lastName}
                                    </div>
                                    <div className={'meta'} >
                                        {moment(u.timestamp).format('DD.MM.YYYY HH:mm')}
                                    </div>
                                    <div className={'descriptions'} >

                                    </div>
                                </div>

                            </div>
                        )

                    })}

                </div>

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
        }
   }
}

AllUsersPanel = connect(mapStateToProps, mapDispatchToProps)(AllUsersPanel)

export default AllUsersPanel