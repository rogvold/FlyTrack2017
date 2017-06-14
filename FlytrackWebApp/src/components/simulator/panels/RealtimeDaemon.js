/**
 * Created by sabir on 13.06.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import * as actions from '../../../redux/actions/RealtimeActions'


class RealtimeDaemon extends React.Component {

    static defaultProps = {
        interval: 1000
    }

    static propTypes = {}

    state = {
        data: FlytrackHelper.generateRandomDataForAircrafts(this.props.currentUser, this.props.aircrafts),
        n: 0
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.initTimer();
        }, 5000);
    }

    componentWillReceiveProps() {

    }

    initTimer = () => {
        this.setState({
            data: FlytrackHelper.generateRandomDataForAircrafts(this.props.currentUser, this.props.aircrafts),
            n: 0
        });

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

                let aircrafts = this.props.aircrafts;

                let arrM = [];

                // console.log('---    >>>>     initTimer: aircrafts = ', aircrafts);

                for (let j in aircrafts){
                    let air = aircrafts[j];
                    let pts = data[j].points[n];
                    console.log('pts = ', pts);
                    // let pts = data.points;
                    pts.times = [new Date().getTime()];

                    let message = {points: pts, user: data[j].user, aircraft: data[j].aircraft, params: data[j].params};
                    // self.getFlux().actions.sendPusherMessage(channelName, message);
                    arrM.push(message);
                }

                // addMessages([message]);
                addMessages(arrM);

            }, this.props.interval);
        }
    }

    render = () => {
        let {messages} = this.props;

        return (
            <div className={'realtime_daemon'} style={{display: 'none'}} >

            </div>
        )
    }

}

let getAircraft = (state) => {
    let aircrafts = state.aircrafts.aircraftsMap.toArray().sort((a, b) => {
        return (b.timestamp - a.timestamp)
    })
    if (aircrafts.length == 0){
        return undefined;
    }
    return aircrafts[0];
}

const mapStateToProps = (state) => {
    return {
        messages: state.realtime.messagesSet.toArray(),
        currentUser: state.users.usersMap.get(state.users.currentUserId),
        aircraft: getAircraft(state),
        aircrafts: state.aircrafts.aircraftsMap.toArray().sort((a, b) => {
            return (b.timestamp - a.timestamp)
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessages: (messages) => {
            return dispatch(actions.addRealtimeMessages(messages))
        }
    }
}

RealtimeDaemon = connect(mapStateToProps, mapDispatchToProps)(RealtimeDaemon)

export default RealtimeDaemon