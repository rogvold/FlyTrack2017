/**
 * Created by sabir on 17.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as constants from '../../../constants/config'

class UserAvatarImg extends React.Component {

    static defaultProps = {
        id: undefined,
        className: ''
    }

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
        let {user, className} = this.props;
        let avatar = (user == undefined || user.avatar == undefined) ?  constants.FACELESS_AVATAR : user.avatar;

        return (
            <img src={avatar} className={className} />
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       user: state.users.usersMap.get(ownProps.id)
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

UserAvatarImg = connect(mapStateToProps, mapDispatchToProps)(UserAvatarImg)

export default UserAvatarImg