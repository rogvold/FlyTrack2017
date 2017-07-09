/**
 * Created by sabir on 24.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var RealtomePilotsLost = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('PusherStore')],
    getDefaultProps: function(){
        return {

            onAircraftClick: function(a){
                console.log('onAircraftClick: a = ', a);
            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('PusherStore');
        return {
            aircrafts: store.getAircrafts()
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

    onClick: function(a){
        this.props.onAircraftClick(a);
    },

    render: function(){
        var aircrafts = this.state.aircrafts;

        return (

            <div style={this.componentStyle.placeholder} className={'realtime_aircrafts_list'} >

                {aircrafts.map(function(a, k){
                    var key = 'realtime_air_' + k + '_' + a.id;
                    var onClick = this.onClick.bind(this, a);

                    return (
                        <div className={'aircraft'} key={key} onClick={onClick} >

                        </div>
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = RealtomePilotsLost;