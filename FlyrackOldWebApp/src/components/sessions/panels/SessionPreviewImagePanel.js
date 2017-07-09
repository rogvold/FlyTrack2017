/**
 * Created by sabir on 21.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');
var CollagePanel = require('../../image/CollagePanel');
var GoogleMapStaticImage = require('./GoogleMapStaticImage');


var SessionPreviewImagePanel = React.createClass({
    getDefaultProps: function () {
        return {
            session: {
                mapString: undefined,
                id: undefined
            },
            images: []
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            height: '100%',
            width: '100%'
        },

        left: {
            width: '60%',
            verticalAlign: 'top',
            height: '100%',
            display: 'inline-block'
        },

        right: {
            width: '40%',
            verticalAlign: 'top',
            height: '100%',
            display: 'inline-block'
        }


    },

    render: function () {
        var session = this.props.session;
        if (session == undefined){
            return null;
        }

        var images = this.props.images;

        if (images == undefined || images.length == 0){
            return (
                <div style={this.componentStyle.placeholder}>
                    <GoogleMapStaticImage sessionId={session.id} mapString={session.mapString} />
                </div>
            );
        }

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>
                    <GoogleMapStaticImage width={500} height={500} sessionId={session.id} mapString={session.mapString} />
                </div>

                <div style={this.componentStyle.right}>
                    <CollagePanel images={images} />
                </div>

            </div>
        );
    }

});

module.exports = SessionPreviewImagePanel;