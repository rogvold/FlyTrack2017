/**
 * Created by sabir on 05.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var DataHighlightPanel = React.createClass({
    getDefaultProps: function () {
        return {

            data: {}

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

        return (
            <div style={this.componentStyle.placeholder}>

                <div dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.data, null, 4).replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;').replace(/\{/g, "<b>{</b>").replace(/\}/g, "<b>}</b>")}} ></div>

            </div>
        );
    }

});

module.exports = DataHighlightPanel;