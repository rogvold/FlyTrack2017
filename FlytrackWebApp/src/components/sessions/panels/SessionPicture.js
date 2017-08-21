/**
 * Created by lesha on 19.08.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../redux/actions/SessionsActions'
import CoolPreloader from "../../preloader/CoolPreloader";

class SessionPicture extends React.Component {

    static defaultProps = {
        sessionId: undefined
    }

    static propTypes = {
        sessionId: PropTypes.string.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {loadSessionPoints, sessionId} = this.props;
        loadSessionPoints(sessionId);
    }

    componentWillReceiveProps(){

    }

    reformArr = (pts) => {
        let latArr = [];
        let lonArr = [];

        for(let i in pts){
            latArr.push(+pts[i].lat);
            lonArr.push(+pts[i].lon);
        }

        return {latArr: latArr, lonArr: lonArr};
    }

    // convertLatDegreesToMeters = (maxLon, minLon, maxLat, minLat) => {
    //     let coefficient =  111000 * Math.cos(maxLat * Math.PI / 180);
    //     let latLength = (maxLat-minLat) * coefficient;
    //
    //     return latLength;
    // }

    getZoomLvl = (latLength) => {
        let zoomWidthArr = [];

        let lat15 = 920;
        let lon15 = 690;

        for (let i = 0; i < 20; i++){
            zoomWidthArr.push(+Math.abs(lat15 * Math.pow(2, 15-i) - latLength))
        }

        let key = NaN;
        let min = Math.min(...zoomWidthArr);

        for (let i in zoomWidthArr){
            if (zoomWidthArr[i] === min) {
                console.log(min, zoomWidthArr[i]);
                key = i+1
            }
        }

        return +key > 19 || isNaN(key) ? 2 : +key;
    }


    measure = (lat1, lon1, lat2, lon2) => {
        let R = 6378.137; // km
        let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d * 1000; // meters
    }

    zoomLevel = (obj) => {
        let lat15 = 920;
        let lon15 = 690;
        let zoomLevel = 5;

        let maxLat = Math.max(...obj.latArr);
        let minLat = Math.min(...obj.latArr);
        let maxLon = Math.max(...obj.lonArr);
        let minLon = Math.min(...obj.lonArr);
        let latLength = this.measure(maxLat, maxLon, minLat, minLon);

        while (obj.lonArr.length < 1) {
            zoomLevel = this.getZoomLvl(maxLat);
        }

        return zoomLevel;
    }

    getCenterCoords = (obj) => {
        let maxLat = Math.max(...obj.latArr);
        let minLat = Math.min(...obj.latArr);
        let maxLon = Math.max(...obj.lonArr);
        let minLon = Math.min(...obj.lonArr);

        return (maxLat+minLat)/2 + ',' + (maxLon+minLon)/2;
    }

    constructUrl = (sessId) => {
        let {points} = this.props.points;

        let link = 'https://maps.googleapis.com/maps/api/staticmap?size=340x250&maptype=roadmap';
        let zoom = '&zoom='+this.zoomLevel(this.reformArr(points));
        let center = '&center=' + (points.length < 2 ? '0,0' : this.getCenterCoords(this.reformArr(points)));
        let path = 'path=color:0x0000ff|';

        for (let i = 0; i < points.length-1; i+= Math.round( (points.length < 405 ? 1 : points.length/405))) {
            path += ('' + points[i].lat).slice(0,7) + ',' +  ('' + points[i].lon).slice(0,7);
            if (i !== (points.length - 1)){
                path+='|'
            }
        }

        let apiKey = 'AIzaSyDnADvvsKlL7gDRc_vQm0aALjdJskXUTVk';

        link = link + center + '&' + path.slice(0,-2) + '&key=' + apiKey;

        return link
    }

    render = () => {
        let {points, session} = this.props;

        return (
            <div className={'preview_image'}>

                {JSON.stringify(points).slice(0,2) == '[]' ?
                    <CoolPreloader/>
                    :
                    <img style={{width: '340px', height: '250px'}}
                         src={this.constructUrl(session.id)}
                    />}
            </div>
        )
    }

}

let getPoints = (state, sessionId) => {
    let points = state.sessions.sessionsDataMap.get(sessionId);
    if (points == undefined){
        points = [];
    }
    return points;
}

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.sessions.sessionsMap.get(ownProps.sessionId),
        loading: state.sessions.loading,
        points: getPoints(state, ownProps.sessionId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessionPoints: (sessionId) => {
            return dispatch(actions.loadSessionData(sessionId))
        }
    }
}

SessionPicture = connect(mapStateToProps, mapDispatchToProps)(SessionPicture)

export default SessionPicture