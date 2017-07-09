/**
 * Created by lesha on 21.06.17.
 */
import React, {PropTypes} from 'react';
import LeafletSingleRoute from './SingleRoute'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RouteViewer extends React.Component {

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
            <div className={"SingleRouteMapPlaceholder"}>
                {/*<div classname="SingleRouteMapPlaceholder">*/}
                    <LeafletSingleRoute/>
                {/*</div>*/}
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

//RouteViewer = connect(mapStateToProps, mapDispatchToProps)(RouteViewer)

export default RouteViewer