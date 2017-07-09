/**
 * Created by sabir on 21.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var PlaySessionWrapper = require('../buttons/PlaySessionWrapper');

var GoogleMapStaticImage = React.createClass({
    getDefaultProps: function () {
        return {
            sessionId: undefined,
            mapString: undefined,
            width: 550,
            height: 300,
            color: '0000ff',
            //color: '285473',
            //color: '1A237E',
            weight: 5,

            enableViewOnClick: true

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
            width: '100%',
            height: '100%'
        }
    },

    getUrl: function(){
        if (this.props.mapString == undefined){
            return ('http://share.flytrack.net/map/track3.php?sessionId=' + this.props.sessionId + '&w=' + this.props.width +'&h=' + this.props.height + '&color=' + this.props.color +'&weight=' + this.props.weight);
        }

        var s = 'http://maps.googleapis.com/maps/api/staticmap?size='
            + this.props.width + 'x' + this.props.height + '&path=color:0x' + this.props.color
            //+ '|weight:' + this.props.weight + '|' + this.props.mapString + '';
            + '|weight:' + this.props.weight + '|' + this.props.mapString + '&key=' + 'AIzaSyDic5vM_UsxBbSjVLDtFZNak0SvBYDd1pQ';
        return s;
    },

    render: function () {
        var url = this.getUrl();


        return (
            <div style={this.componentStyle.placeholder}>
                {this.props.enableViewOnClick == false ?
                    <BackgroundImageContainer image={url} /> :
                    <PlaySessionWrapper
                        extStyle={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%'
                                  }}
                        sessionId={this.props.sessionId} style={{width: '100%', height: '100%', cursor: 'pointer', display: 'block'}} >
                        <BackgroundImageContainer image={url} />
                    </PlaySessionWrapper>
                }

            </div>
        );
    }

});

module.exports = GoogleMapStaticImage;