/**
 * Created by sabir on 23.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var PlaySessionPanel = require('../panels/PlaySessionPanel');

var PlaySessionWrapper = React.createClass({
    getDefaultProps: function () {
        return {

            style: {},

            level: 100,

            sessionId: undefined,

            extStyle: {

            }

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
            width: 960
        }

    },

    getContent: function () {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <PlaySessionPanel sessionId={this.props.sessionId} />
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
        var extStyle = assign({}, this.componentStyle.placeholder, this.props.extStyle);

        return (
            <div style={extStyle}>

                <div style={st} onClick={this.show} className={'play_session_wrapper'}>
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

module.exports = PlaySessionWrapper;