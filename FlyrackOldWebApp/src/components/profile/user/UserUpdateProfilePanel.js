/**
 * Created by sabir on 25.06.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserUpdateProfileForm = require('./UserUpdateProfileForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UserUpdateProfilePanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading,
            user: store.getUser(this.props.userId)
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
            position: 'relative',
            minHeight: 200
        }
    },

    onSubmit: function(data){
        var user = this.state.user;
        if (user == undefined){
            return;
        }
        data = assign({}, user, data);
        this.getFlux().actions.updateUser(data);
    },

    render: function(){
        var user = this.state.user;
        var loading = this.state.loading;
        console.log('rendering UserUpdateProfilePanel: user, loading = ', user, loading);
        if (user == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                {user == undefined ? null :
                    <UserUpdateProfileForm firstName={user.firstName} lastName={user.lastName}
                                           phone={user.phone} onSubmit={this.onSubmit}
                                           aboutMe={user.aboutMe}
                                           avatar={user.avatar}
                        />
                }

                {(user == undefined || this.state.loading == true) ?
                    <CoolPreloader /> : null
                }

            </div>
        );
    }

});

module.exports = UserUpdateProfilePanel;