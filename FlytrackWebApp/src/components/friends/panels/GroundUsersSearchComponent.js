/**
 * Created by sabir on 18.06.17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CoolModal from '../../modals/CoolModal'

import * as actions from '../../../redux/actions/SearchActions'

import UsersSearchPanel from './UsersSearchPanel'

class GroundUsersSearchComponent extends React.Component {

    static defaultProps = {
        level: 1
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
        let {mode, closeDialog, level} = this.props;
        if (mode == undefined || mode != 'users'){
            return null;
        }

        return (
            <CoolModal level={level} onClose={() => {closeDialog()}} >

                <UsersSearchPanel />

            </CoolModal>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       mode: state.search.mode
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       closeDialog: () => {
           return dispatch(actions.closeSearchDialog())
       }
   }
}

GroundUsersSearchComponent = connect(mapStateToProps, mapDispatchToProps)(GroundUsersSearchComponent)

export default GroundUsersSearchComponent