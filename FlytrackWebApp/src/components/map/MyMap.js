/**
 * Created by lesha on 09.06.17.
 */
import React, {PropTypes} from 'react';
import route from "./route.json";
// import * as makeRoute from './MapElements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import mapboxgl from 'mapbox-gl';

class MyMap extends React.Component {

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
        this.initMap();
    }

    componentWillReceiveProps(){

    }

    initMap = () => {
        const radius = 0.02;
        const numberOfPoints = 1;

        const allPoints = route.points.map(point => [ point.lat, point.lng ]);
        const lenOfArray = allPoints.length;


        let map = this.map;
        if (map == undefined){
            return;
        }

        console.log('initMap occured: this.map = ', this.map);

        mapboxgl.accessToken = 'pk.eyJ1IjoibGVzaGEyODMyIiwiYSI6ImNqM2E0OTA5YjAwNmIzM3BwOTcxaWhpMnUifQ.YoQLyWhrj5p_r4S1GW0-Kg'
        this.mapboxMap = new mapboxgl.Map({
            container: map,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [allPoints[Math.round(allPoints.length/2)][0], allPoints[Math.round(allPoints.length/2)][1]],
            zoom: 12
        });


        console.log('initMap: this.mapboxMap = ', this.mapboxMap);

        function pointOnCircle(angle) { // returns circle
            return {
                "type": "Point",
                "coordinates": [
                    allPoints[Math.round(allPoints.length/2)][0] + Math.cos(angle) * radius - Math.random()*radius/3,
                    allPoints[Math.round(allPoints.length/2)][1] + Math.sin(angle) * radius - Math.random()*radius/3
                ]
            };
        }

        let moveInRoute = (num) => {
            console.log(Math.round(Math.atan((allPoints[num-1][1]+allPoints[num+1][1])/(allPoints[num-1][0]+allPoints[num+1][0])) * Math.PI/180));
            return {
               "type": "Point",
               "coordinates": [allPoints[num][0], allPoints[num][1]]
           };
        };


        this.mapboxMap.on('load', () => {
            this.mapboxMap.loadImage(`./assets/images/planes/plane0.png`, (error, image) => {
                if (error) throw error;
                console.log('Mapbox = ', this.mapboxMap.loadImage);
                this.mapboxMap.addImage('plane0', image);

                let createSource = () => {
                    for (let i = 0; i < numberOfPoints; i++) {
                        this.mapboxMap.addSource(`point${i}`, {
                            "type": "geojson",
                            "data": pointOnCircle(0)
                        })
                    }
                };

                //for (let i = 0; i<=360; i+=30){ this.mapbox.Map.loadImage(`./assets/images/planes/plane${i}.png`); };

                let createLayer = () => {
                    for (let i = 0; i < numberOfPoints; i++) {
                        this.mapboxMap.addLayer({
                            "id": `point${i}`,
                            "source": `point${i}`,
                            "type": "symbol",
                            "layout": {
                                "icon-image": "plane0",
                                "icon-size": 0.1
                            }
                            // "paint": {
                            //     "circle-radius": 10,
                            //     "circle-color": `#${Math.round(Math.random()*8)}${Math.round(Math.random()*8)}${Math.round(Math.random()*8)}${Math.round(Math.random()*8)}${Math.round(Math.random()*8)}${Math.round(Math.random()*8)}`
                            // }
                        });
                    }
                }


                // this.mapboxMap.addLayer(makeRoute(coords))
                this.mapboxMap.addLayer({ //makeRoute(coords)
                    "id": "route",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": allPoints
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#888",
                        "line-width": 8
                    }
                });

                createSource();
                createLayer();

                // this.mapboxMap.addSource('point10', {
                //     "type": "geojson",
                //     "data": moveInRoute(0)
                // });
                //
                // this.mapboxMap.addLayer({
                //     "id": "point10",
                //     "source": "point10",
                //     "type": "circle",
                //     "paint": {
                //         "circle-radius": 10,
                //         "circle-color": "#bf1c22"
                //     }
                // });

                this.animateMarker = () => {
                    for (let i = 1; i < numberOfPoints; i++) {
                        this.mapboxMap.getSource(`point${i}`).setData(pointOnCircle(+new Date() / 2000.0));
                    }
                    // Request the next frame of the animation goes here:
                    setTimeout(() => {
                        this.animateMarker();
                    }, 25)
                }

                //const mark = L.marker(this.mapboxMap.getCenter()).addTo(this.mapboxMap);

                // var marker = L.rotatedMarker(new L.LatLng(37.9, -77), {
                //     icon: L.divIcon({
                //         className: 'svg-marker',
                //         html: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path d="M15 6.818V8.5l-6.5-1-.318 4.773L11 14v1l-3.5-.682L4 15v-1l2.818-1.727L6.5 7.5 0 8.5V6.818L6.5 4.5v-3s0-1.5 1-1.5 1 1.5 1 1.5v2.818l6.5 2.5z"/></svg>',
                //         iconSize: [24, 24],
                //     }),
                //     draggable: true
                // });
                //
                // marker.addTo(mapboxMap);


                let currentPoint = 1;
                this.animatePoint = () => {
                        if (currentPoint < allPoints.length) {
                         this.mapboxMap.getSource("point0").setData(moveInRoute(currentPoint++));
                         setTimeout(() => {
                             this.animatePoint();
                         }, 25)

                     }
                }
                // Start the animation.
                this.animatePoint();
                // this.animateMarker();

                 // working layer with cat goes here:
                // this.mapboxMap.addLayer({
                //     "id": "points",
                //     "type": "symbol",
                //     "source": {
                //         "type": "geojson",
                //         "data": {
                //             "type": "FeatureCollection",
                //             "features": [{
                //                 "type": "Feature",
                //                 "geometry": {
                //                     "type": "Point",
                //                     "coordinates": [0, 0]
                //                 }
                //             }]
                //         }
                //     },
                //     "layout": {
                //         "icon-image": "cat",
                //         "icon-size": 0.25
                //     }
                // });
                //endoflayer
            });

        //
        });

    }


    render = () => {


        return (
            <div
                style={{width: 600, height: 400}}
                className={'my_map'} ref={(m) => {
                this.map = m;
            }} >

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

//MyMap = connect(mapStateToProps, mapDispatchToProps)(MyMap)

export default MyMap