/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import LeftSidebarTemplate from '../template/LeftSidebarTemplate'

import SimulatorPanel from '../simulator/panels/SimulatorPanel'
import OrganizationsPanel from '../organizations/panels/OrganizationsPanel'

import AircraftsPanel from '../aircrafts/panels/AircraftsPanel'

class AircraftsApp extends React.Component {

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

                <AircraftsPanel />

            </div>
        )
    }

    render(){

        return (
            <LeftSidebarTemplate content={this.getContent()} active={'aircrafts'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}


AircraftsApp = connect(mapStateToProps, null)(AircraftsApp)

export default AircraftsApp