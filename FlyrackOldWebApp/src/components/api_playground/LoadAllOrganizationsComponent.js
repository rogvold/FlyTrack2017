/**
 * Created by sabir on 06.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var ParseAPI = require('../../api/ParseAPI');

var CoolPreloader = require('../preloader/CoolPreloader');

var LoadAllOrganizationsComponent = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {


            responseError: undefined,
            responseData: undefined,
            loading: false,
            fireStart: 0,
            fireEnd: 0
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            border: 'lightgrey',
            width: 760,
            margin: '0 auto',
            marginTop: 20
        },

        resultJsonTextareaPlaceholder: {
            marginTop: 20
        }

    },

    submit: function(){
        var data = {

        };
        this.setState({
            loading: true,
            fireStart: new Date().getTime(),
            fireEnd: 0,
            responseData: undefined,
            responseError: undefined
        });
        var self = this;
        ParseAPI.runCloudFunction('loadAllOrganizations', data, function(d){
            console.log('loadAllOrganizations: success: d = ', d);
            self.setState({
                responseData: d,
                responseError: undefined,
                loading: false,
                fireEnd: new Date().getTime()
            });
        }, function(err){
            console.log('activateCode: error: err = ', err);
            self.setState({
                responseData: undefined,
                responseError: err,
                loading: false,
                fireEnd: new Date().getTime()
            });
        });
    },

    render: function () {
        var data = this.state.responseData;
        var responseError = this.state.responseError;
        console.log('rendering LoadAllOrganizationsComponent: data, responseError = ', data, responseError);
        var delta = (this.state.fireEnd == 0) ? undefined : (this.state.fireEnd - this.state.fireStart);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={{fontSize: 16, marginBottom: 10, textDecoration: 'underline'}} >
                    <b>loadAllOrganizations</b>
                </div>

                <div className={'ui form'} >

                    <button disabled={this.state.loading} className={'ui patientPrimary button'} onClick={this.submit} >
                        <i className={'icon cloud'} ></i>
                        {this.state.loading == false ?
                            <span>Отправить!</span> : <span>Загрузка...</span>
                        }
                    </button>

                </div>

                <div>
                    {delta == undefined ? null :
                        <div style={{marginTop: 10, paddingTop: 10, borderTop: '1px solid whitesmoke'}} >

                                <span>
                                    Время выполнения:
                                    <b style={{marginLeft: 5}} >
                                        <span>{Math.floor(delta / 1000.0)}</span>.<span>{Math.floor(delta % 1000)}</span> s
                                    </b>
                                </span>

                        </div>
                    }

                    {data == undefined ? null :
                        <div style={this.componentStyle.resultJsonTextareaPlaceholder} className={'ui form'} >
                            Ответ:
                            <textarea value={JSON.stringify(data)}></textarea>
                        </div>
                    }

                    {responseError == undefined ? null :
                        <div className={'ui error message'} >
                            <div className={'header'}>
                                {responseError.message}
                            </div>
                            <p>
                                Код ошибки: <b>{responseError.code}</b>
                            </p>
                        </div>
                    }
                </div>

            </div>
        );
    }

});

module.exports = LoadAllOrganizationsComponent;