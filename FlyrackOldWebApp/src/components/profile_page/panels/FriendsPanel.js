/**
 * Created by sabir on 23.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var FriendsPanel = React.createClass({
    getDefaultProps: function () {
        return {
            friends: [
                {
                    id: 'sdfasdfasdf',
                    firstName: 'Антон',
                    lastName: 'Даньшин',
                    avatar: undefined
                },
                {
                    id: 'freasdfasdf',
                    firstName: 'Сабир',
                    lastName: 'Shaykhlislamov',
                    avatar: 'https://avatars3.githubusercontent.com/u/1834389?v=3&s=466'
                },
                {
                    id: 'zassqdfsdg',
                    firstName: 'Настя',
                    lastName: 'Соболева',
                    avatar: 'http://www.cardiomood.com/assets/images/nastya.jpg'
                },
                {
                    id: 'zassdfsdg',
                    firstName: 'Алексей',
                    lastName: 'Запара',
                    avatar: 'https://pp.vk.me/c627326/v627326916/31015/fMAPeAkmYkw.jpg'
                },
                {
                    id: 'zass9dfsdg',
                    firstName: 'Константин',
                    lastName: 'Апыхтин',
                    avatar: 'http://www.cardiomood.com/assets/images/apyht.jpg'
                },
                {
                    id: 'opi0998ef',
                    firstName: 'Дамир',
                    lastName: 'Shaykhlislamov'
                }
            ],

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

    getList: function(){
        var arr = [];
        var list = this.props.friends;
        list = list.slice(0, 6);
        return (
            list.map(function(f, k){
                var key = 'friend_' + k;
                var avatar = (f.avatar == undefined) ? this.props.defaultAvatar : f.avatar;

                return (
                    <div className={'friend'} key={key} >
                        <div className={'avatar_placeholder'} >
                            <div className={'avatar'} >
                                <BackgroundImageContainer image={avatar} style={{borderRadius: 1000}} />
                            </div>
                        </div>
                        <div className={'name_placeholder'} >
                            {f.firstName}
                        </div>
                    </div>
                );

            }, this)
        );
    },

    render: function () {
        var friends = this.props.friends;
        var noFriends = (friends.length == 0);

        return (
            <div style={this.componentStyle.placeholder} className={'friends_panel'} >

                <div className={'friends_header'} >
                    Друзья <span className={'friends_number'} >{friends.length}</span>
                </div>

                {noFriends == false ?
                    <div className={'friends_list'} >
                        {this.getList()}
                    </div>
                    :
                    <div className={'no_friends_placeholder'} >
                        Нет друзей
                    </div>
                }

            </div>
        );
    }

});

module.exports = FriendsPanel;