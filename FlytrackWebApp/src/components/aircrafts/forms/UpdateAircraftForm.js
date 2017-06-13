/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Select from 'react-select';

const options = [
    { value: 'PLANE', label: 'Plane' },
    { value: 'GLIDER', label: 'Glider' },
    { value: 'HELICOPTER', label: 'Helicopter' },
    { value: 'GYROPLANE', label: 'Gyroplane' }
]

class UpdateAircraftForm extends React.Component {

    static defaultProps = {
        onSave: (d) => {
            console.log('UpdateAircraftForm: onSave: d = ', d);
        }
    }

    static propTypes = {}

    state = {
        name: this.props.name,
        aircraftNumber: this.props.aircraftNumber,
        aircraftType: this.props.aircraftType,
        callName: this.props.callName,

        changed: false

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            aircraftNumber: nextProps.aircraftNumber,
            aircraftType: nextProps.aircraftType,
            callName: nextProps.callName
        });
    }

    onSave = () => {
        let {name, aircraftNumber, aircraftType, callName} = this.state;
        let {onSave} = this.props;
        if (this.canSubmit() == false){
            return;
        }
        let data = this.getData();
        onSave(data);
    }

    getData = () => {
        let {name, aircraftNumber, aircraftType, callName} = this.state;
        return {
            name,
            aircraftNumber,
            aircraftType,
            callName,
        }
    }

    canSubmit = () => {
        let {name, aircraftNumber, aircraftType, callName} = this.state;
        if (isEmptyString(name) == true || isEmptyString(aircraftNumber) == true ||
            isEmptyString(aircraftType) == true || isEmptyString(callName) == true){
            return false;
        }
        return true;
    }

    render = () => {
        let {name, aircraftNumber, callName, aircraftType, changed} = this.state;
        let canSubmit = !this.canSubmit();

        return (
            <div className={'update_aircraft_form p10'} >

                <div className={'ui form'} >

                    <div className={'ui four fields'} >
                        <div className={'field'} >
                            <label>
                                Name
                            </label>
                            <input value={name} placeholder={'Name'} onChange={(evt) => {
                                this.setState({
                                    name: evt.target.value,
                                    changed: true
                                });
                            }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Call name
                            </label>
                            <input value={callName} placeholder={'Call name'} onChange={(evt) => {
                                this.setState({
                                    callName: evt.target.value,
                                    changed: true
                                });
                            }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Number
                            </label>
                            <input value={aircraftNumber} placeholder={'Number'} onChange={(evt) => {
                                this.setState({
                                    aircraftNumber: evt.target.value,
                                    changed: true
                                });
                            }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Aircraft type
                            </label>
                            <Select options={options}
                                      onChange={(a) => {
                                        console.log('a = ', a);
                                        this.setState({
                                            aircraftType: a.value,
                                            changed: true
                                        });
                                      }} value={aircraftType} placeholder="Select aircraft type" />
                        </div>

                    </div>


                </div>

                <div className={'mt10'} >
                    <button className={'ui primary button'} onClick={() => {
                        this.onSave();
                    }} >
                        <i className={'icon save'} ></i> Save
                    </button>
                </div>

            </div>
        )
    }

}

let isEmptyString = (s) => {
    return (s == undefined || s.trim() == '');
}

//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//UpdateAircraftForm = connect(mapStateToProps, mapDispatchToProps)(UpdateAircraftForm)

export default UpdateAircraftForm