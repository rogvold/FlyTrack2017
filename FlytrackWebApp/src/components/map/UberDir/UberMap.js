/**
 * Created by lesha on 09.06.17.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MapGL from 'react-map-gl-alt';


class UberMap extends Component {

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
            <div>
                <h2>текст</h2>
                <MapGL
                    width={700}
                    height={450}
                    latitude={37.778}
                    longitude={-122.45}
                    zoom={10.943}
                    mapStyle={mapStyle}
                />
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

// = connect(mapStateToProps, mapDispatchToProps)()

export default UberMap