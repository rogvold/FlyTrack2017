/**
 * Created by sabir on 19.07.17.
 */

import {Map, Stack, Set} from 'immutable'
import * as types from '../ActionTypes.js'

const initialState = {
    loading: false,
    formsMap: Map(),
    organizationsMap: Map(),
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const PhotosReducer =  (state = initialState, action = {}) => {

    switch (action.type) {


        case types.CREATE_FORM:
        case types.UPDATE_FORM:
        case types.DELETE_FORM:
        case types.LOAD_FORMS:
        case types.LOAD_ORGANIZATIONS:
            return {
                ...state,
                loading: true,
                error: undefined
            }

        case types.CREATE_FORM_FAIL:
        case types.UPDATE_FORM_FAIL:
        case types.DELETE_FORM_FAIL:
        case types.LOAD_FORMS_FAIL:
        case types.LOAD_ORGANIZATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case types.CREATE_FORM_SUCCESS:
        case types.UPDATE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                formsMap: state.formsMap.set(action.form.id, action.form)
            }

        case types.DELETE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                formsMap: state.formsMap.delete(action.id)
            }

        case types.LOAD_FORMS_SUCCESS:
            return {
                ...state,
                loading: false,
                formsMap: state.formsMap
                                .merge(action.forms.reduce((map, form) => map.set(form.id, form), Map()))
            }

        case types.LOAD_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                organizationsMap: state.organizationsMap
                                       .merge(action.organizations.reduce((map, org) => map.set(org.id, org), Map()))
            }

        default:
            return state;
    }

}

export default PhotosReducer;