/**
 * Created by lesha on 08.06.17.
 */

import React from 'react';
import ReactMapboxGl, {
    Layer,
    Feature,
    Source,
} from "react-mapbox-gl";

class MapGenerator extends React.Component {
    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    _onClickCircle(propq) {
        console.log("Clicked on the map : ", propq);
    }

    render = () => {

        let {props} = this.props;

        return (
            <div className="mapbox_map">
                <ReactMapboxGl
                    style={props.Style}
                    accessToken={props.Token}
                    containerStyle={props.ContainerStyle}
                    center = {[props.mappedRoute[Math.round(props.mappedRoute.length/2)][0], props.mappedRoute[Math.round(props.mappedRoute.length/2)][1]]}
                    zoom = {props.ZoomLevel}>

                    <Layer
                        type="line"
                        layout={{ "line-cap": "round", "line-join": "round" }}
                        paint={{ "line-color": "#4b57c9", "line-width": 10 }}>

                        <Feature coordinates={props.mappedRoute}/>
                    </Layer>

                    <Layer
                        type="circle"
                        paint={{ "circle-radius": 30, "circle-color": "#E54E52", "circle-opacity": .8 }}>
                        <Feature
                            coordinates={[props.mappedRoute[Math.round(props.mappedRoute.length/2)][0], props.mappedRoute[Math.round(props.mappedRoute.length/2)][1]]}
                            onClick={(coordinates) => (this._onClickCircle(coordinates))}/>
                    </Layer>

                </ReactMapboxGl>
            </div>
        )
    }

}


export default MapGenerator