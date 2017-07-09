/**
 * Created by sabir on 19.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactMapboxGl = require("react-mapbox-gl").default;
var Layer = require("react-mapbox-gl").Layer;
var Feature = require("react-mapbox-gl").Feature;
var Popup = require("react-mapbox-gl").Popup;
var ZoomControl = require("react-mapbox-gl").ZoomControl;

var parseString = require('xml2js').parseString;
var Map = require('immutable').Map;

//import config from "./config.json";

var MapboxSamplePanel = React.createClass({
    getDefaultProps: function () {
        return {
            maxBounds: [[-0.481747846041145,51.3233379650232], // South West
                [0.23441119994140536,51.654967740310525]]
        }
    },

    getInitialState: function () {
        return {
            center: [-0.109970527, 51.52916347],
            zoom: [11],
            skip: 0,
            stations: [],
            popupShowLabel: true
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },



    componentDidMount: function () {
        var self = this;
        //this.getCycleStations().then(function(res){
        //    var stations = self.state.stations;
        //    stations = stations.merge(res.reduce(function (acc, station) {
        //        return acc.set(station.id[0], new Map({
        //            id: station.id[0],
        //            name: station.name[0],
        //            position: [parseFloat(station.long[0]), parseFloat(station.lat[0])],
        //            bikes: parseInt(station.nbBikes[0]),
        //            slots: parseInt(station.nbDocks[0])
        //        }));
        //    }, new Map()));
        //
        //    self.setState({
        //        stations: stations
        //    });
        //});
        try{
            this.loadStations();
        }catch(e){
            console.log(e);
        }

    },


    loadStations: function(){
        var self = this;
        fetch("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml")
            .then(function(res){ return res.text();})
            .then(function(data){
                //console.log('data = ', data);
                parseString(data, function(err, res){
                    console.log('parseString: res = ', res);
                    console.log('parseString: res.stations = ', res.stations);
                    console.log('parseString: res.stations.station = ', res.stations.station);

                    var stations = res.stations.station.map(function(s){

                        var ob = {};
                        for (var key in s){
                            if (key == 'nbBikes'){
                                ob = assign({}, ob, {bikes: s[key][0]});
                                continue;
                            }
                            if (key == 'nbDocks'){
                                ob = assign({}, ob, {slots: s[key][0]});
                                continue;
                            }
                            ob[key] = s[key][0];
                        }
                        ob.position = [parseFloat(s['long'][0]), parseFloat(s['lat'][0])];
                        return ob;
                    });
                    self.setState({
                        stations: stations
                    });
                });

            });
    },

    getCycleStations: function () {
        return fetch("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml")
            .then(function(res){ return res.text();})
            .then(function(data){
                //console.log('data = ', data);
            return new Promise(function(resolve, reject){
                parseString(data, function(err, res){
                    console.log('parseString: res = ', res);
                    if(!err) {
                        resolve(res.stations.map(function(r){return r.station}));
                    } else {
                        reject(err);
                    }
                });
            });
        });
    },

    _markerClick: function(station, obj){
        this.setState({
            center: obj.feature.geometry.coordinates,
            zoom: [14],
            station
        });
    },

    _onDrag: function(){
        if (this.state.station) {
            this.setState({
                station: null
            });
        }
    },

    _setMove: function(end){
        if(end !== this.state.end)
            this.setState( {end: end});
    },

    _onToggleHover: function(cursor, o) {
        console.log('_onToggleHover occured');
        var map = o.map;
        map.getCanvas().style.cursor = cursor;
    },

    _onControlClick: function(map, zoomDiff){
        const zoom = map.getZoom() + zoomDiff;
        this.setState({ zoom: [zoom] });
    },

    _popupChange: function(popupShowLabel) {
        this.setState({ popupShowLabel: popupShowLabel });
    },


    componentStyle: {
        placeholder: {

        },

        button: {
            cursor: "pointer"
        },

        stationDescription: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 0px",
            textAlign: "center",
            backgroundColor: "white"
        },

        popup: {
            background: "#fff",
            padding: "5px",
            borderRadius: "2px"
        }

    },

    render: function () {
        var stations = this.state.stations;
        console.log('MapboxSamplePanel: stations = ', stations);

        return (
            <div>
                <ReactMapboxGl
                    style={'mapbox://styles/mapbox/streets-v8'}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    minZoom={8}
                    maxZoom={15}
                    maxBounds={this.props.maxBounds}
                    accessToken={'pk.eyJ1IjoiZmx5dHJhY2siLCJhIjoiY2l0OXd6c3VkMDAzdTJucGgzaTc1aXNyZSJ9.g3YzxNLnac7uMRd3LH_pmw'}
                    onDrag={this._onDrag}
                    onMoveEnd={this._setMove.bind(this, true)}
                    onMove={this._setMove.bind(this, false)}
                    containerStyle={{width: 600, height: 600}}>


                    <ZoomControl
                        zoomDiff={1}
                        onControlClick={this._onControlClick} />

                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>
                        {

                                this.state.stations.map(function(station, index){

                                    return (
                                        <Feature
                                            key={station.id}
                                            onHover={this._onToggleHover.bind(this, "pointer")}
                                            onEndHover={this._onToggleHover.bind(this, "")}
                                            onClick={this._markerClick.bind(this, station)}
                                            coordinates={station.position}/>
                                    )
                                }, this)
                        }
                    </Layer>

                    <Layer
                        type="line"
                        id="lines"

                        >

                        {
                            this.state.stations.map(function(station, index){
                                var latlons = [[51.507, 0.1]];
                                latlons.push(station.position);
                                var key = 'line_' + station.id;
                                return (
                                    <Feature
                                        key={key}
                                        onHover={this._onToggleHover.bind(this, "pointer")}
                                        onEndHover={this._onToggleHover.bind(this, "")}
                                        onClick={this._markerClick.bind(this, station)}
                                        coordinates={latlons}/>
                                )
                            }, this)
                        }

                    </Layer>



                    {
                        this.state.station && this.state.end && (
                            <Popup key={this.state.station.id} coordinates={this.state.station.position} closeButton={true}>
                                <div>
                            <span style={assign({},
                                this.componentStyle.popup,
                                {display: this.state.popupShowLabel ? "block" : "none"}
                            )}>
                                {this.state.station.name}
                            </span>
                                    <div onClick={this._popupChange.bind(this, !this.state.popupShowLabel)}>
                                        {
                                            this.state.popupShowLabel ? "Hide" : "Show"
                                        }
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                </ReactMapboxGl>

                {
                    this.state.station && this.state.end && (
                        <div style={this.componentStyle.stationDescription}>
                            <p>{ this.state.station.name }</p>
                            <p>{ this.state.station.bikes } bikes / { this.state.station.slots } slots</p>
                        </div>
                    )
                }
            </div>
        );
    }

});

module.exports = MapboxSamplePanel;