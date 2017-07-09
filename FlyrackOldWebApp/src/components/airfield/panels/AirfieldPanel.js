/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UsersPanel = require('./UsersPanel');

var AirfieldPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OrganizationsStore')],
    getDefaultProps: function(){
        return {
            airfieldId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('OrganizationsStore');
        return {
            loading: store.loading,
            organization: store.getOrganizations(this.props.airfieldId)
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
        var org = this.state.organization;
        if (org == undefined){
            return null;
        }
        var users = (org.users == undefined) ? [] : org.users;


        return (
            <div style={this.componentStyle.placeholder} className={'organization_panel'} >

                <div className={'organization_info_placeholder'} >

                </div>

                <div className={'users_placeholder'} >
                    <UsersPanel airfieldId={this.props.airfieldId} />
                </div>

            </div>
        );
    }

});

module.exports = AirfieldPanel;