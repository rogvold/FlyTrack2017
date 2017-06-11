/**
 * Created by sabir on 10.06.17.
 */

import * as types from '../ActionTypes'

import {Map} from 'immutable'

const initialState = {
    loading: false,
    organizationsMap: Map(),
    error: undefined,
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}


const OrganizationsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_ORGANIZATIONS:
        case types.UPDATE_ORGANIZATION:
        case types.DELETE_ORGANIZATION:
        case types.CREATE_ORGANIZATION:
            return startLoading(state, action)

        case types.LOAD_ORGANIZATIONS_FAIL:
        case types.UPDATE_ORGANIZATION_FAIL:
        case types.DELETE_ORGANIZATION_FAIL:
        case types.CREATE_ORGANIZATION_FAIL:
            return stopLoading(state, action)

        case types.LOAD_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                organizationsMap: state.organizationsMap.merge(action.organizations.reduce((res, u) => {return res.set(u.id, u)}, Map()))
            }

        case types.CREATE_ORGANIZATION_SUCCESS:
        case types.UPDATE_ORGANIZATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                organizationsMap: state.organizationsMap.set(action.organization.id, action.organization)
            }

        case types.DELETE_ORGANIZATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                organizationsMap: state.organizationsMap.delete(action.id)
            }

        default:
            return state;
    }

}

export default OrganizationsReducer