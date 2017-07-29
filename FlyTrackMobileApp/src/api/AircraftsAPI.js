/**
 * Created by sabir on 10.06.17.
 */

import * as constants from '../constants/AccountConstants'
import Parse from 'parse'

const AircraftsAPI = {

    transformAircraft(a){
        if (a == undefined){
            return null;
        }
        return {
            id: a.id,
            timestamp: (new Date(a.createdAt)).getTime(),
            updatedTimestamp: (new Date(a.updatedAt)).getTime(),

            userId: a.get('userId'),
            name: a.get('name'),
            aircraftNumber: a.get('aircraftNumber'),
            aircraftType: a.get('aircraftType'),
            callName: a.get('callName'),
            deleted: a.get('deleted')

        }
    }

}

export  default AircraftsAPI;