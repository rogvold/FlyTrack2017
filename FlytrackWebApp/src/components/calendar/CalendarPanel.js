/**

 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');
var MonthPanel = require('./MonthPanel');
var CalendarHeader = require('./CalendarHeader');
var MonthSwitcher = require('./MonthSwitcher');

var CalendarPanel = React.createClass({
    getDefaultProps: function () {
        return {

            selectedTimestamp: undefined,

            contentFunction: function(timestamp, selectedTimestamp){
                if (timestamp == selectedTimestamp){
                    return (
                        <div>
                            selected
                        </div>
                    );
                }
                return (
                    <div>

                    </div>
                );
            },

            totalWeekContentFunction: function(t){
                return (
                    <div>

                    </div>
                );
            },

            selectedContentFunction: function(selectedTimestamp){
                return (
                    <div>

                    </div>
                );
            },

            onDayClick: function(t){
                console.log('onDayClick: ', t);
            },

            className: 'my_calendar',

            hasTotalColumn: false

        }
    },

    getInitialState: function () {
        return {
            //monthTimestamp: undefined
            monthTimestamp: this.props.selectedTimestamp
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            monthTimestamp: nextProps.selectedTimestamp
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        monthPlaceholder: {

        },

        headerPlaceholder: {

        },

        switcherPlaceholder: {

        }

    },


    onMonthChange: function(t){
        this.setState({
            monthTimestamp: t
        });
    },


    render: function () {
        var className = this.props.className;
        if (this.props.hasTotalColumn == true){
            className = className + ' has_total_week';
        }

        return (
            <div style={this.componentStyle.placeholder} className={className}>

                <MonthSwitcher monthTimestamp={this.state.monthTimestamp} onChange={this.onMonthChange} />

                <div style={this.componentStyle.headerPlaceholder} className={'calendar_header_placeholder'} >
                    <CalendarHeader hasTotalColumn={this.props.hasTotalColumn} />
                </div>

                <div style={this.componentStyle.monthPlaceholder} className={'month_placeholder'} >
                    <MonthPanel monthTimestamp={this.state.monthTimestamp}
                                selectedTimestamp={this.props.selectedTimestamp}
                                contentFunction={this.props.contentFunction}
                                totalWeekContentFunction={this.props.totalWeekContentFunction}
                                selectedContentFunction={this.props.selectedContentFunction}
                                onDayClick={this.props.onDayClick}
                                hasTotalColumn={this.props.hasTotalColumn}
                        />
                </div>

            </div>
        );
    }

});

module.exports = CalendarPanel;