/**
 * Created by sabir on 09.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import * as actions from '../../../redux/actions/RealtimeActions'


class SimulatorPanel extends React.Component {

    static defaultProps = {
        interval: 1000
    }

    static propTypes = {}

    state = {
        data: FlytrackHelper.generateRandomData(),
        n: 0
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initTimer();
    }

    componentWillReceiveProps() {

    }

    initTimer = () => {
        let centerLat = 56.0996454;
        let centerLon = 36.8008261;
        let {addMessages} = this.props;
        let channelName = FlytrackHelper.getPublishChannelByLocation(centerLat, centerLon).name;
        let data = this.state.data;
        console.log('initTimer: data = ', data);

        if (this.intervalId == undefined){
            this.intervalId = setInterval(() => {
                if (this.state.started == false){
                    return;
                }
                setTimeout(() => {
                    this.setState({
                        n: this.state.n + 1
                    });
                }, 10);
                let n = this.state.n;
                let pts = data.points[n];
                console.log('pts = ', pts);
                // let pts = data.points;
                pts.times = [new Date().getTime()];

                let message = {points: pts, user: data.user, aircraft: data.aircraft, params: data.params};
                // self.getFlux().actions.sendPusherMessage(channelName, message);
                addMessages([message]);
            }, this.props.interval);
        }
    }

    render = () => {
        let {messages} = this.props;

        return (
            <div className={'simulator_panel'} >

                messages = {JSON.stringify(messages)}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
        messages: state.realtime.messagesSet.toArray()
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       addMessages: (messages) => {
            return dispatch(actions.addRealtimeMessages(messages))
       }
   }
}

SimulatorPanel = connect(mapStateToProps, mapDispatchToProps)(SimulatorPanel)

export default SimulatorPanel