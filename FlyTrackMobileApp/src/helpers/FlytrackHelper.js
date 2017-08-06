/**
 * Created by sabir on 09.06.17.
 */

import {Map} from 'immutable'

const FlytrackHelper = {

    getFriendsListByLinksAndUsers(linksMap, usersMap, currentUserId){
        let arr = [];
        let gss = (s) => {if (s == undefined){return ''}; return s;}
        let getLinksForUser = (uId) => {
            console.log('getLinksForUser: uId = ', uId);
            return linksMap.toArray().filter((link) => {
                return (((link.creatorId == currentUserId) && (link.friendId == uId)) || ((link.friendId == currentUserId) && (link.creatorId == uId)));
            })
        }
        return usersMap.toArray().filter((user) => {
            return (user.id != currentUserId);
        }).sort((a, b) => {
            let s1 = (gss(a.lastName) + gss(a.firstName)).toLowerCase();
            let s2 = (gss(b.lastName) + gss(b.firstName)).toLowerCase();
            if (s1 > s2){return 1;}
            if (s1 < s2){return -1;}
            return 0;
        }).map((u) => {
            let links = getLinksForUser(u.id);
            console.log('getFriendsListByLinksAndUsers: in map: links for user ' + u.id + ' : ', links);
            if (links.length == 0){return undefined};
            let following = false, follower = false, followingStatus = 'new', followerStatus = 'new';
            for (let j in links){
                let l = links[j];
                if (l.creatorId == currentUserId && l.friendId == u.id){followingStatus = l.status; following = true;};
                if (l.creatorId == u.id && l.friendId == currentUserId){followerStatus = l.status; follower = true;};
            }
            return Object.assign({}, u, {following, follower, followingStatus, followerStatus});
        }).filter((a) => {
            return (a != undefined);
        });
    },

    getUserRelationMap(linksMap, firstUserId, secondUserId){
        let firstUserLinks = linksMap.toArray().filter((link) => {
            return ((link.creatorId == firstUserId && link.friendId == secondUserId) || (link.friendId == firstUserId && link.creatorId == secondUserId));
        })
        let following = false, follower = false, followingStatus = 'new', followerStatus = 'new';
        for (let j in firstUserLinks){
            let l = firstUserLinks[j];
            if (l.creatorId == firstUserId && l.friendId == secondUserId){followingStatus = l.status; following = true;};
            if (l.creatorId == secondUserId && l.friendId == firstUserId){followerStatus = l.status; follower = true;};
        }
        return {following, follower, followingStatus, followerStatus};
    },

    getRandomPoints(coordinates, number = 1000, radAngle = 0.01){
        let arr = [];
        let bnds = this.getBounds()[0];
        if (coordinates == undefined){
            coordinates = {lat: bnds[0], lon: bnds[1]}
        }
        let lat0 = coordinates.lat, lon0 = coordinates.lon, t0 = +new Date(), dt = 1000;
        for (let i = 0; i < number; i++){
            let fi = 2.0 * i * Math.PI / number;
            arr.push({
                lat: lat0 + radAngle * Math.sin(fi),
                lon: lon0 + radAngle * Math.cos(fi),
                vel: Math.round(Math.random() * 50),
                acc: Math.round(Math.random() * 10),
                alt: Math.round(Math.random() * 200) + 50,
                bea: 0,
                t: (i == 0) ? t0 : arr[arr.length - 1].t + dt
            });
        }
        return arr;
    },

    getSubscribeChannelsByLocation(lat, lon){
        let lats = [Math.floor(lat), Math.ceil(lat)];
        let lons = [Math.floor(lon), Math.ceil(lon)];
        let arr = [];
        for (let i in lats){
            for (let j in lons){
                arr.push({
                    lat: lats[i],
                    lon: lons[j],
                    name: 'lat_' + lats[i] + '_lon_' + lons[j]
                });
            }
        }
        return arr;
    },

    getDist(x1, x2, y1, y2){
        let d2 = (x1- x2)*(x1 - x2) + (y1- y2) * (y1-y2);
        return d2;
    },

    getPublishChannelByLocation(lat, lon){
        console.log('getPublishChannelByLocation: lat, lon = ', lat, lon);
        let arr = this.getSubscribeChannelsByLocation(lat, lon);
        console.log('arr = ', arr);

        let res = {};
        let d = 1000000;
        for (let i in arr){
            let p = arr[i];
            let dr = this.getDist(+lat, +arr[i].lat, +lon, +arr[i].lon);
            if (dr < d){
                d = dr;
                res = arr[i];
            }
        }
        console.log('getPublishChannelByLocation: returning res = ', res);
        return res;
    },

    generateRandomDataForOneAircraft(user, aircraft){
        //center: [-0.109970527, 51.52916347],
        let centerLat = 56.0996454;
        let centerLon = 36.8008261;
        let lines = [];
        let markers = [];
        let maxDelta = 0.01;
        let n = 1;
        let id = 'random_' + 0;
        let points = [];
        let k = 20000 + Math.floor(Math.random() * 4000);
        points.push({lat: [centerLat + Math.random() * maxDelta],
            lon: [centerLon + Math.random() * maxDelta],
            acc: [Math.floor(Math.random() * 6)],
            bea: [55], vel: [34], alt: [123],
            times: [new Date().getTime()]
        });
        for (let j=1; j < k; j++){
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
        let d = {
            points: points,
            user: user,
            aircraft: aircraft,
            params: {"device":"test","network":"LTE"}
        }
        console.log('generateRandomData: returining ', d);
        return d;
    },

    generateRandomDataForAircrafts(user, aircrafts){
        //center: [-0.109970527, 51.52916347],
        // let centerLat = 56.0996454;
        // let centerLon = 36.8008261;
        // let lines = [];
        // let markers = [];
        // let maxDelta = 0.01;
        // let n = 1;
        // let id = 'random_' + 0;
        // let points = [];
        // let k = 2000 + Math.floor(Math.random() * 400);
        // points.push({lat: [centerLat + Math.random() * maxDelta],
        //     lon: [centerLon + Math.random() * maxDelta],
        //     acc: [Math.floor(Math.random() * 6)],
        //     bea: [55], vel: [34], alt: [123],
        //     times: [new Date().getTime()]
        // });
        // for (let j=1; j < k; j++){
        //     points.push({
        //         lat: [points[j-1].lat[0] + (0.5 - Math.random()) * maxDelta],
        //         lon: [points[j-1].lon[0] + (0.5 - Math.random()) * maxDelta],
        //         acc: [points[j-1].acc[0]],
        //         alt: [points[j-1].alt[0]],
        //         bea: [points[j-1].bea[0]],
        //         vel: [points[j-1].vel[0]],
        //         times: [points[j-1].times[0] + Math.floor(1000 * Math.random())]
        //     });
        // }
        let arr = [];
        for (let i in aircrafts){
            arr.push(this.generateRandomDataForOneAircraft(user, aircrafts[i]))
        }
        // let d = {
        //     points: points,
        //     user: user,
        //     aircraft: aircraft,
        //     params: {"device":"test","network":"LTE"}
        // }
        // console.log('generateRandomData: returining ', d);
        console.log('generateRandomDataForAircrafts: returning arr = ', arr);

        return arr;
    },


    getAllPointsInLines(lines){
        let arr = [];
        for (let i in lines){
            let pts = lines[i].points;
            if (pts == undefined || pts.length == 0){
                continue;
            }
            arr = arr.concat(lines[i].points);
        }
        return arr;
    },

    getCenter(points){
        if (points == undefined || points.length == 0){
            return {lat: 0, lon: 0};
        }
        if (points.length == 1){
            return points[0];
        }

        let minLat = 1000000;
        let minLon = 1000000;
        let maxLat = -1000000;
        let maxLon = -1000000;
        for (let i in points){
            let lat = points[i].lat;
            let lon = points[i].lon;
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

    getBounds(points){
        console.log('getBounds occured: points = ', points);
        if (points == undefined || points.length == 0){
            return [[36.7008261, 56.0096454], [36.9008261, 56.1996454]];
        }
        if (points.length == 1){
            return points[0];
        }

        let minLat = 1000000;
        let minLon = 1000000;
        let maxLat = -1000000;
        let maxLon = -1000000;
        for (let i in points){
            let lat = +points[i].lat;
            let lon = +points[i].lon;
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


        let dLon = maxLon - minLon;
        let dLat = maxLat - minLat;

        let delta = Math.max(dLat, dLon);

        console.log('dLat, dLon = ', dLat, dLon);
        let k = 1.4;

        let bounds = [[minLon - k * delta, minLat - k * delta], [maxLon + k * delta, maxLat + k * delta]];

        console.log('returning bounds = ', bounds);

        return bounds;
    },

    getGoodTime(t){
        if (t < 10){
            return ('0' + t);
        }
        return ('' + t);
    },

    getTimerString(t){
        if (t == undefined || t == 0){
            return '00:00';
        }
        let seconds = Math.round(t / 1000.0);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return (this.getGoodTime(minutes) + ':' + this.getGoodTime(seconds));
    },

    getRealtimeAircrafts(realtimePointsMap, currentUserId){
        let messages = realtimePointsMap.toArray()
                        .filter((a) => ((a.user != undefined) && (a.user.id != currentUserId)))
                        .sort((a, b) => (a.t - b.t));
        return messages.reduce((map, message) => {
            let points = map.get(message.aircraft.id) == undefined ? [] : map.get(message.aircraft.id).points;
            points = points.concat([{
                t: message.t,
                lat: message.lat,
                lon: message.lon,
                alt: message.alt,
                acc: message.acc,
                bea: message.bea,
                vel: message.vel
            }])
            return map.set(message.aircraft.id, {
                user: message.user,
                points: points,
                aircraft: message.aircraft
            })
        }, Map()).toArray()
    }


}

export default FlytrackHelper;