/**
 * Created by sabir on 22.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var FLytrackHelper = require('../../helpers/FlyTrackHelper');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PusherSimulationPanel = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {


            interval: 1500
        }
    },

    getInitialState: function () {
        return {
            data: FLytrackHelper.generateRandomData(),
            n: 0,
            started: false
        }
    },

    initTimer: function(){
        var centerLat = 56.0996454;
        var centerLon = 36.8008261;
        var channelName = FLytrackHelper.getPublishChannelByLocation(centerLat, centerLon).name;

        var self = this;
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                if (self.state.started == false){
                    return;
                }
                setTimeout(function(){
                    self.setState({
                        n: self.state.n + 1
                    });
                }, 10);
                var data = this.state.data;
                var n = this.state.n;
                var pts = data.points[n];
                pts.times = [new Date().getTime()];

                var message = {points: pts, user: data.user, aircraft: data.aircraft, params: data.params};
                self.getFlux().actions.sendPusherMessage(channelName, message);
            }.bind(this), this.props.interval);
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initTimer();
    },

    componentWillUnmount: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button onClick={this.setState.bind(this, {started: true})} className={'ui primary button'} >
                    start simulation
                </button>

                {this.state.n}

            </div>
        );
    }

});

module.exports = PusherSimulationPanel;