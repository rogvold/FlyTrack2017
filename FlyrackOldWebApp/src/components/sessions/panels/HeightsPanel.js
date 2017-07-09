/**
 * Created by sabir on 23.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var HeightsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            sessionId: undefined,

            //number: 700
            //number: 600,
            number: 300,
            //number: 1200,

            activeTime: 0,

            onTimeChange: function(t){
                console.log('onTimeChange: t = ' + t);
            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            points: store.getSessionPoints(this.props.sessionId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%',
            position: 'relative'
        }

    },

    getTicks: function(){
        var arr = [];

        var points = this.state.points;


        if (points == undefined || points.length == 0){
            return [];
        }

        var d = points[points.length - 1].t - points[0].t;

        //console.log(' d = ', d);

        var dt = d * 1.0 / this.props.number;

        //console.log('dt = ', dt);

        var t0 = points[0].t;
        for (var i = 0; i < this.props.number; i++){
            var t = t0 + i * dt;
            arr.push({
                t: t,
                from: t,
                to: t + dt,
                points: [],
                val: 0
            });
        }

        //console.log('arr = ', arr);

        for (var i in points){
            var p = points[i];
            var t = +p.t;
            //console.log('t = ' + t, new Date(t));

            for (var j in arr){
                var from = +arr[j].from;
                var to = +arr[j].to;
                if (t >= from && t < to){
                    arr[j].points.push(p);
                }
            }
        }



        for (var i in arr){
            var pts = arr[i].points;
            if (i > 0){
                if (pts.length == 0){
                    arr[i].val = arr[i-1].val;
                }
            }
            for (var j in pts){
                var alt = (pts[j].alt == undefined) ? 0 : +pts[j].alt;
                arr[i].val = arr[i].val + alt;
            }
            if (pts.length > 0){

                arr[i].val = arr[i].val * 1.0 / pts.length;
            }
        }

        return arr;
    },

    onMouseOver: function(tick){
        this.props.onTimeChange(tick.t);
    },

    onClick: function(tick){
        this.props.onTimeChange(tick.t);
    },

    render: function(){
        var points = this.state.points;
        var ticks = this.getTicks();
        var maxVal = 0;
        var minVal = 1000000;
        for (var i in ticks){
            if (ticks[i].val > maxVal){
                maxVal = ticks[i].val;
            }
            if (ticks[i].val < minVal){
                minVal = ticks[i].val;
            }
        }
        if (maxVal == 0){
            maxVal = 1;
            minVal = 0;
        }

        //console.log('maxVal, minVal = ', maxVal, minVal);

        ticks = ticks.map(function(p){var a = assign({}, p, {val: p.val - minVal}); return a; });
        maxVal = +maxVal - +minVal;
        //if (maxVal = 0){
        //    maxVal = 1;
        //}
        if (maxVal < 0){
            maxVal = 1;
        }


        var dPercent = 100.0 / this.props.number;

        var st = {
            position: 'absolute',
            bottom: 0,
            width: dPercent + '%'
        };

        //console.log('HeightsPanel: points = ', points);
        //console.log('HeightsPanel: ticks = ', ticks);


        return (
            <div style={this.componentStyle.placeholder} className={'heights_panel'} >

                <div className={'ground_layer'} >
                    <div className={'inner'} >
                        {ticks.map(function(tick, k){
                            var key = 'tick_' + k;
                            var h = (100.0 * tick.val / maxVal) + '%';
                            var s = assign({}, st, {left: dPercent * k + '%'});
                            s = assign({}, s, {height: h});

                            return (
                                <div className={'height_tick'} style={s} key={key} >

                                </div>
                            );

                        }, this)}
                    </div>
                </div>

                <div className={'main_layer'} >
                    <div className={'inner'} >
                        {ticks.map(function(tick, k){
                            var key = 'tick_g_' + k;
                            var h = '100%';
                            var s = assign({}, st, {left: dPercent * k + '%'});
                            s = assign({}, s, {height: h});
                            var onMouseOver = this.onMouseOver.bind(this, tick);
                            var onClick = this.onClick.bind(this, tick);
                            var isActive = (this.props.activeTime >= tick.from && this.props.activeTime < tick.to);

                            return (
                                <div className={'height_tick ' + (isActive == true ? ' active ' : '' )} style={s} key={key}
                                     onClick={onClick}
                                     onMouseOver={onMouseOver} >

                                </div>
                            );

                        }, this)}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = HeightsPanel;