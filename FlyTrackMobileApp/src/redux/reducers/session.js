/**
 * Created by mityabeldii on 27.06.2017.
 */

import * as mvConsts from '../../constants/mvConsts'
import * as stab from '../../../stab.json'

const initialState = {
    myAircraftNumber: 0,
    aircrafts: stab.aircrafts,
    mapType: mvConsts.mapTypes.standard,
    showenTrackFlightId: undefined,
    visibleButtons: [3, 4, 5, 6, ],
    warningRadius: undefined,
    visibleRadius: 50,
    startDate: undefined,
    endDate: undefined,
    photos: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'pushTrack':
            let aircrafts = state.aircrafts
            aircrafts[action.index].track.push(action.coordinates)
            return {
                ...state,
                aircrafts: aircrafts
            };
        case 'moveAircraft':
            let aircrafts1 = state.aircrafts
            aircrafts1[action.index].latitude = action.latitude
            aircrafts1[action.index].longitude = action.longitude
            return {
                ...state,
                aircrafts: aircrafts1
            };
        case 'changeMapType':
            return{
                ...state,
                mapType: action.mapType
            };
        case 'showTrack':
            return {
                ...state,
                showenTrackFlightId: action.flightId
            };
        case 'setWarningRadius':
            return {
                ...state,
                warningRadius: action.warningRadius
            };
        case 'setVisibleRadius':
            return {
                ...state,
                visibleRadius: action.visibleRadius
            };
        case 'setStartDate':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'setEndDate':
            return {
                ...state,
                endDate: action.endDate
            };
        case 'editButtons':
            let buttons = []
            if (action.value) {
                buttons = state.visibleButtons
                buttons.push(action.index)
            } else {
                for (let i in state.visibleButtons) {
                    if (state.visibleButtons[i] !== action.index) {
                        buttons.push(state.visibleButtons[i])
                    }
                }
            }
            buttons = buttons.sort()
            return {
                ...state,
                visibleButtons: buttons
            };

        default:
            return state;
    }
}