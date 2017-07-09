/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');
var FacebookPreloader = require('../../preloader/FacebookPreloader');

var ScrollableSessionsList = require('./ScrollableSessionsList');

var UserSessionsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            sessions: store.getUserSessions(this.props.userId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var sessions = this.getFlux().store('SessionsStore').getUserSessions(this.props.userId);
        if (sessions == undefined || sessions.length == 0){
            setTimeout(function(){
                this.getFlux().actions.loadUserSessions(this.props.userId);
            }.bind(this), 10);
        }
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            width: 560,
            margin: '0 auto'
        }
    },

    render: function(){
        var sessions = this.state.sessions;
        console.log('UserSessionsPanel: render: sessions = ', sessions);

        return (
            <div style={this.componentStyle.placeholder} >

                <ScrollableSessionsList sessions={sessions} />

                {this.state.loading == false ? null :
                    <FacebookPreloader />
                }

            </div>
        );
    }

});

module.exports = UserSessionsPanel;