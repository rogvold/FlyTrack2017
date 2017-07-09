/**
 * Created by lesha on 01.07.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from '../../../../redux/actions/DashboardActions'

class SpeedButtons extends React.Component {

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

    updateSpeed = (speed) => {
        let {updateCurrentTime, currentTime, default_dt} = this.props;
        updateCurrentTime(currentTime, default_dt, speed)

    }

    render = () => {
        let {speed} = this.props;

        return (
            <div className="map_buttons">
                <div className={"ui icon buttons"}>
                    <button className={'mini ui button ' + (speed == 1 ? 'active' : '')}   onClick={() => {this.updateSpeed(1)}}>x1</button>
                    <button className={'mini ui button ' + (speed == 10 ? 'active' : '')}  onClick={() => {this.updateSpeed(10)}}>x10</button>
                    <button className={'mini ui button ' + (speed == 50 ? 'active' : '')}  onClick={() => {this.updateSpeed(50)}}>x50</button>
                    <button className={'mini ui button ' + (speed == 100 ? 'active' : '')} onClick={() => {this.updateSpeed(100)}}>x100</button>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
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

SpeedButtons = connect(mapStateToProps, mapDispatchToProps)(SpeedButtons)

export default SpeedButtons