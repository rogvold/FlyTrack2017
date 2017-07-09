/**
 * Created by sabir on 08.07.16.
 */
var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');


/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');

//api
var UserAPI = require('../api/UserAPI');

var DraftPanel = require('../components/editor/DraftPanel');

var GoogleMap = require('react-google-maps').GoogleMap;
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;

var ReactMapboxGl = require("react-mapbox-gl");
var Layer = ReactMapboxGl.Layer;
var Feature = ReactMapboxGl.Feature;
var Popup = ReactMapboxGl.Popup;
var ZoomControl = ReactMapboxGl.ZoomControl;

var MapboxSamplePanel = require('../components/mapbox/MapboxSamplePanel');
var MapboxPanel = require('../components/mapbox/panels/MapboxPanel');
var MapboxTestPanel = require('../components/mapbox/panels/MapboxTestPanel');

var PusherTestPanel = require('../components/pusher/PusherTestPanel');

var AirSessionMapboxPanel = require('../components/mapbox/panels/AirSessionMapboxPanel');

//var webpage = require('webp');

var UserSessionsPanel = require('../components/sessions/list/UserSessionsPanel');

var BackgroundImageContainer = require('../components/image/BackgroundImageContainer');

var CollagePanel = require('../components/image/CollagePanel');

var PusherMapboxTestPanel = require('../components/pusher/PusherMapboxTestPanel');

var DevRealtimeApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {

        }
    },


    render: function(){

        return (
            <div>

                <PusherMapboxTestPanel />

            </div>
        );
    }

});

module.exports = DevRealtimeApp;