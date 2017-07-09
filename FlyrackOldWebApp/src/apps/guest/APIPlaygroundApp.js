/**
 * Created by sabir on 06.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var UserPageTemplate = require('../../components/templates/user/UserPageTemplate');
var UserHeaderLinks = require('../../components/templates/header/UserHeaderLinks');

var LoadAllOrganizationsComponent = require('../../components/api_playground/LoadAllOrganizationsComponent');
var LoadUserAircraftsComponent = require('../../components/api_playground/LoadUserAircraftsComponent');
var DeleteAircraftComponent = require('../../components/api_playground/DeleteAircraftComponent');
var UpdateAircraftComponent = require('../../components/api_playground/UpdateAircraftComponent');
var CreateAircraftComponent = require('../../components/api_playground/CreateAircraftComponent');
var UpdateUserComponent = require('../../components/api_playground/UpdateUserComponent');
var LoadUserSessionsComponent = require('../../components/api_playground/LoadUserSessionsComponent');
var LoadSessionPointsComponent = require('../../components/api_playground/LoadSessionPointsComponent');
var SavePointsComponent = require('../../components/api_playground/SavePointsComponent');

var APIPlaygroundApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {
            loading: false
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

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={{paddingBottom: 20}} >

                    <h3 style={{textAlign: 'center', marginTop: 20}} >
                        API Playground
                    </h3>

                    <LoadAllOrganizationsComponent />

                    <LoadUserAircraftsComponent />

                    <CreateAircraftComponent />

                    <UpdateAircraftComponent />

                    <DeleteAircraftComponent />

                    <UpdateUserComponent />

                    <LoadUserSessionsComponent />

                    <LoadSessionPointsComponent />

                    <SavePointsComponent />

                </div>



                {this.state.loading ?
                    <CoolPreloader /> : null
                }


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

    render: function(){
        var centerLinksContent = this.getCenterLinksContent();
        console.log('UserIndexApp: render: this.state.loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder} >

                {this.getContent()}

            </div>
        );
    }

});

module.exports = APIPlaygroundApp;