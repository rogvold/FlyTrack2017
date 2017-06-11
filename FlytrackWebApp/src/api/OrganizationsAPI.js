/**
 * Created by sabir on 11.06.17.
 */

import * as constants from '../constants/config'
import Parse from 'parse'

const OrganizationsAPI = {

    transformOrganization(org){
        if (org == undefined){
            return undefined;
        }
        return {
            id: org.id,
            timestamp: (new Date(org.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),

            adminId: (org.get('adminId') == undefined) ? org.get('dispatcherId') : org.get('adminId'), //todo: improve that
            name: org.get('name'),
            description: org.get('description'),
            freq: org.get('freq'),
            lat: org.get('lat'),
            lon: org.get('lon'),
            alt: org.get('alt'),
            backgroundImg: org.get('backgroundImg'),
            code: org.get('code')
        }
    },

}

export  default OrganizationsAPI;