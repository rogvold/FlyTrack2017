/**
 * Created by sabir on 05.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParametersPanel = require('./ParametersPanel');

var HeadersPanel = React.createClass({
    getDefaultProps: function () {
        return {
            headers: [],

            onChange: function(newHeaders){
                console.log('HeadersPanel: onChange: newHeaders = ', newHeaders);
            }

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

        },

        headersPlaceholder: {

        },

        parametersPlaceholder: {

        }
    },

    getChangableHeaders: function(){
        var arr = [];
        var headers = this.props.headers;
        for (var i in headers){
            var h = headers[i];
            if (h.value == undefined || h.value.trim() == ''){
                arr.push({
                    isRequired: true,
                    name: h.name,
                    paramType: 'string'
                });
            }
        }
        return arr;
    },

    getNotChangableHeaders: function(){
        var arr = [];
        var headers = this.props.headers;
        for (var i in headers){
            var h = headers[i];
            if (h.value == undefined || h.value.trim() == ''){
                continue;
            }
            arr.push(h);
        }
        return arr;
    },

    onChange: function(data){
        if (data == undefined){
            return undefined;
        }
        var newHeaders = this.props.headers;

        for (var i in newHeaders){
            var h = newHeaders[i];
            var name = h.name;
            if (data[name] != undefined){
                newHeaders[i].value = data[name];
            }
        }

        this.props.onChange(newHeaders);

    },

    render: function () {
        var headers = this.getNotChangableHeaders();
        var parameters = this.getChangableHeaders();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.headersPlaceholder}>
                    {headers.map(function(h, k){
                        var key = 'h_' + k;


                        return (
                            <div key={key} style={{padding: 5, paddingLeft: 0}} >
                                <div>
                                    <b>{h.name}</b>
                                </div>
                                <div>
                                    {h.value}
                                </div>
                            </div>
                        );

                    }, this)}
                </div>


                {parameters.length == 0 ? null :

                    <div style={this.componentStyle.parametersPlaceholder}>
                        <ParametersPanel parameters={parameters} onChange={this.onChange} />
                    </div>

                }



            </div>
        );
    }

});

module.exports = HeadersPanel;