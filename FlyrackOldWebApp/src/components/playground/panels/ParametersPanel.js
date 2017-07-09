/**
 * Created by sabir on 05.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParametersPanel = React.createClass({
    getDefaultProps: function () {
        return {

            parameters: [],

            editable: true,

            onChange: function(data){
                console.log('parametersPanel: onChange: data = ', data);
            }

        }
    },

    getInitialState: function () {
        return {
            paramsValsMap: {}}

    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            lineHeight: '12px',
            //maxWidth: 290,
            margin: '0 auto',
            paddingRight: 10
            //backgroundColor: 'white'
        },

        listPlaceholder: {

        },

        item: {
            marginTop: 10
        },

        name: {
            //padding: 10,
            fontWeight: 'bold',
            paddingTop: 10,
            paddingBottom: 10
        },

        description: {
            opacity: 0.6,
            fontSize: 12,
            marginBottom: 5
        },

        inputPlaceholder: {

        }


    },

    getData: function(){
        var data = {};
        var map = this.state.paramsValsMap;
        var parameters = this.props.parameters;
        for (var key in map){
            var k = +key;
            var val = map[key];
            if (val == undefined){
                continue;
            }
            var name = parameters[k].name;
            var paramType = parameters[k].paramType;
            var isRequired = parameters[k].isRequired;
            if (paramType == 'number'){
                if (val.trim() == '' || isNaN(val) == true){
                    val = undefined;
                }else {
                    val = +val;
                }
            }else {
                if (isRequired == true && val.trim() == ''){
                    val = undefined;
                }
            }

            if (val != undefined){
                data[name] = val;
            }
        }
        return data;
    },


    onParamChange: function(k, evt){
        var paramsValsMap = this.state.paramsValsMap;
        var key = k + '';
        paramsValsMap[key] = evt.target.value;
        this.setState({
            paramsValsMap: paramsValsMap
        });
        setTimeout(function(){
            this.props.onChange(this.getData());
        }.bind(this), 10);
    },

    render: function () {
        var list = this.props.parameters;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder} className={'ui form'} >

                    {list.map(function(p, k){
                        var key = 'param_' + k;
                        var val = this.state.paramsValsMap[k + ''];
                        var onChange = this.onParamChange.bind(this, k);

                        return (
                            <div style={this.componentStyle.item} key={key} >

                                <div style={this.componentStyle.name}>
                                    <b style={{textDecoration: 'underline'}}>
                                        {p.name}
                                    </b>
                                    <span style={{float: 'right', opacity: 0.5}} >
                                        <b style={{marginRight: 5}} >
                                            {p.paramType}
                                        </b>
                                        <span style={{opacity: 0.6, fontWeight: 'normal'}} >
                                            {p.isRequired == true ?
                                                <span style={{color: '#B71C1C'}} >(required)</span> :
                                                <span>(optional)</span>
                                            }
                                        </span>
                                    </span>
                                </div>
                                <div style={this.componentStyle.description}>
                                    {p.description}
                                </div>

                                {this.props.editable == false ? null :
                                    <div style={this.componentStyle.inputPlaceholder}>
                                        <div className={'field'} >
                                            <input value={val} placeholder={p.name} onChange={onChange} />
                                        </div>
                                    </div>

                                }

                            </div>
                        );


                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = ParametersPanel;