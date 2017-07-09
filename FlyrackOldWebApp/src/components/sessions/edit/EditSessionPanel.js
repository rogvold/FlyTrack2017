/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditSessionForm = require('./EditSessionForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var EditSessionPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            sessionId: undefined,

            onSessionUpdated: function(){

            },

            onSessionDeleted: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            session: store.getSession(this.props.sessionId)
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

    onSubmit: function(data){
        data.id = this.props.sessionId;
        this.getFlux().actions.updateSession(data, function(){
            this.props.onSessionUpdated();
        }.bind(this));
    },

    onDelete: function(){
        var data = {id: this.props.sessionId};
        this.getFlux().actions.deleteSession(data, function(){
            this.props.onSessionDeleted();
        }.bind(this));
    },

    render: function(){
        var session = this.state.session;
        if (session == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <EditSessionForm
                                name={session.name}
                                description={session.description}
                                onDelete={this.onDelete}
                                onSubmit={this.onSubmit} />

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = EditSessionPanel;