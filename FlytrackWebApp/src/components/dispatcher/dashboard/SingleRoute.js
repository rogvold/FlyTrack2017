/**
 * Created by lesha on 21.06.17.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LeafletSingleRoute extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        showMap: false,
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
        let props = this.props.props;

        return (
            <div>
                <div className="routeChoiser" onClick={() => this.setState({showMap: !this.state.showMap})}>
                    props: {props}
                    <br/>
                    <br/>
                    {this.state.showMap ? <div>show</div> : <div>hide</div> }
                </div>
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

//LeafletSingleRoute = connect(mapStateToProps, mapDispatchToProps)(LeafletSingleRoute)

export default LeafletSingleRoute