/**
 * Created by sabir on 18.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import GroundUsersSearchComponent from '../friends/panels/GroundUsersSearchComponent'
import GroundSessionPanel from '../sessions/panels/GroundSessionPanel'

class GroundComponent extends React.Component {

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

    render = () => {

        return (
            <div>

                <GroundUsersSearchComponent />

                <GroundSessionPanel />

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//GroundComponent = connect(mapStateToProps, mapDispatchToProps)(GroundComponent)

export default GroundComponent