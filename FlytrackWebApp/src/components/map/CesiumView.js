/**
 * Created by lesha on 08.07.17.
 */
import React, {PropTypes} from 'react';
// import Cesium from '../../../../node_modules/cesium/Build/CesiumUnminified/Cesium'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CesiumView extends React.Component {

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

    initMap = () => {
        let viewer = new Cesium.Viewer(this.Container);
    };

// <div
// id="cesiumContainer"
//     // ref={(cesMap) => {
//     //     this.Container = cesMap;
//     //     this.initMap();
// }}>

    render = () => {

        return (
            <div
                id="cesiumContainer"
                ref={(Map) => {
                    this.Container = Map;
                    this.initMap();
                }}
            >
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

//CesiumView = connect(mapStateToProps, mapDispatchToProps)(CesiumView)

export default CesiumView