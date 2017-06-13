/**
 * Created by sabir on 11.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../redux/actions/OrganizationsActions'

import OrganizationEditForm from '../forms/OrganizationEditForm'

import CoolModal from '../../modals/CoolModal'
import CoolPreloader from '../../preloader/CoolPreloader'

class OrganizationsPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {
        selectedOrganizationId: undefined,
        createModalVisible: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadOrganizations();
    }

    componentWillReceiveProps() {

    }

    getSelectedOrganizationComponent = () => {
        let {selectedOrganizationId} = this.state;
        let {createOrganization, updateOrganization, loadOrganizations, deleteOrganization, organizations, loading} = this.props;
        let orgs = organizations.filter((a) => {
            return (selectedOrganizationId == a.id)
        });
        if (orgs.length == 0){
            return null;
        }
        let org = orgs[0];
        return (
            <div>
                <OrganizationEditForm
                    onSave={(d) => {
                        let data = Object.assign({}, org, d);
                        updateOrganization(data).then(
                            () => {
                                this.setState({
                                    selectedOrganizationId: undefined
                                });
                            }
                        )
                    }}
                    {...org}
                />
            </div>
        )
    }

    render = () => {
        let {createOrganization, updateOrganization,
            currentUserId,
            loadOrganizations, deleteOrganization, organizations, loading} = this.props;
        let {selectedOrganizationId, createModalVisible} = this.state;

        return (
            <div className={'organizations_panel p10'} >

                <div className={'add_organization_panel'}  >
                    <button className={'ui button primary'} onClick={() => {
                        this.setState({createModalVisible: true});
                    }} >
                        <i className={'icon plus'} ></i> add airfield
                    </button>
                </div>

                <div className={'mt10'} >
                    <div className={'organizations_list ui cards mt10'} >
                        {organizations.map((org, k) => {
                            let key = 'org_' + k + '_' + org.id;

                            return (
                                <div className={'organization_item card'} key={key} >

                                    <div className={'content'} >
                                        <div className="header">
                                            {org.name}
                                        </div>
                                        <div className="meta" >
                                            <i className={'icon map'} ></i> ({org.lat} ; {org.lon}) | altitude = {org.alt}
                                        </div>
                                        <div className="description" >
                                            {org.description}
                                        </div>
                                    </div>

                                    <div className={'extra content'} >
                                        <button className={'ui fluid basic button'} onClick={() => {
                                            this.setState({
                                                selectedOrganizationId: org.id
                                            });
                                        }} >
                                            <i className={'icon pencil'} ></i> Edit
                                        </button>
                                    </div>

                                </div>
                            )

                        })}
                    </div>
                </div>

                {selectedOrganizationId == undefined ? null :
                    <CoolModal onClose={() => {this.setState({selectedOrganizationId: undefined})}}>
                        <div>
                            {this.getSelectedOrganizationComponent()}
                        </div>
                    </CoolModal>
                }

                {createModalVisible == false ? null :
                    <CoolModal onClose={() => {this.setState({createModalVisible: false})}}>
                        <div>
                            <OrganizationEditForm
                                onSave={(d) => {
                                    let data = Object.assign({}, {adminId: currentUserId}, d);
                                    createOrganization(data).then(
                                        () => {
                                            this.setState({
                                                createModalVisible: false
                                            });
                                        }
                                    );
                                }}
                            />
                        </div>
                    </CoolModal>
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {
       organizations: state.organizations.organizationsMap.toArray().sort((a, b) => {
            return (b.timestamp - a.timestamp);
       }),
       loading: state.organizations.loading,
       currentUserId: state.users.currentUserId
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
       createOrganization: (data) => {
           return dispatch(actions.createOrganization(data));
       },
       updateOrganization: (data) => {
           return dispatch(actions.updateOrganization(data));
       },
       loadOrganizations: () => {
           return dispatch(actions.loadOrganizations())
       },
       deleteOrganization: (id) => {
           return dispatch(actions.deleteOrganization(id))
       }
   }
}

OrganizationsPanel = connect(mapStateToProps, mapDispatchToProps)(OrganizationsPanel)

export default OrganizationsPanel