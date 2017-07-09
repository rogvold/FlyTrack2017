/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var MapboxPanel = require('../../mapbox/panels/MapboxPanel');

var AirSessionMapboxPanel = React.createClass({
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
            session: store.getSession(this.props.sessionId),
            points: store.getSessionPoints(this.props.sessionId)
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
            height: '100%',
            width: '100%'
        },

        mapPlaceholder: {
            width: '100%',
            height: '100%'
        }

    },

    render: function(){
        var points = this.state.points;
        var session = this.state.session;
        if (session == undefined){
            return null;
        }
        var lines = [{
            id: session.id,
            points: points
        }];

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.mapPlaceholder}>
                    <MapboxPanel lines={lines} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = AirSessionMapboxPanel;