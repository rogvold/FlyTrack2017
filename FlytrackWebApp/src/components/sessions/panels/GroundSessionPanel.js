/**
 * Created by lesha on 15.07.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CoolModal from '../../modals/CoolModal'

import * as actions from '../../../redux/actions/SessionsActions'

import SessionPanel from '../../sessions/panels/SessionPanel'

import moment from 'moment'

class GroundSessionPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

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

    render = () => {
        let {session, data, unselectSession} = this.props;
        if (session == undefined){
            return null
        }

        return (//here goes panel with 2d and 3d mode
            <CoolModal onClose={() => {
                unselectSession();
            }} >

                <div className="session_panel_placeholder">

                    <SessionPanel sessionId={session.id} />

                </div>

            </CoolModal>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       sessionId: state.sessions.selectedSessionId,
       session: state.sessions.sessionsMap.get(state.sessions.selectedSessionId),
       data: state.sessions.sessionsDataMap.get(state.sessions.selectedSessionId),
       loading: state.sessions.loading || state.users.loading
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       unselectSession: () => {
           return dispatch(actions.unselectSession())
       },

   }
}

GroundSessionPanel = connect(mapStateToProps, mapDispatchToProps)(GroundSessionPanel)

export default GroundSessionPanel