/**
 * Created by sabir on 09.06.17.
 */
/**
 * Created by sabir on 21.02.17.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import LeftSidebarTemplate from '../template/LeftSidebarTemplate'

import SimulatorPanel from '../simulator/panels/SimulatorPanel'

class SimulatorApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object.isRequired
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



    getContent = () => {
        var user = this.props.currentUser;
        if (user == undefined){
            return null;
        }

        return (
            <div className={'user_index_app_content'} >

                <SimulatorPanel />

            </div>
        )
    }

    render(){

        return (
            <LeftSidebarTemplate content={this.getContent()} active={'simulator'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}


SimulatorApp = connect(mapStateToProps, null)(SimulatorApp)

export default SimulatorApp