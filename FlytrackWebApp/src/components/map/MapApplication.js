/**
 * Created by lesha on 08.06.17.
 */

import React, { Component } from 'react';
import route from "./route.json";
import MapGenerator from "./MapGenerator_beta";
// import MapGenerator from "./MapGenerator";
//import User from "./User"

let prop1 = {
    "Style": "mapbox://styles/mapbox/streets-v10",
    "Token": "pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg",
    "mappedRoute": route.points.map(point => [ point.lat, point.lng ]),
    "ContainerStyle": {
        height: "100%",
        width: "100%"
    },
    "ZoomLevel": [11],
    "dateTime": route.dateTime
};

let Props = [prop1];

class MapApp extends Component {
    render() {
        return (
                <MapGenerator props = {prop1}/>
        );
    }
}

export default MapApp;