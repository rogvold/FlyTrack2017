/**
 * Created by sabir on 27.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var SpaceSessionViewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            points: [],

            startTimestamp: undefined

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        this.initCesium();
    },

    componentStyle: {
        placeholder: {}
    },

    computeCirclularFlight2: function(){
        if (this.viewer == undefined){
            return;
        }
        var points = this.props.points;
        var property = new Cesium.SampledPositionProperty();
        for (var i in points){
            var p = points[i];

            var time = Cesium.JulianDate.fromDate(new Date(p.t));

            //var radians = Cesium.Math.toRadians(i);
            //var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
            //var position = Cesium.Cartesian3.fromDegrees(lon + (radius * 1.5 * Math.cos(radians)), lat + (radius * Math.sin(radians)), Cesium.Math.nextRandomNumber() * 500 + 100);
            var position = Cesium.Cartesian3.fromDegrees(p.lon, p.lat, p.alt);

            property.addSample(time, position);

            //Also create a point for each sample we generate.
            this.viewer.entities.add({
                position : position,
                point : {
                    //pixelSize : 8,
                    pixelSize : 1,
                    color : Cesium.Color.TRANSPARENT,
                    outlineColor : Cesium.Color.YELLOW,
                    outlineWidth : 1
                }
            });
        }
        return property;
    },

    getEndTimestamp: function(){
        var startTimestamp = this.props.startTimestamp;
        if (startTimestamp == undefined){
            return undefined;
        }
        var points = this.props.points;
        if (points == undefined || points.length == 0){
            return startTimestamp;
        }
        //return (startTimestamp + points[points.length - 1].t);
        return (points[points.length - 1].t);
    },


    computeCirclularFlight: function(start, lon, lat, radius) {
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i <= 360; i += 45) {
            var radians = Cesium.Math.toRadians(i);
            var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
            var position = Cesium.Cartesian3.fromDegrees(lon + (radius * 1.5 * Math.cos(radians)), lat + (radius * Math.sin(radians)), Cesium.Math.nextRandomNumber() * 500 + 100);
            property.addSample(time, position);

            //Also create a point for each sample we generate.
            this.viewer.entities.add({
                position : position,
                point : {
                    pixelSize : 8,
                    color : Cesium.Color.TRANSPARENT,
                    outlineColor : Cesium.Color.YELLOW,
                    outlineWidth : 3
                }
            });
        }
        return property;
    },

    initCesium: function(){
        console.log('init cesium occured');

        var self = this;
        this.viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProviderViewModels : [], //Disable terrain changing
            infoBox : false, //Disable InfoBox widget
            selectionIndicator : false //Disable selection indicator
        });

        var vrTheWorldProvider = new Cesium.VRTheWorldTerrainProvider({
            url : 'http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/',
            credit : 'Terrain data courtesy VT MÄK'
        });

//Enable lighting based on sun/moon positions
        this.viewer.scene.globe.enableLighting = true;

//Use STK World Terrain
        this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : 'https://assets.agi.com/stk-terrain/world',
            requestWaterMask : true,
            requestVertexNormals : true
        });

        //this.viewer.terrainProvider = vrTheWorldProvider;


//Enable depth testing so things behind the terrain disappear.
        this.viewer.scene.globe.depthTestAgainstTerrain = true;

//Set the random number seed for consistent results.
        Cesium.Math.setRandomNumberSeed(3);

        var start = Cesium.JulianDate.fromDate(new Date(this.props.startTimestamp));
        var stop = Cesium.JulianDate.fromDate(new Date(this.getEndTimestamp()));

        //Cesium.BingMapsApi.defaultKey = '7q9BHynW_BgHukqlmUOREEvxVgyXeNKUBCr4mevWTeZprPDjydu7D9j';
        var position = this.computeCirclularFlight2();


        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        this.viewer.clock.multiplier = 10;
        this.viewer.scene.globe.enableLighting = true;
        this.viewer.timeline.zoomTo(start, stop);

        var entity = this.viewer.entities.add({

            //Set the entity availability to the same interval as the simulation time.
            availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start : self.start,
                stop : stop
            })]),

            //Use our computed positions
            position : position,

            //Automatically compute orientation based on position movement.
            orientation : new Cesium.VelocityOrientationProperty(position),

            //Load the Cesium plane model to represent the entity
            model : {
                //uri : '../../SampleData/models/CesiumAir/Cesium_Air.gltf',
                uri : 'http://cesiumjs.org/Cesium/Apps/SampleData/models/CesiumAir/Cesium_Air.gltf',
                minimumPixelSize : 64
            },

            //Show the path as a pink line sampled in 1 second increments.
            path : {
                resolution : 1,
                material : new Cesium.PolylineGlowMaterialProperty({
                    glowPower : 0.1,
                    color : Cesium.Color.YELLOW
                }),
                width : 10
            }
        });

        this.viewer.trackedEntity = entity;
        //this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-90), Cesium.Math.toRadians(-15), 7500));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <div style={{width: '100%', height: '100%'}} id="cesiumContainer"></div>
            </div>
        );
    }

});

module.exports = SpaceSessionViewPanel;