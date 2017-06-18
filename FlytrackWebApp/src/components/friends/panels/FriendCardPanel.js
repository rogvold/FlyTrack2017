/**
 * Created by sabir on 18.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import UserAvatarImg from '../../users/panels/UserAvatarImg'

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import * as actions from '../../../redux/actions/UsersActions'

class FriendCardPanel extends React.Component {

    static defaultProps = {
        id: undefined
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {
        let {user, relationMap, acceptFollower, deleteLink, currentUserId, createLink} = this.props;
        let userId = this.props.id;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'card'} >

                <div className={'content'} >

                    <UserAvatarImg className="right floated mini ui image" id={user.id} />

                    <div className={'header'} >
                        {user.firstName} {user.lastName}
                    </div>

                    <div className={'meta'} >
                        {relationMap.follower == false ? null :
                            <div>
                                {relationMap.followerStatus == 'accepted' ?
                                    <span>
                                        <i className={'icon checkmark'} ></i> подписан на вас
                                        <span className={'pointer underline red ml5'} onClick={() => {
                                            deleteLink(user.id, currentUserId);
                                        }} > <i className={'icon remove'} ></i> удалить из подписчиков </span>
                                    </span> :
                                    <div>
                                        <div>
                                            Хочет подписаться на вас. Ожидает подтверждения.
                                        </div>

                                        <div>
                                            <span className={'pointer underline green'} onClick={() => {
                                                acceptFollower(user.id);
                                            }} > <i className={'icon checkmark'} ></i> подтвердить </span>
                                            |
                                            <span className={'pointer underline red'} onClick={() => {
                                                deleteLink(user.id, currentUserId);
                                            }} > <i className={'icon remove'} ></i> запретить </span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    {(relationMap.following == true && relationMap.followingStatus == 'accepted') ?
                        <div className="description">
                            Вы подписаны на новости этого пользователя.
                        </div> : null
                    }

                    {(relationMap.following == true && relationMap.followingStatus == 'new') ?
                        <div className="description">
                            Вы отправили заявку в друзья данному пользователю. Ожидание подтверждения...
                            <span className={'pointer underline ml5 red'} onClick={() => {
                                    deleteLink(currentUserId, userId);
                                }} >
                                Отменить заявку.
                            </span>
                        </div> : null
                    }

                </div>

                <div className="extra content">
                    <div className="ui two buttons">
                        {(relationMap.following == true && relationMap.followingStatus == 'accepted') ?
                            <div className="ui basic red button">Отписаться</div> : null
                        }
                        {(relationMap.following == false) ?
                            <div className="ui basic green button" onClick={() => {
                                createLink(currentUserId, userId);
                            }} >
                                <i className={'icon plus'} ></i>
                                Подписаться
                            </div> : null
                        }

                        <div className="ui basic grey button">
                            <i className={'icon plane'} ></i> Полеты
                        </div>

                    </div>
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       currentUserId: state.users.currentUserId,
       loading: state.users.loading,
       user: state.users.usersMap.get(ownProps.id),
       relationMap: FlytrackHelper.getUserRelationMap(state.users.linksMap, state.users.currentUserId, ownProps.id)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        acceptFollower: (userId) => {
            return dispatch(actions.acceptFollower(userId))
        },
       deleteLink: (creatorId, friendId) => {
            return dispatch(actions.deleteUserLinkByCreatorIdAndFriendId(creatorId, friendId))
       },
       createLink: (creatorId, friendId) => {
            return dispatch(actions.createLink({creatorId, friendId, status: 'new'}))
       }
   }
}

FriendCardPanel = connect(mapStateToProps, mapDispatchToProps)(FriendCardPanel)

export default FriendCardPanel