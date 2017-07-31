/**
 * Created by sabir on 10.06.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import AircraftsAPI from '../../api/AircraftsAPI';

import {Map} from 'immutable'

let loadAircrafts_ = () => {
    return {
        type: types.LOAD_AIRCRAFTS
    }
}

let loadAircraftsFail = (err) => {
    return {
        type: types.LOAD_AIRCRAFTS_FAIL,
        error: err
    }
}

let loadAircraftsSuccess = (aircrafts) => {
    return {
        type: types.LOAD_AIRCRAFTS_SUCCESS,
        aircrafts: aircrafts
    }
}
//thunk
export function loadUsersAircrafts(usersIds) {
    return (dispatch, getState) => {
        dispatch(loadAircrafts_());
        if (usersIds == undefined || usersIds.length == 0){
            usersIds = [getState().users.currentUserId];
        }
        // return ParseAPI.getFreshObjects('Aircraft', Map(), {containedIn: [['userId', usersIds]]}, AircraftsAPI.transformAircraft).then(
        //loading all aircrafts in the system - used in generator
        //todo: uncomment the line above
        return ParseAPI.getFreshObjects('Aircraft', Map(), {}, AircraftsAPI.transformAircraft).then(
            aircrafts => dispatch(loadAircraftsSuccess(aircrafts))),
            err => dispatch(loadAircraftsFail(err))
    }
}

//create
let createAircraft_ = () => {
    return {
        type: types.CREATE_AIRCRAFT
    }
}

let createAircraftFail = (err) => {
    return {
        type: types.CREATE_AIRCRAFT_FAIL,
        error: err
    }
}

let createAircraftSuccess = (aircraft) => {
    return {
        type: types.CREATE_AIRCRAFT_SUCCESS,
        aircraft: aircraft
    }
}

export function createAircraft(data){
    return (dispatch, getState) => {
        data.userId = getState().users.currentUserId;
        if (data == undefined || data.userId == undefined){
            return;
        }
        console.log('createAircraft occured: data = ', data);
        dispatch(createAircraft_());
        return ParseAPI.createObject('Aircraft', data, AircraftsAPI.transformAircraft).then(
            aircraft => dispatch(createAircraftSuccess(aircraft)),
            err => dispatch(createAircraftFail(err))
        )
    }
}

let updateAircraft_ = () => {
    return {
        type: types.UPDATE_AIRCRAFT
    }
}

let updateAircraftFail = (err) => {
    return {
        type: types.UPDATE_AIRCRAFT_FAIL,
        error: err
    }
}
let updateAircraftSuccess = (aircraft) => {
    return {
        type: types.UPDATE_AIRCRAFT_SUCCESS,
        aircraft: aircraft
    }
}
//thunk
export function updateAircraft(data){
    return (dispatch, getState) => {
        dispatch(updateAircraft_());
        return ParseAPI.updateObject('Aircraft', data, AircraftsAPI.transformAircraft).then(
            aircraft => dispatch(updateAircraftSuccess(aircraft)),
            err => dispatch(updateAircraftFail(err))
        )
    }
}

let deleteAircraft_ = () => {
    return {
        type: types.DELETE_AIRCRAFT
    }
}

let deleteAircraftFail = (err) => {
    return {
        type: types.DELETE_AIRCRAFT_FAIL,
        error: err
    }
}
let deleteAircraftSuccess = (id) => {
    return {
        type: types.DELETE_AIRCRAFT_SUCCESS,
        id: id
    }
}
//thunk
export function deleteAircraft(id){
    return (dispatch, getState) => {
        dispatch(updateAircraft_());
        let data = {id: id, deleted: true};
        return ParseAPI.updateObject('Aircraft', data, AircraftsAPI.transformAircraft).then(
            a => dispatch(updateAircraftSuccess(id)),
            err => dispatch(updateAircraftFail(err))
        )
    }
}

export function selectAircraft(id){
    return (dispatch, getState) => {
        return dispatch({
            type: types.SELECT_AIRCRAFT,
            id: id
        })
    }
}