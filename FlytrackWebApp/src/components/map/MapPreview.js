/**
 * Created by lesha on 14.07.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const TOKEN = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg';

class MapPreview extends React.Component {

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
        if (this.mapContainer == undefined) return;
        if (this.map != undefined) { return; }

        L.mapbox.accessToken = TOKEN;

        this.map = L.mapbox.map(this.mapContainer, 'mapbox.emerald', {
            keyboard: false,
        }).setView([56.1, 36.8], 10.5, null);

        //todo: draw polyline from props;
    }

    render = () => {

        return (
            <div
                className={'preview_map'}
                ref={(m) => {this.mapContainer = m;
                this.initMap();
                }}>
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

//MapPreview = connect(mapStateToProps, mapDispatchToProps)(MapPreview)

export default MapPreview