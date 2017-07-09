/**
 * Created by sabir on 21.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParseAPI = require('../../../api/ParseAPI');

var GoogleMapStaticImage = require('./GoogleMapStaticImage');

var SessionPreviewPanel = React.createClass({
    getDefaultProps: function () {
        return {
            sessionId: undefined
        }
    },

    getInitialState: function () {
        return {
            loading: false,
            url: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },

    load: function(){
        this.setState({
            loading: true
        });
        ParseAPI.runCloudFunction("loadSessionGoogleMapsString", {sessionId: this.props.sessionId}, function(s){
            this.setState({
                //url: 'https://maps.googleapis.com/maps/api/staticmap?size=400x300&path=color:0x0000ff|weight:5' + s,
                mapString: s,
                loading: false
            });
        }.bind(this));
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <button onClick={this.load} className={'ui patientPrimary button'} >
                    load session {this.props.sessionId}
                </button>

                {this.state.mapString == undefined ? null :
                    <div style={{width: '100%', height: '100%'}} >
                        <GoogleMapStaticImage mapString={this.state.mapString} />
                    </div>
                }

                {this.state.loading == false ? null :
                    <span>loading....</span>
                }

            </div>
        );
    }

});

module.exports = SessionPreviewPanel;