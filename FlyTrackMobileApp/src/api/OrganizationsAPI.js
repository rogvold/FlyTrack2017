/**
 * Created by sabir on 11.06.17.
 */

import * as constants from '../constants/AccountConstants'

const OrganizationsAPI = {

    transformOrganization: function(org){
        if (org == undefined){
            return undefined;
        }
        let res = {
            id: org.id,
            timestamp: (new Date(org.createdAt)).getTime(),
            updatedTimestamp: (new Date(org.updatedAt)).getTime(),

            adminId: org.get('adminId'),
            name: org.get('name'),
            description: org.get('description'),
            freq: org.get('freq'),
            lat: org.get('lat'),
            lon: org.get('lon'),
            alt: org.get('alt'),
            backgroundImg: org.get('backgroundImg'),
            code: org.get('code')
        };

        return res
    }

}

export default OrganizationsAPI;