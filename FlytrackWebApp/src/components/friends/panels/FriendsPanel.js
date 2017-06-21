/**
 * Created by sabir on 16.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import UserAvatarImg from '../../users/panels/UserAvatarImg'

import * as usersActions from '../../../redux/actions/UsersActions'
import * as searchActions from '../../../redux/actions/SearchActions'

import CoolPreloader from '../../preloader/CoolPreloader'

import FriendCardPanel from './FriendCardPanel'

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
            <div className={'users_list ui two cards'} >
                {users.map((u, k) => {
                    let key = 'user_' + k + '_' + u.id;
                    return (
                        <FriendCardPanel key={key} id={u.id} />
                    )
                })}
            </div>
        )
    }

    render = () => {
        let {friends, loading, openUsersSearchDialog} = this.props;
        console.log('FriendsPanel: render: friends = ', friends);
        let followers = friends.filter((f) => {
            return (f.follower == true)
        })
        let followings = friends.filter((f) => {
            return (f.following == true)
        })
        let {activeTab} = this.state;

        return (
            <div className={'friends_panel'} >

                <div className="ui secondary pointing menu">
                    <div className={' item ' + (activeTab == 'following' ? 'active' : 'pointer')} onClick={() => {this.setState({activeTab: 'following'})}} >
                        Друзья, за которыми я слежу
                    </div>
                    <div className={' item ' + (activeTab == 'followers' ? 'active' : 'pointer')} onClick={() => {this.setState({activeTab: 'followers'})}}  >
                        Люди, которые следят за мной
                    </div>
                </div>

                {activeTab != 'following' ? null :
                    <div className="ui segment">

                        <div className={'right'} >
                            <span className={'pointer'} onClick={() => {openUsersSearchDialog()}} >
                                <i className={'icon search'} ></i> поиск по пользователям
                            </span>
                        </div>

                        <div className={'list_placeholder'} >
                            {this.getList(followings)}
                        </div>

                    </div>
                }

                {activeTab != 'followers' ? null :
                    <div className="ui  segment">

                        {this.getList(followers)}

                    </div>
                }

                {loading == false ? null :
                    <div className={'center p10'} >загрузка...</div>
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
       },
       openUsersSearchDialog: () => {
           return dispatch(searchActions.openUsersSearchDialog())
       }
   }
}

FriendsPanel = connect(mapStateToProps, mapDispatchToProps)(FriendsPanel)

export default FriendsPanel