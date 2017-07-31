/**
 * Created by sabir on 30.07.17.
 */
import Realm from 'realm'

class GeoPoint {}
GeoPoint.schema = {
    name: 'GeoPoint',
    properties: {
        userId:  {type: 'string', indexed: true},
        lat: 'double',
        lon: 'double',
        alt: 'double',
        acc: 'double',
        vel: 'double',
        bea: 'double',
        t: {type: 'int', indexed: true}
    }
};

const RealmAPI = {

    getRealmInstance(){
        if (global.realm == undefined){
            global.realm = new Realm({schema: [GeoPoint]});
        }else {
            return global.realm;
        }
    },

    saveGeoPoint(d){
        return new Promise((resolve, reject) => {
            let realm = this.getRealmInstance();
            try{
                realm.write(() => {
                    let point = realm.create('GeoPoint', d);
                    resolve(point)
                });
            }catch(exc){
                reject(exc)
            }
        })
    },

    getUserGeoPointsInRange(userId, fromTimestamp = 0, endTimestamp = +new Date()){
        let realm = this.getRealmInstance();
        return realm.objects('GeoPoint')
                    .filtered(`t >= ${fromTimestamp} AND t < ${endTimestamp} AND userId == "${userId}"`)
                    .sorted('t');
    }

}

export default RealmAPI