/**
 * Created by lesha on 09.06.17.
 */


import {fromJS} from 'immutable';

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v10';

export const pointLayer = fromJS({
    id: 'point',
    source: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
