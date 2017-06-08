/**
 * Created by lesha on 08.06.17.
 */

import React from 'react';
import ReactMapboxGl, {
    Layer,
    Feature,
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

    render = () => {

        let {props} = this.props;

        return (
            <div>
                <ReactMapboxGl
                    style={props.Style}
                    accessToken={props.Token}
                    containerStyle={props.ContainerStyle}
                    center = {[props.mappedRoute[Math.round(props.mappedRoute.length/2)][0], props.mappedRoute[Math.round(props.mappedRoute.length/2)][1]]}
                    zoom = {props.ZoomLevel}>

                    <Layer
                        id="mapbox-route-example"
                        type="line"
                        sourceId="route"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": "#888",
                            "line-width": 8
                        }}/>

                    <Layer
                        type="line"
                        layout={{ "line-cap": "round", "line-join": "round" }}
                        paint={{ "line-color": "#5874c9", "line-width": 10 }}>
                        <Feature coordinates={props.mappedRoute}/>
                    </Layer>

                </ReactMapboxGl>
                <div className="Datetime">{props.dateTime}</div>
                <hr/>
            </div>
        )
    }

}


export default MapGenerator