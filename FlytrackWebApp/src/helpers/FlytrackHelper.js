/**
 * Created by sabir on 09.06.17.
 */

const FlytrackHelper = {

    getRandomPoints(coordinates, number = 100, radAngle = 0.01){
        let arr = [];
        let lat0 = coordinates.lat, lon0 = coordinates.lon, t0 = +new Date(), dt = 1000;
        for (let i = 0; i < number; i++){
            let fi = 2.0 * i * Math.PI / number;
            arr.push({
                lat: lat0 + radAngle * Math.sin(fi),
                lon: lon0 + radAngle * Math.cos(fi),
                t: (i == 0) ? t0 : arr[arr.length - 1].t + dt
            });
        }
        return arr;
    }

}

export default FlytrackHelper;