/**
 * Created by sabir on 22.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var UserSessionsPanel = require('../../sessions/list/UserSessionsPanel');
var moment = require('moment');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var FriendsPanel = require('./FriendsPanel');
var PhotosPanel = require('./PhotosPanel');

var UpdateUserWrapper = require('../../profile/user/UpdateUserWrapper');

var UserPagePanel = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {
            user: undefined,

            defaultAvatar: 'assets/images/empty_ava_pilot.jpg'

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },



    componentStyle: {
        placeholder: {

        }
    },

    isMe: function(){
        if (this.props.user == undefined){
            return false;
        }
        var store = this.getFlux().store('UsersStore');
        return store.isMe(this.props.user.id);
    },

    render: function () {
        var user = this.props.user;
        if (user == undefined){
            return null;
        }
        var avatar = (user.avatar == undefined) ? this.props.defaultAvatar : user.avatar;
        var isMe = this.isMe();

        return (
            <div style={this.componentStyle.placeholder} className={'user_home_page'} >

                <div className={'left_part'} >
                    <div className={'avatar_section'} >
                        <div className={'avatar_placeholder'} >
                            <img src={avatar} />
                        </div>

                        {isMe == false ? null :
                            <div className={'edit_user_button_placeholder'} >
                                <UpdateUserWrapper
                                    style={{display: 'block'}}
                                    userId={user.id}>
                                    <div className={'update_profile_button'} >
                                        Редактировать
                                    </div>
                                </UpdateUserWrapper>
                            </div>
                        }

                    </div>

                    <div className={'friends_panel_placeholder'} >
                        <FriendsPanel />
                    </div>

                </div>

                <div className={'right_part'} >

                    <div className={'user_info_block'} >
                        <div className={'user_name'} >
                            {user.firstName} {user.lastName}
                        </div>

                        <div className={'user_details'} >
                            
                            {user.organization == undefined ? null :
                                <div className={'detail_row'} >
                                    <div className={'detail_name'} >
                                        Аэродром
                                    </div>
                                    <div className={'detail_value'} >
                                        {user.organization.name} ({user.organization.code})
                                    </div>
                                </div>
                            }

                            <div className={'detail_row'} >
                                <div className={'detail_name'} >
                                    Дата регистрации
                                </div>
                                <div className={'detail_value'} >
                                    {moment(user.timestamp).format('DD MMMM YYYY')}
                                </div>
                            </div>

                            {user.aboutMe == undefined ? null :
                                <div className={'detail_row'} >
                                    <div className={'detail_name'} >
                                        Обо мне
                                    </div>
                                    <div className={'detail_value'} >
                                        <div dangerouslySetInnerHTML={{__html: user.aboutMe.replace(/\n/g, '<br/>')}} ></div>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                    <div className={'photos_panel_placeholder'}>
                        <PhotosPanel userId={user.id} />
                    </div>

                    <div className={'sessions_placeholder'} >
                        <UserSessionsPanel userId={user.id} />
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = UserPagePanel;