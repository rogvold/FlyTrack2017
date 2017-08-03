/**
 * Created by lesha on 06.07.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ReferenceLine} from 'recharts';

class Diagram extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    makePointsDownsampling = (points, max) => {
        if (max == undefined){
            max = 500;
        }

        if (points.alt.length <= max){
            let arr = [];
            for (let element of points.alt) {
                arr.push({'alt': element});
            }
            return arr;
        }
        var arr = [];
        var n = points.alt.length;
        console.log('makePointsDownsampling: length = ' + n);
        var startTime = points.times[0];
        var endTime = points.times[n - 1];
        var dt = 1.0 * (endTime - startTime) / max;

        var step = 1.0 * n / max;
        for (var i = 0;  i < max; i++) {
            var a = Math.ceil(step * i);
            var b = Math.floor(step * (i + 1));
            b = Math.min(b, n - 1);
            var sum = 0;
            var t = startTime + +points.times[i];
            var kk = 0;
            for (var j = a; j <= b; j++){
                sum+= +points.alt[j];
                kk++;
            }
            var avr = 1.0 * sum / kk;

            arr.push({
                t: t,
                alt: avr
            });
        }
        return arr;
    }

    render = () => {
        let {points, index} = this.props.props;
        let max = 100;
        let data = this.makePointsDownsampling(points, max);
        // else data= this.reformatJsonToArray(points, index);

        return (
            <div className="altDiagram">
                <LineChart
                    width={document.documentElement.clientWidth - (371)}
                    height={
                        Math.ceil(0.25 * document.documentElement.clientHeight) > 170 ?
                            (0.25 * document.documentElement.clientHeight) : 170
                    }
                    data = {data}
                    margin={{top: 5, right: 10, left: -14, bottom: 5}}>

                    <Line type="monotone" dataKey="alt" stroke="#8884d8" dot={false}/>
                    <XAxis />
                    <YAxis />
                    <CartesianGrid
                        strokeDasharray="3 3"/>
                    <ReferenceLine
                        x={Math.round((points.alt.length-1 > max ? (index)/(points.alt.length) * max : index) - 0.5)}
                        stroke="red"/>

                </LineChart>
            </div>
        )
    }

}

export default Diagram