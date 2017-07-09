/**
 * Created by sabir on 23.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var MapboxPanel = require('../../mapbox/panels/MapboxPanel');

var FlyTrackHelper = require('../../../helpers/FlyTrackHelper');

var HeightsPanel = require('./HeightsPanel');

var ImageUploadPanel = require('../../upload/panels/ImageUploadPanel');

var PlaySessionPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            sessionId: undefined,
            userId: undefined,

            interval: 1000

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        var data = store.getSessionLineAndMarker(this.props.sessionId);
        var session = store.getSession(this.props.sessionId);
        var photos = (session == undefined) ? [] : session.photos;
        return {
            loading: store.loading,
            points: store.getSessionPoints(this.props.sessionId),
            session: session,
            photos: photos,
            line: data.line,
            marker: data.marker
        }
    },

    getInitialState: function(){
        return {
            time: 0,
            playing: true,
            speed: 1,
            photosVisible: true,
            imageData: undefined,
            dragPhoto: undefined
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        this.getFlux().actions.loadSessionPoints(this.props.sessionId);
        this.initTimer();
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },

    onTimeChange: function(t){
        this.setState({
            time: t
        });
    },

    getFirstTime: function(){
        var points = this.state.points;
        if (points == undefined || points.length == 0){
            return 0;
        }
        return (points[0].t);
    },

    getDuration: function(){
        var points = this.state.points;
        if (points == undefined || points.length == 0){
            return 0;
        }
        return (points[points.length - 1].t);
    },

    initTimer: function(){
        if (this.intervalId == undefined){
            this.intervalId = setInterval(function(){
                if (this.state.playing == false || this.state.points == undefined || this.state.points.length == 0){
                    return;
                }
                var time = Math.max(this.state.time, this.getFirstTime());
                time = time + this.props.interval * this.state.speed;
                if (time > this.getDuration()){
                    this.setState({
                        time: this.getFirstTime()
                    });
                    return;
                }
                this.setState({
                    time: time
                });
            }.bind(this), this.props.interval);
        }
    },

    togglePlaying: function(){
        this.setState({
            playing: !this.state.playing
        });
    },

    componentWillUnmount: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    getMarker: function(){
        var points = this.state.points;
        if (points == undefined || points.length == 0){
            return undefined;
        }
        var marker = {id: this.props.sessionId, point: points[0]};
        var time = this.state.time;
        for (var i in points){
            var p = points[i];
            if (p.t < time){
                marker = {id: this.props.sessionId, point: points[i]};
            }else {
                break;
            }
        }
        return marker;
    },

    onImageUploaded: function(data){
        var points = this.state.points;
        if (points == undefined || points.length == 0){
            return;
        }
        var p = points[0];
        var df = {
            url: data.medium_url,
            compressedUrl: data.mini_url,
            id: 'drag_photo',
            point: {
                lat: p.lat,
                lon: p.lon
            }
        };
        console.log('--->>>   SETTING drag photo: df = ', df);
        this.setState({
            imageData: data,
            dragPhoto: df,
            playing: false
        });
    },

    getPhotoUploadComponent: function(){
        if (this.state.imageData != undefined){
            return (
                <div className={'drag_photo_hint'} >
                    Перетащите фото на карте и нажмите "<b>Сохранить</b>"
                </div>
            );
        }
        return (
            <ImageUploadPanel onFileUploaded={this.onImageUploaded} />
        );
    },

    getPhotosSwitcher: function(){
        //photosVisible
        var visible = this.state.photosVisible;
        return (
            <div className={'switcher_placeholder'} >
                {visible == true ?
                    <div className={'switcher_item'} onClick={this.setState.bind(this, {photosVisible: !visible})}  > <i className={'icon hide'} ></i> скрыть фото</div>:
                    <div className={'switcher_item'} onClick={this.setState.bind(this, {photosVisible: !visible})} > <i className={'icon photo'} ></i> показать фото</div>
                }
            </div>
        );
    },

    changeDragPhotoPosition: function(pos){
        if (this.state.dragPhoto == undefined){
            return;
        }
        var a = assign({}, this.state.dragPhoto, {point: pos});
        this.setState({
            dragPhoto: a
        });
    },

    onDragPhotoSave: function(){
        var df = this.state.dragPhoto;
        var d = this.state.imageData;
        var session = this.state.session;
        var data = {
            sessionId: this.props.sessionId,
            lat: df.point.lat,
            lon: df.point.lon,
            url: d.url,
            compressedUrl: d.mini_url,
            userId: session.userId
        }
        this.getFlux().actions.savePhoto(data, function(){
            this.setState({
                imageData: undefined,
                dragPhoto: undefined
            });
        }.bind(this));
    },

    onPhotoDelete: function(url){
        this.getFlux().actions.deletePhoto(url, function(){
            console.log('photo deleted');
        }.bind(this));
    },

    render: function(){
        var points = this.state.points;
        var loading = this.state.loading;
        var session = this.state.session;
        console.log('PlaySessionPanel: render: loading, points = ', loading, points);
        var isEmptySession = (points.length == 0);
        var center = FlyTrackHelper.getCenter(points);
        var speed = this.state.speed;
        var time = this.state.time;
        var dur = time - this.getFirstTime();
        var photos = this.state.photos.map(function(p, k){
            var a = assign({}, p, {point: {lat: p.lat, lon: p.lon}});
            return a;
        });
        var mapPhotos = (this.state.photosVisible == false) ? [] : photos;

        return (
            <div style={this.componentStyle.placeholder} className={'play_session_panel'} >


                {isEmptySession == true ? null :
                    <div className={'map_block'} >
                        <MapboxPanel
                            photos={mapPhotos}
                            center={[center.lon, center.lat]}
                            time={this.state.time}
                            lines={[this.state.line]} markers={[this.getMarker()]}
                            changeDragPhotoPosition={this.changeDragPhotoPosition}
                            dragPhoto={this.state.dragPhoto}
                            onDragPhotoSave={this.onDragPhotoSave}
                            onPhotoDelete={this.onPhotoDelete}
                            />
                    </div>
                }

                <div className={'bottom_block'} >
                    <div className={'controls_block'} >
                        <div className={'play_pause_block'} >
                            <div className={'play_pause_button'} onClick={this.togglePlaying} >
                                <i className={'icon ' + (this.state.playing == true ? ' pause ' : ' play ')} ></i>
                            </div>
                            <div className={'time_string'} >
                                {FlyTrackHelper.getTimerString(dur)}
                            </div>
                        </div>

                        <div className={'speed_block'} >
                            <div onClick={this.setState.bind(this, {speed: 1})} className={'speed_button ' + (speed == 1 ? 'active' : '') } >1x</div>
                            <div onClick={this.setState.bind(this, {speed: 10})} className={'speed_button ' + (speed == 10 ? 'active' : '') } >10x</div>
                            <div onClick={this.setState.bind(this, {speed: 100})} className={'speed_button ' + (speed == 100 ? 'active' : '') } >100x</div>
                        </div>
                    </div>

                    <div className={'heights_block'} >
                        <HeightsPanel
                            activeTime={this.state.time}
                            sessionId={this.props.sessionId} onTimeChange={this.onTimeChange} />
                    </div>

                    <div className={'photos_block'} >
                        {photos.length > 0 ? this.getPhotosSwitcher() : null}

                        <div className={'upload_photo_block'} >
                            {this.getPhotoUploadComponent()}
                        </div>


                    </div>

                </div>


                {loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = PlaySessionPanel;