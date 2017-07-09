/**
 * Created by sabir on 19.09.16.
 */

var FlyTrackHelper = {

    getSubscribeChannelsByLocation: function(lat, lon){
        var lats = [Math.floor(lat), Math.ceil(lat)];
        var lons = [Math.floor(lon), Math.ceil(lon)];
        var arr = [];
        for (var i in lats){
            for (var j in lons){
                arr.push({
                    lat: lats[i],
                    lon: lons[j],
                    name: 'lat_' + lats[i] + '_lon_' + lons[j]
                });
            }
        }
        return arr;
    },

    getDist: function(x1, x2, y1, y2){
        var d2 = (x1- x2)*(x1 - x2) + (y1- y2) * (y1-y2);
        return d2;
    },

    getPublishChannelByLocation: function(lat, lon){
        console.log('getPublishChannelByLocation: lat, lon = ', lat, lon);
        var arr = this.getSubscribeChannelsByLocation(lat, lon);
        console.log('arr = ', arr);

        var res = {};
        var d = 1000000;
        for (var i in arr){
            var p = arr[i];
            var dr = this.getDist(+lat, +arr[i].lat, +lon, +arr[i].lon);
            if (dr < d){
                d = dr;
                res = arr[i];
            }
        }
        console.log('getPublishChannelByLocation: returning res = ', res);
        return res;
    },

    generateRandomData: function(){
        //center: [-0.109970527, 51.52916347],
        var centerLat = 56.0996454;
        var centerLon = 36.8008261;
        var lines = [];
        var markers = [];
        var maxDelta = 0.01;
        var n = 1;
        var id = 'random_' + 0;
        var points = [];
        var k = 2000 + Math.floor(Math.random() * 400);
        points.push({lat: [centerLat + Math.random() * maxDelta],
            lon: [centerLon + Math.random() * maxDelta],
            acc: [Math.floor(Math.random() * 6)],
            bea: [55], vel: [34], alt: [123],
            times: [new Date().getTime()]
        });
        for (var j=1; j < k; j++){
            points.push({
                lat: [points[j-1].lat[0] + (0.5 - Math.random()) * maxDelta],
                lon: [points[j-1].lon[0] + (0.5 - Math.random()) * maxDelta],
                acc: [points[j-1].acc[0]],
                alt: [points[j-1].alt[0]],
                bea: [points[j-1].bea[0]],
                vel: [points[j-1].vel[0]],
                times: [points[j-1].times[0] + Math.floor(1000 * Math.random())]
            });
        }

        return {
            points: points,
            user: {
                name: "Test User",
                id: 'sdf234sdf'
            },
            aircraft: {
                id: 'asdfasd32f',
                name: 'ikarus c42'
            },
            params: {"device":"test","network":"LTE"}
        }
    },


    getAllPointsInLines: function(lines){
        var arr = [];
        for (var i in lines){
            var pts = lines[i].points;
            if (pts == undefined || pts.length == 0){
                continue;
            }
            arr = arr.concat(lines[i].points);
        }
        return arr;
    },

    getCenter: function(points){
        if (points == undefined || points.length == 0){
            return {lat: 0, lon: 0};
        }
        if (points.length == 1){
            return points[0];
        }

        var minLat = 1000000;
        var minLon = 1000000;
        var maxLat = -1000000;
        var maxLon = -1000000;
        for (var i in points){
            var lat = points[i].lat;
            var lon = points[i].lon;
            if (lat > maxLat){
                maxLat = lat;
            }
            if (lon > maxLon){
                maxLon = lon;
            }
            if (lat < minLat){
                minLat = lat;
            }
            if (lon < minLon){
                minLon = lon;
            }
        }
        return {
            lat: (minLat + maxLat) / 2.0,
            lon: (minLon + maxLon) / 2.0
        }
    },

    getBounds: function(points){
        console.log('getBounds occured: points = ', points);
        if (points == undefined || points.length == 0){
            return [[36.7008261, 56.0096454], [36.9008261, 56.1996454]];
        }
        if (points.length == 1){
            return points[0];
        }

        var minLat = 1000000;
        var minLon = 1000000;
        var maxLat = -1000000;
        var maxLon = -1000000;
        for (var i in points){
            var lat = +points[i].lat;
            var lon = +points[i].lon;
            if (lat > maxLat){
                maxLat = lat;
            }
            if (lon > maxLon){
                maxLon = lon;
            }
            if (lat < minLat){
                minLat = lat;
            }
            if (lon < minLon){
                minLon = lon;
            }
        }
        console.log('minLat, minLon, maxLat, maxLon = ', minLat, minLon, maxLat, maxLon);


        var dLon = maxLon - minLon;
        var dLat = maxLat - minLat;

        var delta = Math.max(dLat, dLon);

        console.log('dLat, dLon = ', dLat, dLon);
        var k = 1.4;

        var bounds = [[minLon - k * delta, minLat - k * delta], [maxLon + k * delta, maxLat + k * delta]];

        console.log('returning bounds = ', bounds);

        return bounds;
    },

    getGoodTime: function(t){
        if (t < 10){
            return ('0' + t);
        }
        return ('' + t);
    },

    getTimerString: function(t){
        if (t == undefined || t == 0){
            return '00:00';
        }
        var seconds = Math.round(t / 1000.0);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return (this.getGoodTime(minutes) + ':' + this.getGoodTime(seconds));
    }

};

module.exports = FlyTrackHelper;