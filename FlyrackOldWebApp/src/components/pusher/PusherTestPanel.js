/**
 * Created by sabir on 19.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FlyTrackHelper = require('../../helpers/FlyTrackHelper');

var PusherTestPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('PusherStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('PusherStore');
        return {
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

        }
    },

    sendMessage: function(){
        var lat = 56.10313;
        var lon = 36.80168;
        var message = {
            lat: lat,
            lon: lon
        };
        var ch = FlyTrackHelper.getPublishChannelByLocation(lat, lon);

        this.getFlux().actions.sendPusherMessage(ch.name, message);
    },

    render: function(){
        var messages = this.state.messages;

        return (
            <div style={this.componentStyle.placeholder} >

                this is pusher test panel

                <div>
                    <button className={'ui primary button'} onClick={this.sendMessage} >
                        send pusher message
                    </button>
                </div>

                messages: {JSON.stringify(messages)}

            </div>
        );
    }

});

module.exports = PusherTestPanel;