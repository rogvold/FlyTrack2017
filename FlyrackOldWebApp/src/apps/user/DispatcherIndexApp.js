/**
 * Created by sabir on 24.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var DispatcherPageTemplate = require('../../components/templates/user/DispatcherPageTemplate');


var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');
var DispatcherHeaderLinks = require('../../components/templates/header/DispatcherHeaderLinks');

var UserPagePanel = require('../../components/profile_page/panels/UserPagePanel');

var UserSidebar = require('../../components/sidebar/UserSidebar');
var DispatcherSidebar = require('../../components/sidebar/DispatcherSidebar');

var DispatcherIndexApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var loading = store.loading;
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        return {
            loading: loading,
            user: user
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        console.log('UserIndexApp: componentDidMount occured');
        if (user == undefined){
            try{
                this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
            }catch(ee){
                setTimeout(function(){
                    this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
                }.bind(this), 500);
            }
        }
    },

    componentStyle: {
        placeholder: {

        }
    },

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;
        console.log('DispatcherIndexApp: getContent: user, loading = ', user, loading);
        console.log('typeof loading = ', (typeof loading));

        console.log('loading == false : ', (loading == false));

        return (
            <div style={this.componentStyle.placeholder} >

                Monitoring panel


            </div>
        );
    },

    getCenterLinksContent: function(){
        var user = this.state.user;
        if (user == undefined){
            return null;
        }

        return (
            <div>
                <DispatcherHeaderLinks active={'my_page'} />
            </div>
        );
    },


    render: function(){
        var centerLinksContent = this.getCenterLinksContent();
        console.log('DispatcherIndexApp: render: this.state.loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder} >

                <DispatcherPageTemplate
                    centerLinksContent={centerLinksContent}
                    contentStyle={{width: '100%'}}
                    content={this.getContent()}
                    />

            </div>
        );
    }

});

module.exports = DispatcherIndexApp;