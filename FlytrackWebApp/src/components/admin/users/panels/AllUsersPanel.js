/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../../redux/actions/UsersActions'

import CoolPreloader from '../../../preloader/CoolPreloader'

import moment from 'moment'

class AllUsersPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

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

    render = () => {
        let {loading, users} = this.props;

        return (
            <div className={'all_users_panel'} >

                <div className={'ui cards'} >

                    {users.map((u, k) => {
                        let key = 'user_' + u.id;


                        return (
                            <div className={'card'} key={key} >
                                <div className={'content'} >
                                    <div className={'header'} >
                                        {u.firstName} {u.lastName}
                                    </div>
                                </div>
                            </div>
                        )

                    })}

                </div>

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