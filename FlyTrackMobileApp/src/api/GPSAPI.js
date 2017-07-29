/**
 * Created by sabir on 29.07.17.
 */

import * as constants from '../constants/AccountConstants'
import { Constants, Location, Permissions } from 'expo';


const GPSAPI = {

    initGPS(){
        return new Promise((resolve, reject) => {
            Permissions.askAsync(Permissions.LOCATION).then(
                (payload) => {
                    let {status} = payload;
                    if (status === 'granted'){
                        resolve();
                    }else {
                        reject({
                            message: 'Permission to access location was denied'
                        });
                    }
                },
                (err) => {
                    reject(err);
                }
            )
        })
    },

    subscribeOnLocationUpdate(onPointCallback){
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 50,
            distanceInterval: 0.1
        }, (data) => {
            let {timestamp, coords} = data;
            onPointCallback({
                lat: coords.latitude,
                lon: coords.longitude,
                alt: coords.altitude,
                acc: coords.accuracy,
                bea: coords.heading,
                vel: coords.speed,
                t: timestamp
            });
        })
    }

}

export  default GPSAPI;