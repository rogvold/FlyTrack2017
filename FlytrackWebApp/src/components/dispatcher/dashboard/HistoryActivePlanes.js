/**
 * Created by lesha on 29.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HistoryActivePlanes extends React.Component {

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
        console.log(this.state);
        console.log(this.props);

        return (
            <div>
                history active
            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       inAirPlanes: state.HistoryTabReducer.inAirPlanes,
       inAirData: state.HistoryTabReducer.inAirData
   }
}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

// HistoryActivePlanes = connect(mapStateToProps, null)(HistoryActivePlanes)

export default HistoryActivePlanes