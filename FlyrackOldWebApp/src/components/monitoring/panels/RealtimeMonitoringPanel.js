/**
 * Created by sabir on 24.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MapboxPanel = require('../mapbox/panels/MapboxPanel');

var moment = require('moment');

var PusherSimulationPanel = require('../pusher/PusherSimulationPanel');

var RealtimeMonitoringPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('PusherStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('PusherStore');
        var data = store.getLinesAndMarkers();
        return {
            lines: data.lines,
            markers: data.markers,
            messages: store.messages
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
            width: '100vw',
            height: '100vh'
        },

        mapPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '70%',
            height: '100%'
        },

        rightPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '30%',
            height: '100%',
            maxHeight: '100%',
            overflowY: 'auto',
            padding: 10
        }

    },

    getLastTimesArray: function(){
        var lines = this.state.lines;
        if (lines == undefined || lines.length == 0){
            return [];
        }
        var arr = [];
        for (var i in lines){
            var l = lines[i];
            var points = l.points;
            if (points == undefined || points.length == 0){
                continue;
            }
            arr.push({
                id: l.id,
                t: points[points.length - 1].t
            });
        }
        return arr;
    },

    getRealtimePilotsList: function(){

    },


    render: function(){

        var lines = this.state.lines;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.mapPlaceholder}>
                    <MapboxPanel lines={lines} markers={this.state.markers} />
                </div>

                <div style={this.componentStyle.rightPlaceholder}>



                </div>

            </div>
        );
    }

});

module.exports = RealtimeMonitoringPanel;