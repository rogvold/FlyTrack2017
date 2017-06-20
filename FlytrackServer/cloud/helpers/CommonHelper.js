/**
 * Created by sabir on 21.06.16.
 */

var CommonHelper = {

    getRandomString: function(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKMNPQRSTUVWXYZ23456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    },

    validateEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    isEmptyString: function(s){
        return (s == undefined || s.trim() == '');
    },

    getGoogleStringByPoints: function(points){
        if (points == undefined || points.length == 0){
            return '';
        }
        var n = points.length;
        var dN = Math.ceil(n / 60);
        var arr = [];
        for (var i = 0; i < n; i = i + dN){
            arr.push(points[i].lat + ',' + points[i].lon);
        }
        var s = arr.join('|');
        return s;
    },

    deg2rad: function(deg) {
        return deg * (Math.PI/180)
    },

    getDistanceFromLatLon:  function(lat1,lon1,lat2,lon2) {
        var R = 6371000;
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    },

    getDistanceByPoints: function(points){
        var sum = 0;
        if (points.length == 1){
            return 0;
        }
        for (var i = 1; i < points.length; i++){
            var lat1 = points[i-1].lat;
            var lon1 = points[i-1].lon;
            var lat2 = points[i].lat;
            var lon2 = points[i].lon;
            var d = this.getDistanceFromLatLon(lat1, lon1, lat2, lon2);
            sum = sum + d;
        }
        return sum;
    },


    getUniqueArray: function(arr){
        var res = [];
        if (arr == undefined){
            return [];
        }
        var map = {};
        for (var i in arr){
            map[arr[i]] = 1;
        }
        for (var key in map){
            res.push(key);
        }
        return res;
    },

    generateRandomEmail: function(){
        var s = 'random_' + this.getRandomString(40, 'ABCDEFGHIJKMNPQRSTUVWXYZ'.toLowerCase()) + '@flytrack.net';
        return s;
    },

    generateRandomPassword: function(){
        return (
            this.getRandomString(40)
        );
    }

};

module.exports = CommonHelper;