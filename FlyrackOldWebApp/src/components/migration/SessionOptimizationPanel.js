/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ParseAPI = require('../../api/ParseAPI');

var CoolPreloader = require('../preloader/CoolPreloader');

var SessionUptimizationPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            startTimestamp: undefined,
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {

        }
    },

    getInitialState: function(){
        return {
            loading: false
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

    makeIt: function(){
        this.setState({
            loading: true
        });
        ParseAPI.runCloudFunction('finishSessionAndCleanCachePoints', {startTimestamp: this.props.startTimestamp, userId: this.props.userId}, function(session){
            this.setState({
                session: session,
                loading: false
            });

        }.bind(this), function(err){
            this.setState({
                error: err,
                loading: false
            });
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <button className={'ui negative mini button'} onClick={this.makeIt} >
                    optimize it
                </button>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = SessionUptimizationPanel;