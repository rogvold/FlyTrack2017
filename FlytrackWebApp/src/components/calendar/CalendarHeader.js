/**

 */

var React = require('react');
var assign = require('object-assign');

var CalendarHeader = React.createClass({
    getDefaultProps: function () {
        return {

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

        item: {

        }
    },

    getGetFaysArray: function(){
        var list = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        if (this.props.hasTotalColumn == true){
            list.push('Неделя');
        }
        return list;
    },

    render: function () {
        var list = this.getGetFaysArray();

        return (
            <div style={this.componentStyle.placeholder} className={'calendar_header'}>

                {list.map(function(s, k){
                    var key = 's_' + k;
                    return (
                        <div style={this.componentStyle.item} key={key}
                                    className={'header_column'} >
                            {s}
                        </div>
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = CalendarHeader;