/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import OrganizationsPanel from '../../organizations/panels/OrganizationsPanel'

import AllUsersPanel from '../users/panels/AllUsersPanel'

class AdminTabbedPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        active: 'users'
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
        let {active} = this.state;

        return (
            <div>

                <div className="ui top attached tabular menu">
                    <div className={' item ' + (active == 'users' ? 'active' : 'pointer')} onClick={() => {this.setState({active: 'users'})}} >Пользователи</div>
                    <div className={' item ' + (active == 'organizations' ? 'active' : 'pointer')} onClick={() => {this.setState({active: 'organizations'})}} >Аэродромы</div>
                </div>


                {active != 'users' ? null :
                    <div className="ui bottom attached active tab segment">
                        <AllUsersPanel />
                    </div>
                }

                {active != 'organizations' ? null :
                    <div className="ui bottom attached active tab segment">
                        <OrganizationsPanel />
                    </div>
                }


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

//AdminTabbedPanel = connect(mapStateToProps, mapDispatchToProps)(AdminTabbedPanel)

export default AdminTabbedPanel