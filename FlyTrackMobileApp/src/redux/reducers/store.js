/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../constants/mvConsts'
import * as dictionary from '../../constants/dictionary'

import * as types from '../ActionTypes'

const initialState = {
    isAutorized: true,
    screenName: mvConsts.screens[1],
    profileTab: 2,
    opacityStack: [],
    dictionary: dictionary.dictionary(mvConsts.languages.russian),
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.LOGIN_SUCCESS:
        case types.SIGNUP_SUCCESS:
        case 'login':
            return {
                ...state,
                isAutorized: true
            };

        case types.LOGOUT:
        case types.LOGOUT_SUCCESS:
        case 'logout':
            return {
                ...state,
                isAutorized: false
            };
        case 'openSc':
            return {
                ...state,
                screenName: action.screenName
            };
        case 'changeProfileTab':
            return {
                ...state,
                profileTab: action.index
            };
        case 'setLanguage':
            return {
                ...state,
                dictionary: dictionary.dictionary(action.language)
            };
        case 'opacityPush':
            let opacityStack = state.opacityStack;
            opacityStack.push({
                layerName: action.layerName,
                data: action.data
            });
            return{
                ...state,
                opacityStack: opacityStack
            };
        case 'opacityPop':
            opacityStack = state.opacityStack;
            opacityStack.pop();
            return{
                ...state,
                opacityStack: opacityStack
            };


        default:
            return state;
    }
}