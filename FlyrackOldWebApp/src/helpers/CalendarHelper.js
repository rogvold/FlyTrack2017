/**
 * Created by sabir on 11.07.16.
 */

var moment = require('moment');
var assign = require('object-assign');

var CalendarHelper = {

    getDaysFromSessions: function(sessions){

        if (sessions == undefined){
            sessions = [];
        }
        var arr = [];
        var daysMap = {};
        for (var i in sessions){
            var session = sessions[i];
            var start = +moment(session.start).startOf('day').format('x');
            var key = start + '';
            if (daysMap[key] == undefined){
                daysMap[key] = {
                    start: start,
                    sessions: []
                }
            }
            daysMap[key].sessions.push(session);
        }

        var res = [];
        for (var key in daysMap){
            res.push(daysMap[key]);
        }
        res.sort(function(d1, d2){return d2.start - d1.start;});

        console.log('getDaysFromSessions: returning ', res);

        return res;
    },

    getCalendarDaysFromSessions: function(monthTimestamp, sessions){
        var days = this.getDaysFromSessions(sessions);
        var arr = [];
        var map = {};
        var k = 0;
        for (var i in days){
            var d = days[i];
            var t = moment(d.start).startOf('day').format('x');
            var tS = '' + t;
            map[tS] = d;
        }

        var start = +moment(monthTimestamp).startOf('month').startOf('isoweek').format('x');
        var end = +moment(monthTimestamp).endOf('month').endOf('isoweek').format('x');

        while (+start < +end){
            var sT = start + '';
            if (map[sT] == undefined){
                arr.push({
                    isVoid: true,
                    start: start,
                    sessions: []
                });
            }else {
                arr.push(assign({}, map[sT], {isVoid: false}));
            }
            start = +start + 24 * 60 * 60 * 1000;
        }
        console.log('getCalendarDaysFromSessions: returning arr =  ', arr);
        return arr;
    },

    getWeeksForCalendarFromSessions: function(monthTimestamp, sessions){
        var days = this.getCalendarDaysFromSessions(monthTimestamp, sessions);
        console.log('getWeeksForCalendarFromSessions: days = ', days);
        var weeks = [];
        var n = Math.ceil(days.length / 7.0);
        for (var i = 0; i < n; i++){
            weeks.push({
                number: i,
                days: days.slice(i * 7, (i + 1) * 7)
            });
        }
        return weeks;
    },

    getMonthRuName: function(timestamp){
        var key = moment(timestamp).format('MMMM').toLowerCase();
        var map = {
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
        };
        return map[key];
    },

    getTimePartString: function(x){
        if (x < 10){
            return ('0' + x);
        }
        return x;
    },

    getDurationString: function(dur){
        if (dur == undefined){
            return '0 min';
        }
        dur = Math.floor(dur / 60000.0);
        var minutes = dur % 60;
        var hours = Math.floor(dur / 60.0);
        var dur = this.getTimePartString(hours) + ':' + this.getTimePartString(minutes);
        return dur;
    },

};

module.exports = CalendarHelper;

