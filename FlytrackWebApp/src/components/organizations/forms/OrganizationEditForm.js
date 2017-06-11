/**
 * Created by sabir on 11.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class OrganizationEditForm extends React.Component {

    static defaultProps = {
        onSave: (d) => {
            console.log('props: onSave: data = ', d);
        }
    }

    static propTypes = {}

    state = {
        name: this.props.name,
        adminId: this.props.adminId,
        description: this.props.description,
        freq: this.props.freq,
        lat: this.props.lat,
        lon: this.props.lon,
        alt: this.props.alt,
        backgroundImg: this.props.backgroundImg,
        code: this.props.code,

        changed: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let {name, adminId, description, freq, lat, lon, alt, backgroundImg, code} = nextProps;
        this.setState({name, adminId, description, freq, lat, lon, alt, backgroundImg, code, changed: false});
    }

    onSave = () => {
        let {name, adminId, description, freq, lat, lon, alt, backgroundImg, code} = this.state;
        let {onSave} = this.props;
        if (this.canSubmit() == false){
            return;
        }
        let data = this.getData();
        onSave(data);
    }

    getData = () => {
        let {name, adminId, description, freq, lat, lon, alt, backgroundImg, code} = this.state;
        return {
            name,
            adminId,
            description,
            freq,
            lat: +lat,
            lon: +lon,
            alt: +alt,
            backgroundImg,
            code
        }
    }

    canSubmit = () => {
        let {name, adminId, description, freq, lat, lon, alt, backgroundImg, code} = this.state;
        if (isEmptyString(name) == true || isEmptyString(code) == true){
            return false;
        }
        if (isNaN(lat) == true || isNaN(lon) == true || isNaN(alt) == true){
            return false;
        }
        return true;
    }

    render = () => {
        let {name, adminId, description, freq, lat, lon, alt, backgroundImg, code, changed} = this.state;
        let canSubmit = this.canSubmit();

        return (
            <div className={'organization_edit_form p10'} >

                <div className={'ui form'} >

                    <div className={'field'} >
                        <label>
                            Name
                        </label>
                        <input value={name}
                               placeholder={'Name of the airfield'}
                               onChange={(evt) => {
                                    this.setState({
                                        name: evt.target.value,
                                        changed: true
                                    });
                        }} />
                    </div>

                    <div className={'field'} >
                        <label>
                            Description
                        </label>
                        <textarea value={description}
                                  placeholder={'Description of the airfield'}
                                   onChange={(evt) => {
                                       this.setState({
                                           description: evt.target.value,
                                           changed: true
                                       });
                                   }} ></textarea>
                    </div>


                    <div className={'five fields'} >

                        <div className={'field'} >
                            <label>
                                Frequency
                            </label>
                            <input value={freq}
                                   placeholder={'Frequency'}
                                   onChange={(evt) => {
                                       this.setState({
                                           freq: evt.target.value,
                                           changed: true
                                       });
                                   }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Code
                            </label>
                            <input value={code}
                                   placeholder={'Code'}
                                   onChange={(evt) => {
                                       this.setState({
                                           code: evt.target.value,
                                           changed: true
                                       });
                                   }} />
                        </div>

                        <div className={'field'} >
                            <label>
                                Latitude
                            </label>
                            <input value={lat}
                                   placeholder={'Latitude'}
                                   onChange={(evt) => {
                                       this.setState({
                                           lat: evt.target.value,
                                           changed: true
                                       });
                                   }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Longitude
                            </label>
                            <input value={lon}
                                   placeholder={'Longitude'}
                                   onChange={(evt) => {
                                       this.setState({
                                           lon: evt.target.value,
                                           changed: true
                                       });
                                   }} />
                        </div>
                        <div className={'field'} >
                            <label>
                                Altitude
                            </label>
                            <input value={alt}
                                   placeholder={'Altitude'}
                                   onChange={(evt) => {
                                       this.setState({
                                           alt: evt.target.value,
                                           changed: true
                                       });
                                   }} />
                        </div>

                    </div>


                    <div className={'mt10'} >
                        <button disabled={!canSubmit} className={'ui primary button'} onClick={() => {
                            this.onSave();
                        }} >
                            <i className={'icon save'} ></i>
                            Save
                        </button>
                    </div>

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

//OrganizationEditForm = connect(mapStateToProps, mapDispatchToProps)(OrganizationEditForm)

export default OrganizationEditForm