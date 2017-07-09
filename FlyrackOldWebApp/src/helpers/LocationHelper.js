/**
 * Created by sabir on 07.07.16.
 */

var LocationHelper = {

    CENTER_LAT: 56.1009856,
    CENTER_LON: 36.8019053,
    CENTER_ALT: 171.328,


    generateFakePoints: function(n, fromIndex){
        var arr = [];
        if (fromIndex == undefined){
            fromIndex = 0;
        }
        if (n == undefined){
            n = 100;
        }
        var lat = this.CENTER_LAT;
        var lon = this.CENTER_LON;
        var alt = this.CENTER_ALT;
        var t = 0;

        for (var i = fromIndex; i < (n + fromIndex); i++){
            var dLat = 0 + Math.random() * 0.001;
            var dLon = 0.01 * Math.sin(i / 100);
            var acc = Math.floor(5 * Math.random()) + 1;
            var dAlt = Math.floor(10 * Math.random()) - 3;
            var dT = 3000;

            var p = {
                lat: lat,
                alt: alt,
                lon: lon,
                acc: acc,
                vel: 4,
                bea: 0,
                t: t
            };
            arr.push(p);
            lat+= dLat;
            lon+= dLon;
            alt+= dAlt;
            t+= dT;
        }
        return arr;
    }

};

module.exports = LocationHelper;