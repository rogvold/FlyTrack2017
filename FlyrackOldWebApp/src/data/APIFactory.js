/**
 * Created by sabir on 05.09.16.
 */

var constants = require('../constants');

var APIFactory = {

    self: this,

    BASE: 'http://api.parse.com/1/functions/',

    DEFAULT_HEADERS: [{
        name: 'X-Parse-Application-Id',
        value: constants.PARSE_APP_ID
    }, {
        name: 'X-Parse-REST-API-Key',
        value: constants.PARSE_REST_API_KEY
    },
        {
            name: 'Content-Type',
            value: 'application/json'
        }
    ],

    SIGN_IN: {
        name: 'login',
        description: 'login',
        requestType: 'GET',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email of user',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'password of user',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    SIGN_UP: {
        name: 'signup',
        description: 'sign up',
        requestType: 'POST',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email of user',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'password of user',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    UPDATE_USER: {
        name: 'updateUser',
        description: 'update user',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'firstName',
            description: 'имя ',
            isRequired: false,
            paramType: 'string'
        },
            {
                name: 'lastName',
                description: 'фамилия',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'organizationId',
                description: 'organization id',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'avatar',
                description: 'avatar url',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'phone',
                description: 'phone',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'aboutMe',
                description: 'about me',
                isRequired: false,
                paramType: 'string'
            }
        ]
    },

    CREATE_AIRCRAFT: {
        name: 'createAircraft',
        description: 'create aircraft',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'name',
            description: 'имя авиасудна',
            isRequired: true,
            paramType: 'string'
            },
            {
                name: 'callName',
                description: 'позывной авиасудна',
                isRequired: true,
                paramType: 'string'
            },
            {
                name: 'aircraftId',
                description: 'номер авиасудна',
                isRequired: true,
                paramType: 'string'
            },
            {
                name: 'aircraftType',
                description: 'тип авиасудна',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    GET_USER: {
        name: 'getUser',
        description: 'get current user',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: []
    },

    UPDATE_AIRCRAFT: {
        name: 'updateAircraft',
        description: 'update aircraft',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            description: 'id авиасудна',
            isRequired: true,
            paramType: 'string'
        },{
            name: 'name',
            description: 'имя авиасудна',
            isRequired: false,
            paramType: 'string'
        },
            {
                name: 'callName',
                description: 'позывной авиасудна',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'aircraftId',
                description: 'номер авиасудна',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'aircraftType',
                description: 'тип авиасудна',
                isRequired: false,
                paramType: 'string'
            }
        ]
    },

    DELETE_AIRCRAFT: {
        name: 'deleteAircraft',
        description: 'delete aircraft',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            description: 'id авиасудна',
            isRequired: true,
            paramType: 'string'
            }]
    },

    LOAD_USER_AIRCRAFTS: {
        name: 'getUserAircrafts',
        description: 'load user aircrafts',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: []
    },

    GET_ALL_ORGANIZATIONS: {
        name: 'getAllOrganizations',
        description: 'load all organizations',
        requestType: 'POST',
        headers: [],
        parameters: []
    }


};

module.exports = APIFactory;