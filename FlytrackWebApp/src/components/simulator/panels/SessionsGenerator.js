/**
 * Created by sabir on 20.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlytrackHelper from '../../../helpers/FlytrackHelper'

import * as actions from '../../../redux/actions/SessionsActions'

class SessionsGenerator extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    saveSomePoints = () => {
        let points = FlytrackHelper.getRandomPoints();
        // points = points.slice(0, 400);
        points = points.slice(0, 100);
        // points = points.slice(0, 50);
        let {user, aircrafts, savePoints} = this.props;
        if (aircrafts.length == 0){
            return null;
        }
        let aircraft = aircrafts[0];
        let data = {
            startTimestamp: +new Date() -  2 * 86400000 * Math.random(),
            aircraftId: aircraft.id,
            userId: user.id,
            points: points
        }
        savePoints(data);
    }

    render = () => {
        let {user, aircrafts, loading} = this.props;
        if (aircrafts.length == 0){
            return null;
        }
        let aircraft = aircrafts[0];

        return (
            <div className={'sessions_generator'} >

                <button className={'ui button'} onClick={() => {
                    this.saveSomePoints();
                }} >
                    <i className={'icon upload'} ></i> save random points
                </button>

                {loading == false ? null :
                    <div>
                        loading...
                    </div>
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
        aircrafts: state.aircrafts.aircraftsMap.toArray().filter((a) => {
            return (a.userId == state.users.currentUserId)
        }),
        user: state.users.usersMap.get(state.users.currentUserId),
       loading: state.sessions.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
        savePoints: (data) => {
            return dispatch(actions.saveSessionPoints(data))
        }
   }
}

SessionsGenerator = connect(mapStateToProps, mapDispatchToProps)(SessionsGenerator)

export default SessionsGenerator