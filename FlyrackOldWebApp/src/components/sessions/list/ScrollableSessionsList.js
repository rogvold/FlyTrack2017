/**
 * Created by sabir on 24.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var SessionsList = require('./SessionsList');


var ScrollableSessionsList = React.createClass({
    getDefaultProps: function () {
        return {
            sessions: [],

            pageSize: 3

        }
    },

    getInitialState: function () {
        return {
            visibleNumber: this.props.pageSize
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function() {
        window.addEventListener('scroll', this.handleScroll);
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    handleScroll: function(event) {
        let scrollTop = event.srcElement.body.scrollTop;

        var body = document.body,
            html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        //console.log('scrollTop, height = ', scrollTop, height);
        if (Math.abs(height - scrollTop) < 1000){
            this.next();
        }
    },

    componentStyle: {
        placeholder: {

        }
    },

    next: function(){
        var visibleNumber = this.state.visibleNumber;
        if (visibleNumber >= this.props.sessions.length){
            return;
        }
        visibleNumber = visibleNumber + this.props.pageSize;
        this.setState({
            visibleNumber: visibleNumber
        });
    },


    render: function () {
        var scrollSessions = this.props.sessions.slice(0, this.state.visibleNumber);

        return (
            <div style={this.componentStyle.placeholder}>

                <SessionsList sessions={scrollSessions}  />

            </div>
        );
    }

});

module.exports = ScrollableSessionsList;