/**
 * Created by sabir on 16.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import UserAvatarImg from '../../users/panels/UserAvatarImg'

import * as usersActions from '../../../redux/actions/UsersActions'

import CoolPreloader from '../../preloader/CoolPreloader'

class FriendsPanel extends React.Component {

    static defaultProps = {
        userId: undefined
    }

    static propTypes = {}

    state = {
        activeTab: 'following'
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserUserLinks, userId} = this.props;
        loadUserUserLinks(userId);
    }

    componentWillReceiveProps() {

    }

    getList = (users) => {
        return (
            <div className={'users_list'} >
                {users.map((u, k) => {
                    let key = 'user_' + k + '_' + u.id;
                    return (
                        <div className={'user_item'} key={key} >

                            <div className={'avatar_placeholder'} >
                                <UserAvatarImg id={u.id} />
                            </div>

                            <div className={'user_info_placeholder'} >
                                <div className={'name_placeholder'} >
                                    {u.firstName} {u.lastName}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        )
    }

    render = () => {
        let {friends, loading} = this.props;
        let followers = friends.filter((f) => {
            return (f.follower == true)
        })
        let followings = friends.filter((f) => {
            return (f.following == true)
        })
        let {activeTab} = this.state;

        return (
            <div className={'friends_panel'} >

                <div className="ui top attached tabular menu">
                    <div className={' item ' + (activeTab == 'following' ? 'active' : 'pointer')} onClick={() => {this.setState({activeTab: 'following'})}} >
                        Друзья, за которыми я слежу
                    </div>
                    <div className={' item ' + (activeTab == 'followers' ? 'active' : 'pointer')}  onClick={() => {this.setState({activeTab: 'followers'})}}  >
                        Друзья, которые следят за мной
                    </div>
                </div>

                {activeTab != 'following' ? null :
                    <div className="ui bottom attached active tab segment">
                        {this.getList(followings)}
                    </div>
                }

                {activeTab != 'followers' ? null :
                    <div className="ui bottom attached active tab segment">

                        {this.getList(followers)}

                    </div>
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
        friends: FlytrackHelper.getFriendsListByLinksAndUsers(state.users.linksMap, state.users.usersMap, state.users.currentUserId),
        loading: state.users.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserUserLinks: (userId) => {
           return dispatch(usersActions.loadUserUserLinks(userId))
       }
   }
}

FriendsPanel = connect(mapStateToProps, mapDispatchToProps)(FriendsPanel)

export default FriendsPanel