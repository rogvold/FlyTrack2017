/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var SessionItem = require('./SessionItem');

var SessionsList = React.createClass({
    getDefaultProps: function () {
        return {
            sessions: []

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
        var list = this.props.sessions;

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(sess, k){
                    var key = 'sess_feed_' + sess.id + '_' + k;

                    return (
                        <SessionItem key={key}
                                     sessionId={sess.id}
                            />
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = SessionsList;