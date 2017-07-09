/**
 * Created by sabir on 21.06.16.
 */
var React = require('react');
var assign = require('object-assign');

var HeaderLinks = require('./HeaderLinks');

var ClubAdminHeaderLinks = React.createClass({
    getDefaultProps: function () {
        return {
            active: undefined
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var links = [

            //{
            //    name: 'users',
            //    displayName: 'Клиенты',
            //    icon: '',
            //    url: '/'
            //},

            {
                displayName: 'Календарь',
                name: 'calendar',
                icon: '',
                url: '/'
            },

            {
                displayName: 'Команды',
                name: 'teams',
                icon: '',
                url: '/teams'
            },

            {
                displayName: 'Тренеры',
                name: 'coaches',
                icon: '',
                url: '/coaches'
            },

            {
                displayName: 'Настройки',
                name: 'settings',
                icon: '',
                url: '/settings'
            },

            //{
            //    name: 'stats',
            //    displayName: 'Статистика',
            //    //icon: 'icon line chart',
            //    url: '/stats'
            //},

            //{
            //    displayName: 'Документация',
            //    name: 'docs',
            //    icon: '',
            //    url: '/docs'
            //},

            {
                displayName: 'Помощь',
                name: 'help',
                icon: '',
                url: '/help'
            }
        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <HeaderLinks items={links} active={this.props.active} />
            </div>
        );
    }

});

module.exports = ClubAdminHeaderLinks;