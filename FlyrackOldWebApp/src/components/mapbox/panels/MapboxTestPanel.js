/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var MapboxPanel = require('./MapboxPanel');

var FlyTrackHelper = require('../../../helpers/FlyTrackHelper');

var MapboxTestPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            selectedId: undefined,
            markers: [],
            lines: []
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var data = FlyTrackHelper.generateRandomData();
        setTimeout(function(){
            this.setState({
                markers: data.markers,
                lines: data.lines
            });
        }.bind(this), 400);

    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },



    select: function(id){
        if (this.state.selectedId == id){
            this.setState({
                selectedId: undefined
            });
            return;
        }
        this.setState({
            selectedId: id,
            hoverSelectedId: id
        });
    },

    hoverSelect: function(id){

    },

    render: function () {


        return (
            <div style={this.componentStyle.placeholder}>
                <MapboxPanel markers={this.state.markers}
                             lines={this.state.lines}

                             onMarkerClick={this.select}

                             onLineClick={this.select}
                             selectedId={this.state.selectedId}

                    />
            </div>
        );
    }

});

module.exports = MapboxTestPanel;