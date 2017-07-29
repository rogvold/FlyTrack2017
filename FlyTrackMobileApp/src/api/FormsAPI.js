/**
 * Created by sabir on 19.07.17.
 */

import * as constants from '../constants/AccountConstants'

const FormsAPI = {

    transformForm(s){
        if (s == undefined){
            return null;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),

            email: s.get('email'),
            number: s.get('number'),

            firstName: s.get('firstName'),
            lastName: s.get('lastName'),
            age: s.get('age'),
            gender: s.get('gender'),

            data: s.get('data')

        }
    },


    transformOrganization(s){
        if (s == undefined){
            return null;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),

            name: s.get('name'),
            description: s.get('description'),
            address: s.get('address'),
            phone: s.get('phone'),

        }
    }

}

export  default FormsAPI;