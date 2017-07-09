/**
 * Created by sabir on 21.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var FacebookPreloader = React.createClass({
    getDefaultProps: function () {
        return {
            numberOfPosts: 3
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
            width: '100%'
        }
    },

    render: function () {
        var url = 'assets/images/fb_loading.gif';
        var list = [];
        for (var i = 0; i < this.props.numberOfPosts; i++){
            list.push(url);
        }


        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(u, k){
                    var key = 'preloader_' + k;

                    return (
                        <div key={key} style={{marginBottom: 5, marginTop: 5, width: '100%'}} >
                            <img src={u} style={{width: '100%'}} />
                        </div>
                    );

                })}

            </div>
        );
    }

});

module.exports = FacebookPreloader;