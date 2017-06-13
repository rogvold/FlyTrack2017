/**
 * Created by sabir on 12.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../redux/actions/AircraftsActions'

import CoolModal from '../../modals/CoolModal'

import moment from 'moment';

import UpdateAircraftForm from '../forms/UpdateAircraftForm'

import CoolPreloader from '../../preloader/CoolPreloader'

class AircraftsPanel extends React.Component {

    static defaultProps = {
        userId: undefined
    }

    static propTypes = {}

    state = {
        createModalVisible: false,
        selectedAircraftId: undefined
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let {loadUserAircrafts, currentUserId, userId} = this.props;
        if (userId == undefined){
            userId = currentUserId;
        }
        loadUserAircrafts(userId);
    }

    componentWillReceiveProps() {

    }

    getSelectedAircraft = () => {
        let {loading, aircrafts, userId, currentUserId, createAircraft} = this.props;
        let {selectedAircraftId} = this.state;
        let crfts = aircrafts.filter((a) => {
            return (a.id == selectedAircraftId);
        });
        if (crfts.length == 0){
            return undefined;
        }
        return crfts[0];
    }

    render = () => {
        let {loading, aircrafts, userId, currentUserId, createAircraft, updateAircraft} = this.props;
        let {createModalVisible, selectedAircraftId} = this.state;
        if (userId == undefined){
            userId = currentUserId;
        }
        let selectedAircraft = this.getSelectedAircraft();


        return (
            <div className={'aircrafts_panel p10'} >

                <div className={''} >
                    <button className={'ui button primary'} onClick={() => {
                        this.setState({
                            createModalVisible: true
                        });
                    }} >
                        <i className={'icon plus'} ></i>  add aircraft
                    </button>
                </div>

                <div className={'aircrafts_list ui cards mt10'} >

                    {aircrafts.map((a, k) => {
                        let key = 'a_' + k + '_' + a.id;

                        return (
                            <div className={'card pointer'} key={key} onClick={() => {
                                this.setState({
                                    selectedAircraftId: a.id
                                });
                            }} >

                                <div className={'content'} >
                                    <div className={'header'} >
                                        {a.name}
                                    </div>
                                    <div className={'meta'} >
                                        <i className={'icon calendar'} ></i>
                                        {moment(a.timestamp).format('DD.MM.YYYY HH:mm')}
                                    </div>
                                    <div className={'description'} >
                                        <i className={'icon tasks'} ></i> номер: {a.aircraftNumber} |
                                        позывной: {a.callName} |
                                        тип: {a.aircraftType}
                                    </div>
                                </div>

                                <div className={'extra content'} >

                                </div>

                            </div>
                        )

                    })}

                </div>

                {loading == false ? null : <CoolPreloader />}

                {createModalVisible == false ? null :
                    <CoolModal onClose={() => {
                        this.setState({
                            createModalVisible: false
                        });
                    }} >

                        <UpdateAircraftForm
                            onSave={(d) => {
                                let data = Object.assign({}, {userId: userId}, d);
                                console.log('onSave: data = ', data);
                                createAircraft(data).then(
                                    () => {
                                        this.setState({
                                            createModalVisible: false
                                        });
                                    }
                                )
                            }}
                        />

                    </CoolModal>
                }

                {selectedAircraft == undefined ? null :
                    <CoolModal onClose={() => {
                        this.setState({
                            selectedAircraftId: undefined
                        });
                    }} >

                        <UpdateAircraftForm
                            {...selectedAircraft}
                            onSave={(d) => {
                                let data = Object.assign({}, {id: selectedAircraft.id}, d);
                                console.log('onSave: data = ', data);
                                updateAircraft(data).then(
                                    () => {
                                        this.setState({
                                            selectedAircraftId: undefined
                                        });
                                    }
                                )
                            }}
                        />

                        {loading == false ? null : <CoolPreloader />}

                    </CoolModal>
                }

            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
   return {
       currentUserId: state.users.currentUserId,
       loading: state.aircrafts.loading,
       aircrafts: state.aircrafts.aircraftsMap.toArray().filter((a) => {
           let {userId} = ownProps;
           if (userId == undefined){
               userId = state.users.currentUserId;
           }
           return (a.userId == userId)
       }).sort((a, b) => {
           return (b.timestamp - a.timestamp);
       })
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       loadUserAircrafts: (userId) => {
           return dispatch(actions.loadUsersAircrafts([userId]))
       },
       createAircraft: (data) => {
           return dispatch(actions.createAircraft(data))
       },
       updateAircraft: (data) => {
           return dispatch(actions.updateAircraft(data))
       }
   }
}

AircraftsPanel = connect(mapStateToProps, mapDispatchToProps)(AircraftsPanel)

export default AircraftsPanel