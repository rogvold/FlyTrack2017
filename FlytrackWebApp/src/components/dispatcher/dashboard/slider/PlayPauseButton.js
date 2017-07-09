/**
 * Created by lesha on 01.07.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from '../../../../redux/actions/DashboardActions'

class PlayPauseButton extends React.Component {

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
        let {currentTime, default_dt, speed} = this.props;

        return (
                <div className={"ui icon buttons"}>
                    {speed === 0 ?
                        <button
                            className={"ui compact icon button"}
                            onClick={() => {this.updateSpeed(1)}} >
                            <i className="play icon"></i>
                        </button>
                        :
                        <button
                            className={"ui compact icon button"}
                            onClick={() => {this.updateSpeed(0)}}>
                            <i className="pause icon"></i>
                        </button>}
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

PlayPauseButton = connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton)

export default PlayPauseButton