/**
 * Created by sabir on 28.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../preloader/CoolPreloader');

var SpaceSessionViewPanel = require('./SpaceSessionViewPanel');

var SpaceSessionPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            sessionId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            points: store.getSessionPoints(this.props.sessionId),
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
        this.getFlux().actions.loadSessionPoints(this.props.sessionId);
    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){
        var points = this.state.points;
        var session = this.state.session;

        console.log('SpaceSessionPanel: render: session, points = ', session, points);

        if (points.length == 0){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                {points.length == 0 ? null :
                    <SpaceSessionViewPanel points={points} startTimestamp={session.startTimestamp} />
                }

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = SpaceSessionPanel;