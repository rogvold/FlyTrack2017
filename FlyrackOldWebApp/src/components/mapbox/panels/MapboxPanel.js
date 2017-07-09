/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var ReactMapboxGl = require("react-mapbox-gl").default;
var Layer = require("react-mapbox-gl").Layer;
var Feature = require("react-mapbox-gl").Feature;
var Popup = require("react-mapbox-gl").Popup;
var ZoomControl = require("react-mapbox-gl").ZoomControl;

var FlyTrackHelper = require('../../../helpers/FlyTrackHelper');

var MapboxPanel = React.createClass({
    getDefaultProps: function () {
        return {

            lines: [],
            markers: [],
            photos: [
                {
                    url: 'https://avatars2.githubusercontent.com/u/1446492?v=3&s=460',
                    compressedUrl: 'https://avatars2.githubusercontent.com/u/1446492?v=3&s=460',
                    id: 'sdfasdf',
                    point: {
                        lat: 56.1061,
                        lon: 36.8064183
                    }
                }, {
                    url: 'https://avatars3.githubusercontent.com/u/1834389?v=3&s=466',
                    compressedUrl: 'https://avatars3.githubusercontent.com/u/1834389?v=3&s=466',
                    id: 'sdfasdwdf',
                    point: {
                        lat: 56.104987,
                        lon: 36.8056563
                    }
                }
            ],

            dragPhoto: undefined
            //{
            //    url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/000/1b4/304/3152fb3.jpg',
            //    compressedUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/000/1b4/304/3152fb3.jpg',
            //    id: 'sdfasdf',
            //    point: {
            //        lat: 56.1061,
            //        lon: 36.8064183
            //    }
            //}
            ,

            hasBounds: true,

            selectedId: 'sabir',

            style: {
                width: '100%',
                height: '100%'
            },

            onMarkerHover: function(id){
                console.log('onMarkerHover: default: id = ', id);
            },

            onMarkerEndHover: function(id){
                console.log('onMarkerEndHover: default: id = ', id);
            },

            onMarkerClick: function(id){
                console.log('onMarkerClick: default: id = ', id);
            },

            onLineHover: function(id){
                console.log('onLineHover: default: id = ', id);
            },

            onLineEndHover: function(id){
                console.log('onLineEndHover: default: id = ', id);
            },

            onLineClick: function(id){
                console.log('onLineClick: default: id = ', id);
            },

            onDrag: function(){

            },

            center: undefined,

            changeDragPhotoPosition: function(data){
                console.log('changeDragPhotoPositionoccured: data = ', data);
            },

            onDragPhotoSave: function(){

            },

            onPhotoDelete: function(url){

            }

        }
    },

    getInitialState: function () {
        return {
            //center: [-0.109970527, 51.52916347],
            //center: this.getCenter(this.props.markers, this.props.lines),
            zoom: [2],
            skip: 0,
            popupShowLabel: true
        }
    },

    componentWillReceiveProps: function (nextProps) {
        //var newCenter = this.getCenter(nextProps.markers, nextProps.lines);
        //if (newCenter[0] != this.state.center[0] || newCenter[1] != this.state.center[0]){
        //    this.setState({
        //        center: newCenter
        //    });
        //}
    },

    componentDidMount: function () {
        setTimeout(function(){
            var markers = this.props.markers;
            var lines = this.props.lines;
            this.fitBounds(markers, lines);
        }.bind(this), 200);
    },

    fitBounds: function(markers, lines){
        var markerPoints = (markers == undefined) ? [] : markers.map(function(r){return r.point});
        var linesPoints = FlyTrackHelper.getAllPointsInLines(lines);
        var points = markerPoints.concat(linesPoints);
        var mapbox = this.refs['mapbox'];
        var bounds = FlyTrackHelper.getBounds(points);
        console.log('fitBounds: mapbox, bounds = ', mapbox, bounds);
        //wtf!!
        //mapbox.state.map.fitBounds(bounds);
    },

    componentStyle: {
        placeholder: {

        }
    },

    getCenter: function(markers, lines){
        var markerPoints = (markers == undefined) ? [] : markers.map(function(r){return r.point});
        var linesPoints = FlyTrackHelper.getAllPointsInLines(lines);
        var points = markerPoints.concat(linesPoints);
        var c = FlyTrackHelper.getCenter(points);

        //return [c.lat, c.lon];
    },

    _markerClick: function(id){
        this.props.onMarkerClick(id);
    },

    _lineClick: function(id){
        this.props.onLineClick(id);
    },

    _onDrag: function(){
        this.props.onDrag();
    },

    _setMove: function(end){
        if(end !== this.state.end)
            this.setState( {end: end});
    },

    _onToggleHover: function(cursor, o) {
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

    onMapClick: function(map, event){
        if (this.props.dragPhoto == undefined){
            return;
        }
        console.log('onMapClick: map, event = ', map, event);
        var data = event.lngLat;
        this.props.changeDragPhotoPosition({lon: data.lng, lat: data.lat});
    },

    getMarkersLayer: function(){
        var markers = this.props.markers;
        var arr = [];
        if (markers == undefined || markers.length == 0){
            return null;
        }
        for (var i in markers){
            var m = markers[i];
            var p = m.point;
            if (p == undefined){
                continue;
            }
            var key = 'marker_' + m.id;

            arr.push(
                <Feature
                    key={key}
                    onHover={this.props.onMarkerHover.bind(this, m.id)}
                    onEndHover={this.props.onMarkerEndHover.bind(this, m.id)}
                    onClick={this.props.onMarkerClick.bind(this, m.id)}
                    coordinates={[p.lon, p.lat]} />
            );
        }
        return (
            <Layer type="symbol"
                   id="marker"
                   layout={{ "icon-image": "marker-15" }}>
                {arr}
            </Layer>
        );
    },

    getLinesLayer: function(){
        var lines = this.props.lines;
        var arr = [];
        if (lines.length == 0){
            return null;
        }
        for (var i in lines){
            var l = lines[i];
            var key = 'line_' + l.id;
            var points = l.points;
            //var latlngs = points.map(function(p){return [p.lat, p.lon]});
            var latlngs = points.map(function(p){return [p.lon, p.lat]});
            arr.push(
                <Feature

                    key={key}

                    onHover={this.props.onLineHover.bind(this, l.id)}
                    onEndHover={this.props.onLineEndHover.bind(this, l.id)}
                    onClick={this.props.onLineClick.bind(this, l.id)}

                    paint={{"line-color": "#4A148C", "line-width": 10, "color": "#4A148C"}}

                    color={'#4A148C'}
                    fillColor={"#4A148C"}
                    stroke={"true"}
                    style={{color: "#4A148C", fillColor: "#4A148C", weight: 500}}

                    properties={{fill: "#4A148C", stroke: "#4A148C", "stroke-width": 5, "fill-opacity": 1, color: "#4A148C", fillColor: "#4A148C"}}
                    options={{fill: "#4A148C", stroke: "#4A148C", "stroke-width": 5, "fill-opacity": 1, color: "#4A148C", fillColor: "#4A148C"}}

                    coordinates={latlngs} />
            );
        }
        return (
            <Layer type="line"
                   id="lines"
                   paint={{"line-color": "#888", "line-width": 4}}
                   layout={{"line-join": "round", "line-cap": "round"}}
                >
                {arr}
            </Layer>
        );
    },

    getSelectedLineLayer: function(){
        var lines = this.props.lines;
        var selectedId = this.props.selectedId;
        lines = lines.filter(function(a){return (a.id == selectedId)});
        var arr = [];
        if (lines.length == 0){
            return null;
        }
        for (var i in lines){
            var l = lines[i];
            var key = 'sel_line_' + l.id;
            var points = l.points;
            var latlngs = points.map(function(p){return [p.lon, p.lat]});
            arr.push(
                <Feature
                    key={key}
                    onHover={this.props.onLineHover.bind(this, l.id)}
                    onEndHover={this.props.onLineEndHover.bind(this, l.id)}
                    onClick={this.props.onLineClick.bind(this, l.id)}
                    coordinates={latlngs} />
            );
        }
        return (
            <Layer type="line"
                   id="selected_lines"
                   paint={{"line-color": "#4A148C", "line-width": 8}}
                   layout={{"line-join": "round", "line-cap": "round"}}
                >
                {arr}
            </Layer>
        );
    },

    getPhotosLayer: function(){
        var photos = this.props.photos;
        var arr = [];
        if (photos == undefined || photos.length == 0){
            return null;
        }
        for (var i in photos){
            var photo = photos[i];
            var p = photo.point;
            if (p == undefined){
                continue;
            }
            var key = 'photo_' + photo.id;
            var onDelete = this.props.onPhotoDelete.bind(this, photo.url);

            arr.push(
                <Popup coordinates={[p.lon, p.lat]} key={key}>
                    <div className={'regular_photo'} >
                        <div className={'img_placeholder'} >
                            <a href={photo.url} target="_blank" >
                                <img src={photo.compressedUrl} />
                            </a>
                        </div>
                        <div className={'overlay_placeholder'} >
                            <div className={'delete_button_placeholder'} >
                                <button className={'ui button mini negative'} onClick={onDelete} >
                                    <i className={'icon remove'} ></i>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </Popup>
            );
        }
        return arr;
    },

    getDragPhotoLayer: function(){
        var df = this.props.dragPhoto;
        if (df == undefined){
            return null;
        }
        var p = df.point;

        return (
            <Popup coordinates={[p.lon, p.lat]} key={df.id}>
                <div className={'drag_photo'} >
                    <div className={'img_placeholder'} >
                        <img src={df.compressedUrl} />
                    </div>
                    <div className={'overlay_placeholder'} >
                        <div className={'save_button_placeholder'} >
                            <button className={'ui button inverted'} onClick={this.props.onDragPhotoSave} >
                                <i className={'icon save'} ></i>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        );
    },

    render: function () {

        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        var markerPoints = (this.props.markers == undefined) ? [] : this.props.markers.map(function(r){return r.point});
        var linesPoints = FlyTrackHelper.getAllPointsInLines(this.props.lines);
        var points = markerPoints.concat(linesPoints);
        var mapbox = this.refs['mapbox'];
        var bounds = FlyTrackHelper.getBounds(points);

        var center = this.props.center;
        if (center == undefined){
            center = [36.8008261, 56.0996454];
        }


        return (
            <div style={st}>

                {this.props.hasBounds == true ?
                    <ReactMapboxGl
                        //center={center}
                        style={'mapbox://styles/mapbox/streets-v8'}
                        ref={'mapbox'}
                        maxBounds={bounds}
                        zoom={this.state.zoom}
                        //minZoom={2}
                        //maxZoom={40}

                        accessToken={'pk.eyJ1IjoiZmx5dHJhY2siLCJhIjoiY2l0OXd6c3VkMDAzdTJucGgzaTc1aXNyZSJ9.g3YzxNLnac7uMRd3LH_pmw'}
                        onDrag={this._onDrag}
                        onMoveEnd={this._setMove.bind(this, true)}
                        onMove={this._setMove.bind(this, false)}
                        onClick={this.onMapClick}
                        containerStyle={{width: '100%', height: '100%'}}>


                        <ZoomControl
                            zoomDiff={1}
                            position={'topLeft'}
                            onControlClick={this._onControlClick} />

                        {this.getLinesLayer()}
                        {this.getMarkersLayer()}

                        {this.getSelectedLineLayer()}

                        {this.getPhotosLayer()}

                        {this.getDragPhotoLayer()}

                    </ReactMapboxGl>
                    :
                    <ReactMapboxGl
                        //center={center}
                        style={'mapbox://styles/mapbox/streets-v8'}
                        ref={'mapbox'}
                        zoom={this.state.zoom}
                        //minZoom={2}
                        //maxZoom={40}

                        accessToken={'pk.eyJ1IjoiZmx5dHJhY2siLCJhIjoiY2l0OXd6c3VkMDAzdTJucGgzaTc1aXNyZSJ9.g3YzxNLnac7uMRd3LH_pmw'}
                        onDrag={this._onDrag}
                        onMoveEnd={this._setMove.bind(this, true)}
                        onMove={this._setMove.bind(this, false)}
                        onClick={this.onMapClick}
                        containerStyle={{width: '100%', height: '100%'}}>


                        <ZoomControl
                            zoomDiff={1}
                            position={'topLeft'}
                            onControlClick={this._onControlClick} />

                        {this.getLinesLayer()}
                        {this.getMarkersLayer()}

                        {this.getSelectedLineLayer()}

                        {this.getPhotosLayer()}

                        {this.getDragPhotoLayer()}

                    </ReactMapboxGl>
                }



            </div>
        );
    }

});

module.exports = MapboxPanel;