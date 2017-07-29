/**
 * Created by sabir on 19.07.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI'
import FormsAPI from '../../api/FormsAPI'

import {Map} from 'immutable';

let loadForms_ = () => {
    return {
        type: types.LOAD_FORMS
    }
}

let loadFormsFail = (err) => {
    return {
        type: types.LOAD_FORMS+File,
        error: err
    }
}
let loadFormsSuccess = (forms) => {
    return {
        type: types.LOAD_FORMS_SUCCESS,
        forms: forms
    }
}
//thunk
export function loadForms(){
    return (dispatch, getState) => {
        dispatch(loadForms_());
        return ParseAPI.getFreshObjects('Form', Map(), {}, FormsAPI.transformForm).then(
            forms => dispatch(loadFormsSuccess(forms)),
            err => dispatch(loadFormsFail(err))
        )
    }
}

//create
let createForm_ = () => {
    return {
        type: types.CREATE_FORM
    }
}

let createFormFail = (err) => {
    return {
        type: types.CREATE_FORM_FAIL,
        error: err
    }
}
let createFormSuccess = (form) => {
    return {
        type: types.CREATE_FORM_SUCCESS,
        form: form
    }
}
//thunk
export function createForm(data){
    return (dispatch, getState) => {
        dispatch(createForm_());
        return ParseAPI.createObject('Form', data, FormsAPI.transformForm).then(
            form => dispatch(createFormSuccess(form)),
            err => dispatch(createFormFail(err))
        )
    }
}

let updateForm_ = () => {
    return {
        type: types.UPDATE_FORM
    }
}

let updateFormFail = (err) => {
    return {
        type: types.UPDATE_FORM_FAIL,
        error: err
    }
}
let updateFormSuccess = (form) => {
    return {
        type: types.UPDATE_FORM_SUCCESS,
        form: form
    }
}
//thunk
export function updateForm(data){
    return (dispatch, getState) => {
        dispatch(updateForm_());
        return ParseAPI.updateObject('Form', data, FormsAPI.transformForm).then(
            form => dispatch(updateFormSuccess(form)),
            err => dispatch(updateFormFail(err))
        )
    }
}

let deleteForm_ = () => {
    return {
        type: types.DELETE_FORM
    }
}

let deleteFormFail = (err) => {
    return {
        type: types.DELETE_FORM_FAIL,
        error: err
    }
}
let deleteFormSuccess = (id) => {
    return {
        type: types.DELETE_FORM_SUCCESS,
        id: id
    }
}
//thunk
export function deleteForm(id){
    return (dispatch, getState) => {
        dispatch(deleteForm_());
        return ParseAPI.deleteObject('Form', id).then(
            () => dispatch(deleteFormSuccess(id)),
            err => dispatch(deleteFormFail(err))
        )
    }
}

//organization
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
    return {
        type: types.LOAD_ORGANIZATIONS_SUCCESS,
        organizations: organizations
    }
}
//thunk
export function loadOrganizations(){
    return (dispatch, getState) => {
        dispatch(loadOrganizations_());
        return ParseAPI.getFreshObjects('Organization', Map(), {}, FormsAPI.transformOrganization).then(
            organizations => dispatch(loadOrganizationsSuccess(organizations)),
            err => dispatch(loadOrganizationsFail(err))
        )
    }
}

