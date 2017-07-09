/**
 * Created by sabir on 26.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var SabirBlock = React.createClass({
    getDefaultProps: function () {
        return {

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
        placeholder: {
            padding: 10,
            backgroundColor: 'red'
        }
    },

    render: function () {
        console.log('SabirBlock: render occured');

        return (
            <div style={this.componentStyle.placeholder}>
                this is sabir block
            </div>
        );
    }

});

module.exports = SabirBlock;