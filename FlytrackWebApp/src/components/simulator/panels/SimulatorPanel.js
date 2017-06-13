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

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {

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

   }
}

SimulatorPanel = connect(mapStateToProps, mapDispatchToProps)(SimulatorPanel)

export default SimulatorPanel