/**

 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var WeekRow = React.createClass({
    getDefaultProps: function () {
        return {
            monthTimestamp: undefined,
            weekTimestamp: undefined,

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

                    </div>
                );
            },

            onDayClick: function(t){

            },

            isHeader: false,

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

        daysPlaceholder: {

        },

        day: {

        }

    },

    getDaysTimestampArray: function(){
        var start = +moment(this.props.weekTimestamp).startOf('isoWeek').startOf('day').format('x');
        var t = start;
        var dt = 24 * 3600 * 1000;
        var arr = [];
        for (var i = 0; i < 7; i++){
            arr.push(t);
            t = t + dt;
        }
        return arr;
    },

    getDayContent: function(t){
        var cf = this.props.contentFunction;
        if (cf == undefined){
            return null;
        }
        return cf(t);
    },

    getTotalWeekContent: function(){
        var cf = this.props.totalWeekContentFunction;
        if (cf == undefined){
            return null;
        }
        var t = this.props.weekTimestamp;
        return cf(t);
    },

    getSelectedContent: function(){
        if (this.props.selectedTimestamp == undefined){
            return null;
        }
        var isSelected = (+moment(this.props.selectedTimestamp).startOf('week').startOf('day').format('x') ==
                          +moment(this.props.weekTimestamp).startOf('week').startOf('day').format('x'));
        if (isSelected == false){
            return null;
        }
        var cf = this.props.selectedContentFunction;
        if (cf == undefined){
            return null;
        }
        return cf(this.props.selectedTimestamp);
    },

    onDayClick: function(t){
        console.log('WeekRow: onDayClick: t = ' + t);
        this.props.onDayClick(t);
    },


    render: function () {
        var list = this.getDaysTimestampArray();
        var selectedContent = this.getSelectedContent();
        var totalWeekContent = this.getTotalWeekContent();

        //console.log('WeekRow: selectedTimestamp = ', this.props.selectedTimestamp);
        //console.log('WeekRow: selectedTimestamp = ', new Date(this.props.selectedTimestamp));

        return (
            <div style={this.componentStyle.placeholder} className={'week_row'} >

                <div style={this.componentStyle.daysPlaceholder} className={'days_placeholder'} >

                    {list.map(function(t, k){
                        var key = this.props.monthTimestamp + '_' + k + '_' + t;
                        var content = this.getDayContent(t);
                        var onClick = this.onDayClick.bind(this, t);
                        var dayClassName = 'day_placeholder';

                        var isSelected = (+moment(this.props.selectedTimestamp).startOf('day').format('x') ==
                                            +moment(t).startOf('day').format('x')) && (this.props.selectedTimestamp != undefined);

                        if (+moment(this.props.monthTimestamp).startOf('month').startOf('day').format('x') !=
                            +moment(t).startOf('month').startOf('day').format('x')){
                            dayClassName = dayClassName + ' not_this_month ';
                        }
                        var dayNumberClassName = 'dayNumber ';
                        if (+moment(new Date().getTime()).startOf('day').format('x') ==
                            +moment(t).startOf('day').format('x')){
                            dayNumberClassName = 'dayNumber today';
                        }

                        if (isSelected == true){
                            dayNumberClassName = dayNumberClassName + ' selected ';
                            dayClassName = dayClassName + ' selected ';
                        }else {
                            dayNumberClassName = dayNumberClassName + ' not_selected ';
                        }

                        return (
                            <div style={this.componentStyle.day}
                                 key={key} onClick={onClick} className={dayClassName} >
                                <div className={dayNumberClassName} >
                                    {moment(t).format('D')}
                                </div>
                                {content}
                            </div>
                        );

                    }, this)}

                    {this.props.hasTotalColumn == false ? null :
                        <div className={' week_total ' + ' day_placeholder'} >
                            {totalWeekContent}
                        </div>
                    }

                </div>

                {selectedContent == undefined ? null :
                    <div className={'selectedContent'} >
                        {selectedContent}
                    </div>
                }

            </div>
        );
    }

});

module.exports = WeekRow;