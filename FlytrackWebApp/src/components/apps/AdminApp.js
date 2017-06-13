/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import LeftSidebarTemplate from '../template/LeftSidebarTemplate'

import AdminTabbedPanel from '../admin/panels/AdminTabbedPanel'

class AdminApp extends React.Component {

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
            <div className={'user_index_app_content p10'} >

                <AdminTabbedPanel />

            </div>
        )
    }

    render(){

        return (
            <LeftSidebarTemplate content={this.getContent()} active={'admin'} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.usersMap.get(state.users.currentUserId),
    }
}


AdminApp = connect(mapStateToProps, null)(AdminApp)

export default AdminApp