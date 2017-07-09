/**
 * Created by sabir on 07.07.16.
 */


var React = require('react');
var assign = require('object-assign');

var ParseAPI = require('../../api/ParseAPI');

var CoolPreloader = require('../preloader/CoolPreloader');

var CreateAircraftComponent = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            userId: '',
            aircraftId: '',
            aircraftType: '',
            callName: '',
            name: '',

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

    onUserIdChange: function(evt){
        this.setState({
            userId: evt.target.value
        });
    },

    onAircraftIdChange: function(evt){
        this.setState({
            aircraftId: evt.target.value
        });
    },

    onCallNameChange: function(evt){
        this.setState({
            callName: evt.target.value
        });
    },

    onNameChange: function(evt){
        this.setState({
            name: evt.target.value
        });
    },

    onAircraftTypeChange: function(evt){
        this.setState({
            aircraftType: evt.target.value
        });
    },

    submit: function(){
        var data = {
            userId: this.state.userId,
            name: this.state.name,
            callName: this.state.callName,
            aircraftId: this.state.aircraftId,
            aircraftType: this.state.aircraftType
        };
        this.setState({
            loading: true,
            fireStart: new Date().getTime(),
            fireEnd: 0,
            responseData: undefined,
            responseError: undefined
        });
        var self = this;
        ParseAPI.runCloudFunction('createAircraft', data, function(d){
            console.log('createAircraft: success: d = ', d);
            self.setState({
                responseData: d,
                responseError: undefined,
                loading: false,
                fireEnd: new Date().getTime()
            });
        }, function(err){
            console.log('createAircraft: error: err = ', err);
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
        console.log('rendering CreateAircraftComponent: data, responseError = ', data, responseError);
        var delta = (this.state.fireEnd == 0) ? undefined : (this.state.fireEnd - this.state.fireStart);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={{fontSize: 16, marginBottom: 10, textDecoration: 'underline'}} >
                    <b>createAircraft</b>
                </div>

                <div className={'ui form'} >

                    <i className={'icon caret right'} ></i> <b>userId</b> (String)
                    <input value={this.state.userId} onChange={this.onUserIdChange} placeholder={'userId'} />
                    <br/>
                    <br/>

                    <i className={'icon caret right'} ></i> <b>name</b> (String)
                    <input value={this.state.name} onChange={this.onNameChange} placeholder={'Название судна'} />
                    <br/>
                    <br/>

                    <i className={'icon caret right'} ></i> <b>callName</b> (String)
                    <input value={this.state.callName} onChange={this.onCallNameChange} placeholder={'Позывной судна'} />
                    <br/>
                    <br/>

                    <i className={'icon caret right'} ></i> <b>aircraftType</b> (String)
                    <input value={this.state.aircraftType} onChange={this.onAircraftTypeChange} placeholder={'Тип судна'} />
                    <br/>
                    <br/>

                    <i className={'icon caret right'} ></i> <b>aircraftId</b> (String)
                    <input value={this.state.aircraftId} onChange={this.onAircraftIdChange} placeholder={'Номер судна'} />
                    <br/>
                    <br/>

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

module.exports = CreateAircraftComponent;