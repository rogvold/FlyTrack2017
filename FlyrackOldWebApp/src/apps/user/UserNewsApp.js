/**
 * Created by sabir on 26.09.16.
 */


var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');

var UserPagePanel = require('../../components/profile_page/panels/UserPagePanel');

var UserSidebar = require('../../components/sidebar/UserSidebar');

var UserNewsApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'SessionsStore')],

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
        //var user = this.getFlux().store('UsersStore').getCurrentUser()

        return {
            loading: loading
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        //var user = this.getFlux().store('UsersStore').getUser(this.props.params.userId);
        //console.log('UserIndexApp: componentDidMount occured');
        //if (user == undefined){
        //    try{
        //        this.getFlux().actions.loadUser(this.props.params.userId);
        //    }catch(ee){
        //        setTimeout(function(){
        //            this.getFlux().actions.loadUser(this.props.params.userId);
        //        }.bind(this), 500);
        //    }
        //}
    },

    componentStyle: {
        placeholder: {

        }
    },

    getContent: function(){
        var user = this.state.user;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={{marginTop: 100, textAlign: 'center', fontSize: 20}} >
                    Раздел находится в разработке
                </div>

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
                <UserHeaderLinks active={'calendar'} />
            </div>
        );
    },

    getSidebar: function(){
        return (
            <UserSidebar activeName={'news'} />
        );
    },

    render: function(){
        var centerLinksContent = this.getCenterLinksContent();
        console.log('UserNewsApp: render: this.state.loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder} >

                <UserPageTemplate
                    centerLinksContent={centerLinksContent}
                    contentStyle={{width: '100%'}}
                    content={this.getContent()}
                    sidebar={this.getSidebar()}
                    />

            </div>
        );
    }

});

module.exports = UserNewsApp;