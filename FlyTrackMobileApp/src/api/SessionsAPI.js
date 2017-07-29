/**
 * Created by sabir on 29.07.17.
 */

import * as constants from '../constants/AccountConstants'
import Parse from 'parse'

const SessionsAPI = {

    transformSession(a){
        if (a == undefined){
            return null;
        }
        return {
            id: a.id,
            timestamp: (new Date(a.createdAt)).getTime(),
            updatedTimestamp: (new Date(a.updatedAt)).getTime(),

            startTimestamp: a.get('startTimestamp'),
            userId: a.get('userId'),
            name: a.get('name'),
            description: a.get('description'),

        }
    }

}

export  default SessionsAPI;