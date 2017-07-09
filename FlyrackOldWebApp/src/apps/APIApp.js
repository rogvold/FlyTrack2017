/**
 * Created by sabir on 18.09.16.
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

var PlaygroundPanel = require('../components/playground/PlaygroundPanel');

var BackgroundImageContainer = require('../components/image/BackgroundImageContainer');

var APIApp = React.createClass({
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

        },

        topAdPlaceholder: {
            height: 280,
            width: '100%',
            position: 'relative'
        }

    },


    render: function(){
        var image = 'assets/images/api_background.png';

        return (
            <div>
                <div style={this.componentStyle.topAdPlaceholder}>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1}}>
                        <BackgroundImageContainer image={image} />
                    </div>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 2, background: 'rgba(0, 0, 0, 0.1)'}}>
                        <div style={{paddingTop: 100, lineHeight: '80px', fontSize: 64, color: 'white', textAlign: 'center'}} >
                            FlyTrack API Playground
                        </div>
                    </div>

                </div>

                <PlaygroundPanel />

            </div>
        );
    }

});

module.exports = APIApp;