/**
 * Created by sabir on 26.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var UserUpdateProfilePanel = require('./UserUpdateProfilePanel');

var UpdateUserWrapper = React.createClass({
    getDefaultProps: function () {
        return {

            userId: undefined,

            style: {

            },

            level: 100

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

        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            padding: 15,
            width: 830
        }

    },

    getContent: function () {
        return (
            <div>
                <UserUpdateProfilePanel userId={this.props.userId} />
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

                <div style={st} onClick={this.show}>
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

module.exports = UpdateUserWrapper;