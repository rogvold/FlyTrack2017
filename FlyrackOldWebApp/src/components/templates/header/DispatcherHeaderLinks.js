/**
 * Created by sabir on 24.09.16.
 */
var React = require('react');
var assign = require('object-assign');

var HeaderLinks = require('./HeaderLinks');

var DispatcherHeaderLinks = React.createClass({
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
        var links = [{
            name: 'my_page',
            displayName: 'Мониторинг',
            icon: '',
            url: '/'
        },

            {
                displayName: 'Разбор полетов',
                name: 'debriefing',
                icon: '',
                url: '/debriefing'
            },

            {
                displayName: 'Настройки',
                name: 'settings',
                icon: '',
                url: '/settings'
            }

            //{
            //    displayName: 'Помощь',
            //    name: 'docs',
            //    icon: '',
            //    url: '/docs'
            //}

        ];

        return (
            <div style={this.componentStyle.placeholder}>
                <HeaderLinks items={links} active={this.props.active} />
            </div>
        );
    }

});

module.exports = DispatcherHeaderLinks;