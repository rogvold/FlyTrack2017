/**
 * Created by sabir on 11.06.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import OrganizationsAPI from '../../api/OrganizationsAPI';

import {Map} from 'immutable';

let loadOrganizations_ = () => {
    return {
        type: types.LOAD_ORGANIZATIONS
    }
}

let loadOrganizationsFail = (err) => {
    return {
        type: types.LOAD_ORGANIZATIONS_FAIL,
        error: err
    }
}

let loadOrganizationsSuccess = (organizations) => {
    console.log('loadOrganizationsSuccess occured');
    return {
        type: types.LOAD_ORGANIZATIONS_SUCCESS,
        organizations: organizations
    }
}
//thunk
export function loadOrganizations() {
    return (dispatch, getState) => {
        dispatch(loadOrganizations_())
        return ParseAPI.getFreshObjects('Organization', Map(), {}, OrganizationsAPI.transformOrganization).then(
            organizations => dispatch(loadOrganizationsSuccess(organizations))),
            err => dispatch(loadOrganizationsFail(err))
    }
}



//
let createOrganization_ = () => {
    return {
        type: types.CREATE_ORGANIZATION
    }
}

let createOrganizationFail = (err) => {
    return {
        type: types.CREATE_ORGANIZATION_FAIL,
        error: err
    }
}

let createOrganizationSuccess = (organization) => {
    return {
        type: types.CREATE_ORGANIZATION_SUCCESS,
        organization: organization
    }
}

export function createOrganization(data){
    return (dispatch, getState) => {
        if (data == undefined){
            return;
        }
        dispatch(createOrganization_());
        return ParseAPI.createObject('Organization', data, OrganizationsAPI.transformOrganization).then(
            organization => dispatch(createOrganizationSuccess(organization)),
            err => dispatch(createOrganizationFail(err))
        )
    }
}

let updateOrganization_ = () => {
    return {
        type: types.UPDATE_ORGANIZATION
    }
}

let updateOrganizationFail = (err) => {
    return {
        type: types.UPDATE_ORGANIZATION_FAIL,
        error: err
    }
}
let updateOrganizationSuccess = (organization) => {
    return {
        type: types.UPDATE_ORGANIZATION_SUCCESS,
        organization: organization
    }
}
//thunk
export function updateOrganization(data){
    return (dispatch, getState) => {
        dispatch(updateOrganization_());
        return ParseAPI.updateObject('Organization', data, OrganizationsAPI.transformOrganization).then(
            organization => dispatch(updateOrganizationSuccess(organization)),
            err => dispatch(updateOrganizationFail(err))
        )
    }
}

let deleteOrganization_ = () => {
    return {
        type: types.DELETE_ORGANIZATION
    }
}

let deleteOrganizationFail = (err) => {
    return {
        type: types.DELETE_ORGANIZATION_FAIL,
        error: err
    }
}
let deleteOrganizationSuccess = (id) => {
    return {
        type: types.DELETE_ORGANIZATION_SUCCESS,
    }
}
//thunk
export function deleteOrganization(id){
    return (dispatch, getState) => {
        dispatch(deleteOrganization_());
        return ParseAPI.deleteObject('Organization', id).then(
            () => dispatch(deleteOrganizationSuccess(id)),
            err => dispatch(deleteOrganizationFail(err))
        )
    }
}

