/**
 * Created by sabir on 25.09.16.
 */
var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var EditSessionPanel = require('./EditSessionPanel');

var EditSessionWrapper = React.createClass({
    getDefaultProps: function () {
        return {

            style: {},

            level: 100,

            sessionId: undefined

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 720,
            padding: 10
        }

    },

    getContent: function () {
        return (
            <div>
                <EditSessionPanel
                    onSessionUpdated={this.onClose}
                    onSessionDeleted={this.onClose}
                    sessionId={this.props.sessionId} />
            </div>
        );
    },

    onClose: function () {
        this.setState({
            dialogVisible: false
        });
    },

    show: function () {
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={st} onClick={this.show} >
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={content} level={this.props.level} onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = EditSessionWrapper;