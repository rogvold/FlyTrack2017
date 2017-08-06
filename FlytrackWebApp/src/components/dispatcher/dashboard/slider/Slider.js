/**
 * Created by lesha on 30.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import InputRange from 'react-input-range';
import * as dashboardActions from '../../../../redux/actions/DashboardActions'


class Slider extends React.Component {

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
        this.interval = setInterval(() => this.moveTimestamp(), 200)
    }

    componentWillReceiveProps(){
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    moveTimestamp = () => {
        let {updateCurrentTime, currentTime, timestamp, default_dt, speed} = this.props;

        if (currentTime < timestamp || timestamp + 86400000 - 1 < currentTime) {
            currentTime = timestamp;
            default_dt = 200;
            speed = 1;

        } else {
            currentTime += default_dt * speed
        }

        if (currentTime + default_dt * speed > timestamp + 86400000 - 1) speed = 0;

        updateCurrentTime(currentTime, default_dt, speed);
        console.log('sometext', currentTime, default_dt, speed);

        // if (speed > 0 && currentTime === this.props.currentTime) this.tryToRender = false;

        // setTimeout(() => {
        //     this.moveTimestamp();
        // }, default_dt)
    }



    render = () => {
        let {updateCurrentTime, currentTime, timestamp, default_dt, speed} = this.props;
        if (typeof this.tryToRender === 'undefined') this.tryToRender = true;

        if (this.tryToRender){
            return (
                <div className={"map_slider"}>
                    <InputRange
                        minValue={timestamp}
                        maxValue={timestamp + 86400000 - 1}
                        value={currentTime}
                        formatLabel={value => ''}
                        onChange={(value) => {
                            updateCurrentTime(value, default_dt, speed)
                        }}
                    />
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        timestamp: state.dashboard.timestamp,
        currentTime: state.dashboard.currentTime,
        default_dt: state.dashboard.default_dt,
        speed: state.dashboard.speed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentTime: (currentTime, default_dt, speed) => {
            return dispatch(dashboardActions.updateCurrentTime(currentTime, default_dt, speed))
        }
    }
}

Slider = connect(mapStateToProps, mapDispatchToProps)(Slider);

export default Slider