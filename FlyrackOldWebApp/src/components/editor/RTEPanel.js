/**
 * Created by sabir on 26.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var RichTextEditor = require('react-rte');

var RTEPanel = React.createClass({
    getDefaultProps: function () {
        return {}
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

        return (
            <div style={this.componentStyle.placeholder}>

            </div>
        );
    }

});

module.exports = RTEPanel;