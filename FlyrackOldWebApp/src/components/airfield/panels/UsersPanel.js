/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var UsersPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationsStore')],
    getDefaultProps: function(){
        return {
            airfieldId: undefined,

            onUserClick: function(user){

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationsStore');
        var org = store.getOrganization(this.props.airfieldId)
        var users = (org == undefined) ? [] : org.users;
        if (users == undefined){
            users = [];
        }
        return {
            loading: store.loading,
            organization: org,
            users: users
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){
        var users = this.state.users;

        return (
            <div style={this.componentStyle.placeholder} className={'users_list'} >

                {users.map(function(user, k){
                    var key = 'li_users_' + user.id + '_' + k;
                    var onClick = this.props.onUserClick.bind(this, user);

                    return (
                        <div className={'user_item'} key={key} onClick={onClick} >

                            <div className={'user_avatar'} >
                                <BackgroundImageContainer style={{borderRadius: 1000}} />
                            </div>

                            <div className={'user_name'} >
                                {user.firstName} {user.lastName}
                            </div>

                        </div>
                    );


                }, this)}

            </div>
        );
    }

});

module.exports = UsersPanel;