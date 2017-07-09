/**
 * Created by sabir on 22.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommonHelper = require('../../helpers/CommonHelper');

var UserSidebar = React.createClass({
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


    go: function(page){
        CommonHelper.forceTransitionTo(page);
    },

    render: function(){
        var a = this.props.activeName;

        return (
            <div style={this.componentStyle.placeholder} className={'sidebar'} >

                <div className={'link '  + ((a == 'my_page') ? ' active ' : '')}  onClick={this.go.bind(this, '/#/')} >
                    <i className={'icon home '} ></i>
                    Моя Страница
                </div>

                <div className={'link '  + ((a == 'news') ? ' active ' : '')} onClick={this.go.bind(this, '/#/news')} >
                    <i className={'icon newspaper'} ></i>
                    Новости
                </div>

                <div className={'link '  + ((a == 'friends') ? ' active ' : '')} onClick={this.go.bind(this, '/#/friends')} >
                    <i className={'icon users'} ></i>
                    Друзья
                </div>

                <div className={'link logout'} onClick={this.onLogout} >
                    <i className={'icon sign out'} ></i>
                    Выход
                </div>

            </div>
        );
    }

});

module.exports = UserSidebar;