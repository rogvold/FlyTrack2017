/**
 * Created by sabir on 10.06.17.
 */

import * as constants from '../constants/config'
import Parse from 'parse'

const AircraftsAPI = {

    transformAircraft(s){
        if (s == undefined){
            return null;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),

            userId: a.get('userId'),
            aircraftId: a.get('aircraftId'),
            aircraftType: a.get('aircraftType'),
            callName: a.get('callName'),
            deleted: a.get('deleted'),
            name: a.get('name')

        }
    }

}

export  default AircraftsAPI;