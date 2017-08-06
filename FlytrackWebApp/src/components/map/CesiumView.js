/**
 * Created by lesha on 08.07.17.
 */
import React, {PropTypes} from 'react';
// import Cesium from '../../../../node_modules/cesium/Build/CesiumUnminified/Cesium'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CesiumView extends React.Component {

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

    componentWillUnmount(){
        if (this.viewer != undefined) this.viewer.destroy();
    }

    getPositions = () => {
        let {lat, lon, alt, times} = this.props.props.points;
        var property = new Cesium.SampledPositionProperty();

        for (let i=0; i < lat.length; i++) {

            let time = Cesium.JulianDate.fromDate(new Date(times[i]));  //раскомментить с нормальным временем
            // let time = Cesium.JulianDate.fromDate(new Date(times[i]-172800000)); //двое суток сдвиг

            // let position = Cesium.Cartesian3.fromDegrees(lon[i], lat[i], alt[i]); //раскомментить с нормальными высотами
            // let position = Cesium.Cartesian3.fromDegrees(lat[i], lon[i], 600);
            let position = Cesium.Cartesian3.fromDegrees(lon[i], lat[i], 400);

            property.addSample(time, position);
        }
        return property;
    }

    viewerInit = () => {
        this.viewer = new Cesium.Viewer(this.Container, {
            baseLayerPicker : false,
            terrainProvider : new Cesium.CesiumTerrainProvider({
                url : '//assets.agi.com/stk-terrain/world'
            }),
            infoBox : false, //Disable InfoBox widget
            selectionIndicator : false //Disable selection indicator
        });

        this.viewer.scene.globe.depthTestAgainstTerrain = true;

        let position = this.getPositions();
        let {points, sessions} = this.props.props;

        console.log(new Date(points.times[0]));
        console.log(new Date(points.times[points.times.length-1]));

        let start = Cesium.JulianDate.fromDate(new Date(points.times[0]));
        let stop = Cesium.JulianDate.fromDate(new Date(points.times[points.times.length-1]));

        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        // this.viewer.clock.multiplier = 10;
        this.viewer.clock.multiplier = 1;
        this.viewer.scene.globe.enableLighting = true;
        this.viewer.timeline.zoomTo(start, stop);
    }

    entityInit = () => {
        let position = this.getPositions();
        let {points, session} = this.props.props;

        let start = Cesium.JulianDate.fromDate(new Date(points.times[0]));
        let stop = Cesium.JulianDate.fromDate(new Date(points.times[points.times.length-1]));

        this.entity = this.viewer.entities.add({
            availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: start,
                stop: stop
            })]),

            position: position,

            orientation: new Cesium.VelocityOrientationProperty(position),

            model: {
                uri : 'http://cesiumjs.org/Cesium/Apps/SampleData/models/CesiumAir/Cesium_Air.gltf',
                minimumPixelSize: 50
            },

            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.YELLOW
                }),
                width: 10
            }
        });

        this.viewer.trackedEntity = this.entity;
    }

    initialization = () => {
        if (this.viewer != undefined) return;

        this.viewerInit();
        this.entityInit(); //рисует самолет
    }

    render = () => {

        return (
            <div
                className={'cesium_placeholder'}
                ref={(Map) => {
                    this.Container = Map;
                    this.initialization();
                }}
            >
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

//CesiumView = connect(mapStateToProps, mapDispatchToProps)(CesiumView)

export default CesiumView