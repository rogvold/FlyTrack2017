/**

 */

var React = require('react');
var assign = require('object-assign');

var moment = require('moment');

var MonthSwitcher = React.createClass({
    getDefaultProps: function () {
        return {
            monthTimestamp: undefined,

            onChange: function(){

            },

            futureEnabled: false

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

        }
    },

    onBack: function(){
        var t = this.props.monthTimestamp;
        t = +moment(t).startOf('month').startOf('day').format('x') - 1000;
        t = +moment(t).startOf('month').startOf('day').format('x');
        this.props.onChange(t);
    },

    onNext: function(){
        if (this.props.futureEnabled == false && (this.isCurrentMonth() == true)){
            return;
        }
        var t = this.props.monthTimestamp;
        t = +moment(t).endOf('month').endOf('day').format('x') + 1000;
        t = +moment(t).startOf('month').startOf('day').format('x');
        this.props.onChange(t);
    },

    getRuMonth: function(){
        var m = moment(this.props.monthTimestamp).format('MMMM');
        return {
            'january': 'Январь',
            'february': 'Февраль',
            'march': 'Март',
            'april': 'Апрель',
            'may': 'Май',
            'june': 'Июнь',
            'july': 'Июль',
            'august': 'Август',
            'september': 'Сентябрь',
            'october': 'Октябрь',
            'november': 'Ноябрь',
            'december': 'Декабрь'
        }[m.toLowerCase()];
    },

    isCurrentMonth: function(){
        var currStart = +moment(new Date().getTime()).startOf('month').startOf('day').format('x');
        var start = +moment(this.props.monthTimestamp).startOf('month').startOf('dat').format('x');
        return (start == currStart);
    },

    render: function () {
        var isCurrentMonth = this.isCurrentMonth();

        return (
            <div style={this.componentStyle.placeholder} className={'month_switcher_placeholder ' + (isCurrentMonth == true ? ' current_month ' : '')} >

                <div className={'back_placeholder'} >
                    <i className={'icon chevron left'} onClick={this.onBack} ></i>
                </div>

                <div className={'month_name_placeholder'} >
                    <div className={'month'} >
                        {this.getRuMonth()}
                    </div>
                    <div className={'year'} >
                        {moment(this.props.monthTimestamp).format('YYYY')}
                    </div>
                </div>

                <div className={'next_placeholder'} >
                    <i className={'icon chevron right'} onClick={this.onNext} ></i>
                </div>


            </div>
        );
    }

});

module.exports = MonthSwitcher;