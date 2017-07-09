/**
 * Created by sabir on 24.09.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DispatcherSidebar = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            activeName: undefined

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
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

        }
    },

    onLogout: function(){
        this.getFlux().actions.logOut();
    },

    render: function(){
        var a = this.props.activeName;

        return (
            <div style={this.componentStyle.placeholder} className={'sidebar'} >

                <div className={'link '  + ((a == 'my_page') ? ' active ' : '')} >
                    <i className={'icon home '} ></i>
                    Мониторинг
                </div>

                <div className={'link '  + ((a == 'debriefing') ? ' active ' : '')} >
                    <i className={'icon calendar'} ></i>
                    Разбор полетов
                </div>

                <div className={'link '  + ((a == 'friends') ? ' active ' : '')} >
                    <i className={'icon gears'} ></i>
                    Настройки
                </div>

                <div className={'link logout'} onClick={this.onLogout} >
                    <i className={'icon sign out'} ></i>
                    Выход
                </div>

            </div>
        );
    }

});

module.exports = DispatcherSidebar;