/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var PilotsListPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading
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
            position: 'relative'

        }
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >



                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = PilotsListPanel;