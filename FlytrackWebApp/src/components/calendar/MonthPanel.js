/**

 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');
var WeekRow = require('./WeekRow');

var MonthPanel = React.createClass({
    getDefaultProps: function () {
        return {
            monthTimestamp: undefined,
            selectedTimestamp: undefined,

            contentFunction: function(ttimestamp, selectedTimestamp){
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
                        X
                    </div>
                );
            },

            onDayClick: function(t){

            },

            hasTotalColumn: false

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

        },

        week: {

        }

    },

    getWeeksTimestamps: function(){
        var start = +moment(this.props.monthTimestamp).startOf('month').startOf('isoweek').startOf('day').format('x');
        var end = +moment(this.props.monthTimestamp).endOf('month').endOf('isoweek').endOf('day').format('x');
        var t = start;
        var dt = 7 * 24 * 3600 * 1000;
        var arr = [];
        while(t < end){
            arr.push(t);
            t = t + dt;
        }
        return arr;

    },

    render: function () {
        let list = this.getWeeksTimestamps();

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(t, k){
                    let key = t + '_' + k;
                    let cf = this.props.selectedContentFunction == undefined ? () => undefined : this.props.selectedContentFunction;
                    let selCont = cf(t);
                    let isSelected = (+moment(this.props.selectedTimestamp).startOf('week').startOf('day').format('x') ==
                    +moment(t).startOf('week').startOf('day').format('x'));

                    let className = 'week_placeholder ' + (((selCont != undefined) && (isSelected == true)) ? 'with_selected_content' : '');
                    return (
                        <div style={this.componentStyle.week} key={key} className={className} >
                            <WeekRow
                                contentFunction={this.props.contentFunction}
                                totalWeekContentFunction={this.props.totalWeekContentFunction}
                                selectedContentFunction={this.props.selectedContentFunction}
                                monthTimestamp={this.props.monthTimestamp}
                                weekTimestamp={t}
                                selectedTimestamp={this.props.selectedTimestamp}
                                onDayClick={this.props.onDayClick}
                                hasTotalColumn={this.props.hasTotalColumn}
                                />
                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = MonthPanel;