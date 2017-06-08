/**
 * Created by lesha on 08.06.17.
 */

import React, { Component } from 'react';
import route from "./route.json";
import MapGenerator from "./MapGenerator";
//import User from "./User"

let mappedRoute = route.points.map(point => [ point.lat, point.lng ]);

let prop1 = {
    "Style": "mapbox://styles/mapbox/streets-v10",
    "Token": "pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg",
    "ContainerStyle": {
        height: "400px",
        width: "500px"
    },
    "mappedRoute": route.points.map(point => [ point.lat, point.lng ]),
    "ZoomLevel": [11],
    "dateTime": route.dateTime
};

let Props = [prop1];

class MapApp extends Component {
    render() {
        return (
            <div>
                <div>
                    {Props.map((prop, index) => {
                        return(
                            <div key = {index}>
                                <MapGenerator props = {prop}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MapApp;
