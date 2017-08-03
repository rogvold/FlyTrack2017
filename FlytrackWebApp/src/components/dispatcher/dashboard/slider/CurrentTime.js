/**
 * Created by lesha on 01.07.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'

class CurrentTime extends React.Component {

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

        return (
            <div className={"map_clock"}>
                {moment(this.props.currentTime).format('HH:mm:ss')}
                {/*{moment(this.props.currentTime).format('llll')}*/}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentTime: state.dashboard.currentTime,
    }
}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

CurrentTime = connect(mapStateToProps, null)(CurrentTime)

export default CurrentTime