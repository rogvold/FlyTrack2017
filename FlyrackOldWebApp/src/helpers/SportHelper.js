/**
 * Created by sabir on 09.07.16.
 */

var SportHelper = {

    generateRandomPointsForOnePlayer: function(n, maxX, maxY){
        if (n == undefined){
            n = 1600;
        }
        if (maxX == undefined){
            maxX = 720;
        }
        if (maxY == undefined){
            maxY = 460;
        }
        var arr = [];
        var x = maxX * 1 * Math.random();
        var y = maxY * 1 * Math.random();

        var t = 0;

        var maxDt = 2000;

        for (var i = 0; i < n; i++){
            var dx = maxX * 0.03 * (Math.random() - 0.5);
            var dy = maxY * 0.03 * (Math.random() - 0.5);
            var dt = maxDt * (Math.random() + 0.3)

            arr.push({
                x: x,
                y: y,
                t: t
            });
            x = x + dx;
            y = y + dy;
            t = +t + +dt;

            x = Math.max(Math.min(x, maxX), 0);
            y = Math.max(Math.min(y, maxY), 0);
        }
        return arr;
    },

    generateFakeFootballUsers: function(n){
        if (n == undefined){
            n = 22;
        }
        var users = [];
        for (var i = 0 ; i < n; i++){
            var u = this.getRandomUser(i);
            u.id = 'userId_' + (+i + 1);
            u.training = {
                startTimestamp: new Date().getTime(),
                points: this.generateRandomPointsForOnePlayer()
            };
            users.push(u);
        }
        return users;
    },

    //t - относительное
    getCurrentPointsOfFootballUsers: function(footballUsers, t) {
        //console.log('getCurrentPointsOfFootballUsers: footballUsers, t = ', footballUsers, t);
        if (t == undefined) {
            t = 0;
        }
        var users = (footballUsers == undefined) ? [] : footballUsers;
        var arr = [];
        for (var i in users){
            var training = users[i].training;
            var startTimestamp = training.startTimestamp;
            var points = training.points;
            var p = undefined;
            //for (var j = points.length - 1; j >= 0; j--){
            for (var j in points){
                if (points[j].t >= t){
                    p = points[j];
                    p.userId = users[i].id;
                    p.pointNumber = j;
                    break;
                }
            }
            if (p != undefined){
                arr.push(p);
            }
        }
        //console.log('returning ', arr);
        //console.log(arr.map(function(a){return a.pointNumber}));
        return arr;
    },

    getTracePoints: function(points, currentTime, traceDuration){
        //console.log('getTracePoints: points, currentTime, traceDuration = ', points, currentTime, traceDuration);
        if (currentTime == undefined || traceDuration == undefined){
            return [];
        }
        var t2 = currentTime;
        var t1 = currentTime - traceDuration;

        //console.log('t1 - t2 = ', t1, t2);

        var arr = [];
        for (var i in points){
            var p = points[i];
            if ((p.t >= t1) && (p.t < t2)){
                arr.push(p);
            }
        }
        //console.log('returning arr = ', arr);
        return arr;
    },

    getTracePointsOfPlayers: function(players, currentTime, traceDuration){
        //console.log('getTracePointsOfPlayers occured');
        var arr = [];
        for (var i in players){
            var u = players[i];
            var tr = u.training;
            if (tr == undefined){
                continue;
            }
            var points = (tr.points == undefined) ? [] : tr.points;
            var trPoints = this.getTracePoints(points, currentTime, traceDuration);
            trPoints = trPoints.map(function(p){p.userId = u.id; return p;});
            arr = arr.concat(trPoints);
        }
        //console.log('returning arr = ', arr);
        return arr;
    },

    getPrettyName: function(firstName, lastName){
        firstName = firstName[0].toUpperCase() + firstName.substring(1);
        lastName = lastName[0].toUpperCase() + lastName.substring(1);
        return (firstName + ' ' + lastName);
    },

    getRandomUser: function(n){
        if (n == undefined){
            n = 0;
        }
        var users = this.getRandomUsers();
        n = n % users.length;
        return users[n];
    },

    getGoodTimeVal: function(t){
        if (t < 10){
            return ('0' + t);
        }
        return ('' + t);
    },

    getTimeString: function(t){
        if (t == undefined){
            t = this.state.t;
        }
        var sec = Math.floor(t / 1000.0);
        var minutes = Math.floor(sec / 60);
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        sec = sec % 60;
        var s = (this.getGoodTimeVal(minutes) + ':' + this.getGoodTimeVal(sec));
        if (hours > 0){
            s = this.getGoodTimeVal(hours) + ':' +s;
        }
        return s;
    },

    getDistance: function(points){
        if (points == undefined || points.length < 2){
            return 0;
        }
        var sum = 0.0;
        for (var i = 0; i < points.length - 1; i++){
            var dx = points[i+1].x - points[i].x;
            var dy = points[i+1].y - points[i].y;
            var d = Math.sqrt((dx * dx) + (dy * dy));
            sum = sum + d;
        }
        return sum;
    },

    getDuration: function(points){
        if (points == undefined || points.length < 2){
            return 0;
        }
        var t = (points[points.length - 1].t - points[0].t);
        return t;
    },

    getDurationString: function(dur){
        if (dur == undefined || dur == 0){
            return '0 мин.';
        }
        var minutes = Math.floor(dur / 60000.0);
        return (minutes + ' мин.');
    },

    getDistanceString: function(d){
        if (d == undefined || d == 0){
            return '0 км';
        }
        var km = Math.floor(d / 10.0) / 100.0;
        var s = km + ' км';
        return s;
    },

    generateRandomSessions: function(startTimestamp, number){
        var arr = [];
        var t = startTimestamp;
        for (var i = 0; i < number; i++){
            var deltaDay = Math.floor(3 * Math.random()) + 1;
            //t = +t + deltaDay * 24 * 60 * 60 * 1000;
            t = +t + deltaDay * 18 * 60 * 60 * 1000;

            var duration = (29 + Math.floor( Math.random() * 100)) * 60 * 1000;
            if (+t > new Date().getTime()){
                break;
            }
            arr.push({
                start: t,
                points: [],
                duration: duration,
                end: (+t + +duration)
            });
        }

        console.log('generated sessions: arr = ', arr);
        return arr;
    },

    getRandomUsers: function(){
        var arr = [
            {"user": {"gender":"male","name":{"first":"Георгий","last":"Лебедев","middle":"Альбертович"},"location":{"building":63,"street":"Рабочая","city":"Пермь","state":"Новосибирская область","zip":10151},"username":"prettyorange","email":"prettyorange24@example.com","password":"Uoe6NsADEBk","salt":"l14b1ixfqjg","md5":"fe949a9a47d5fd9b5fa54df67db9bc41","sha1":"15bde923620385da18e8fa1c9d6249ae2baeb9f6","sha256":"8a0b8949f7375ccec94b433421128b0ed3787178412880ee70189499bd9077f2","registered":555762421,"dob":261058772,"phone":"7-495-335-98-40","cell":"7-906-337-93-57","picture":{"large":"http://randomuser.ru/images/men/78.jpg","medium":"http://di.sabir.pro/assets/images/children/01.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/78.jpg"}}},{"user":{"gender":"male","name":{"first":"Илья","last":"Игнатьев","middle":"Егорович"},"location":{"building":54,"street":"Южная","city":"Красноярск","state":"Ярославская область","zip":14965},"username":"oldbird","email":"oldbird96@example.com","password":"azUzziglJoA","salt":"OIlNWFWJDuw","md5":"f81879ba7fe422bcb9323ac499f6d04c","sha1":"812199323a6149f880640046f4bb2487a557bc38","sha256":"3950f9e71c4d9d45f73166f62a864cfb42d8d8838c9ca018c7cc039997528a55","registered":440621746,"dob":116211176,"phone":"7-495-535-41-49","cell":"7-918-342-84-65","picture":{"large":"http://randomuser.ru/images/men/8.jpg","medium":"http://di.sabir.pro/assets/images/children/02.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/8.jpg"}}},{"user":{"gender":"male","name":{"first":"Петр","last":"Никитин","middle":"Макарович"},"location":{"building":100,"street":"Нагорная","city":"Сочи","state":"Тамбовская область","zip":83391},"username":"baduser","email":"baduser23@example.com","password":"fD-eGFElPg0","salt":"qfctkq-uOgQ","md5":"11f4c2ff346585f3c7f34af8a2408ad7","sha1":"d6ccb9e6203bb939cebebeb73c2bec93b8aecc15","sha256":"407d30188ac1cd843f25a120ee734086d0667fabea0191ac5a05a05566a63757","registered":686349281,"dob":186790415,"phone":"7-495-837-43-30","cell":"7-916-433-30-72","picture":{"large":"http://randomuser.ru/images/men/16.jpg","medium":"http://di.sabir.pro/assets/images/children/03.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/16.jpg"}}},{"user":{"gender":"male","name":{"first":"Иван","last":"Мясников","middle":"Дмитриевич"},"location":{"building":53,"street":"Куйбышева","city":"Белгород","state":"Ивановская область","zip":65067},"username":"tinysnake","email":"tinysnake71@example.com","password":"eVWdx25Kjgc","salt":"fhzcWi2kDD0","md5":"63ea65fde03a65b7819d3513d53a48fa","sha1":"4484b639214091402126b7ae67fea1ef4fc818c1","sha256":"2bfe50556acbb73609397b232ab3d18677bd2af4e83701c06679434281142aaa","registered":713465571,"dob":448960778,"phone":"7-495-558-55-41","cell":"7-916-274-37-21","picture":{"large":"http://randomuser.ru/images/men/52.jpg","medium":"http://di.sabir.pro/assets/images/children/04.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/52.jpg"}}},{"user":{"gender":"male","name":{"first":"Иван","last":"Щербаков","middle":"Евгеньевич"},"location":{"building":99,"street":"Цветочная","city":"Тольятти","state":"Кировская область","zip":54297},"username":"beautifulrainbow","email":"beautifulrainbow39@example.com","password":"eW0cQfxwcjE","salt":"kXYFR57VkEo","md5":"567b960a19ff5e09954f4ef22f688a80","sha1":"108261fb18b235e02ab274db46707f5b1fbf0af7","sha256":"609ec023c9d5b186d18b39f97fb72077f1c29acc951da5e8238ff64eea6c6683","registered":437152792,"dob":37918183,"phone":"7-495-699-40-76","cell":"7-903-617-16-45","picture":{"large":"http://randomuser.ru/images/men/6.jpg","medium":"http://di.sabir.pro/assets/images/children/05.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/6.jpg"}}},{"user":{"gender":"male","name":{"first":"Степан","last":"Мамонтов","middle":"Никитич"},"location":{"building":56,"street":"Красная","city":"Томск","state":"Краснодарский край","zip":60737},"username":"prettydog","email":"prettydog25@example.com","password":"Dwe6Ik7aac8","salt":"haXMTsk2Zb0","md5":"dcc2658d28de91e5f0633f0b4384df93","sha1":"baeddf7be1666b9aaab3a1b904a899979d088ea3","sha256":"01e5f2d83784fb91dce6eb4372791e2d1297fb6e2d1cd3b7bb014d94bee518c0","registered":498431658,"dob":138153668,"phone":"7-495-307-38-73","cell":"7-918-858-72-57","picture":{"large":"http://randomuser.ru/images/men/68.jpg","medium":"http://di.sabir.pro/assets/images/children/06.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/68.jpg"}}},{"user":{"gender":"male","name":{"first":"Степан","last":"Степанов","middle":"Владимирович"},"location":{"building":70,"street":"Зеленая","city":"Челябинск","state":"Ивановская область","zip":39678},"username":"smalldeath","email":"smalldeath96@example.com","password":"lEvslnRqo00","salt":"HCcYiHapkoE","md5":"1320b940b8d5464893628c8aae9d2553","sha1":"5a476b08ea84f409004d9579fcda2782e50d01d7","sha256":"11facfca662e299911d26bd5366a633d02db9ae4aa0208bddadf3dfdda5ec633","registered":289514583,"dob":118589696,"phone":"7-495-459-85-50","cell":"7-918-686-37-42","picture":{"large":"http://randomuser.ru/images/men/46.jpg","medium":"http://di.sabir.pro/assets/images/children/07.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/46.jpg"}}},{"user":{"gender":"male","name":{"first":"Павел","last":"Кулаков","middle":"Геннадьевич"},"location":{"building":62,"street":"Октябрьская","city":"Киров","state":"Чукотский автономный округ","zip":66157},"username":"newrain","email":"newrain99@example.com","password":"K5Oa1H-8U3Q","salt":"ASfJdEW-7LI","md5":"7547280689feb1b5ad2cd0dc7d79262a","sha1":"bcbe69c90ff685abdde3e7e8904ac6d6a07e6bd7","sha256":"702bfec5b2ade2c7b5f73f50df1ae09a16562fc4254b0f6d8adccc78564ffd19","registered":907637539,"dob":306498837,"phone":"7-495-236-11-69","cell":"7-915-638-50-96","picture":{"large":"http://randomuser.ru/images/men/38.jpg","medium":"http://di.sabir.pro/assets/images/children/08.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/38.jpg"}}},{"user":{"gender":"male","name":{"first":"Григорий","last":"Кузьмин","middle":"Владимирович"},"location":{"building":9,"street":"Чапаева","city":"Рязань","state":"Магаданская область","zip":93464},"username":"badsanta","email":"badsanta17@example.com","password":"N0IHncCqGXg","salt":"Et9oe22MG-I","md5":"3957a3b9159dec1bb2ba884d155e21f8","sha1":"d5eaf9a95ec4ee753f78bc5bc6fea29cf7feffc9","sha256":"ff7268c435aab2102d4d9e45fcb91ad2f841900b7964be0deb6699829e9cb4db","registered":646123836,"dob":279050540,"phone":"7-495-748-21-59","cell":"7-926-429-99-42","picture":{"large":"http://randomuser.ru/images/men/35.jpg","medium":"http://di.sabir.pro/assets/images/children/09.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/35.jpg"}}},{"user":{"gender":"male","name":{"first":"Федор","last":"Мишин","middle":"Эдуардович"},"location":{"building":58,"street":"Парковая","city":"Оренбург","state":"Республика Марий Эл","zip":61077},"username":"smalldeath","email":"smalldeath29@example.com","password":"_xc2mwt6dC0","salt":"9LPYfeKAIJ8","md5":"24e39047a63767f9c6b00cb759c69882","sha1":"58ef3c6a168fe4e93fcb77256fc2b661c09d5ab9","sha256":"40f560047b1a65d3c7476321be6e8baf82dfa6395b066d45d1bcd6423b5a1c6e","registered":596727767,"dob":328691687,"phone":"7-495-324-80-73","cell":"7-903-232-68-67","picture":{"large":"http://randomuser.ru/images/men/80.jpg","medium":"http://di.sabir.pro/assets/images/children/10.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/80.jpg"}}},{"user":{"gender":"male","name":{"first":"Виктор","last":"Никонов","middle":"Денисович"},"location":{"building":50,"street":"Нагорная","city":"Тольятти","state":"Республика Карачаево-Черкессия","zip":83636},"username":"silverbird","email":"silverbird47@example.com","password":"I4wLrisNOf0","salt":"zPn06ynUwyA","md5":"05db3b777cbb82304d009b4af913ba69","sha1":"0660a0ccb7e4f300bb457d406ce422f54cf1e546","sha256":"94cc3a9e27ae4d2e742dfb7c2a864cb08aacae33564fba07a5a855bcf43520ee","registered":386864438,"dob":260006227,"phone":"7-495-622-78-74","cell":"7-915-488-11-71","picture":{"large":"http://randomuser.ru/images/men/12.jpg","medium":"http://di.sabir.pro/assets/images/children/11.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/12.jpg"}}},{"user":{"gender":"male","name":{"first":"Георгий","last":"Комиссаров","middle":"Макарович"},"location":{"building":35,"street":"Карла Маркса","city":"Владивосток","state":"Костромская область","zip":71126},"username":"beautifuldog","email":"beautifuldog21@example.com","password":"6r1X6Fw3jdk","salt":"d5e_-AdR3zA","md5":"1f8534fc464150936eb62ad12634df38","sha1":"f11e187b6dfa7a4b118efe81eed9c13f8f850bf2","sha256":"3a7e9497c1ce60c1fcbf0baa839230765b579d51ea79c776d5ed291849188e47","registered":711128577,"dob":479575353,"phone":"7-495-154-74-97","cell":"7-910-557-70-28","picture":{"large":"http://randomuser.ru/images/men/12.jpg","medium":"http://di.sabir.pro/assets/images/children/12.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/12.jpg"}}},{"user":{"gender":"male","name":{"first":"Виктор","last":"Родионов","middle":"Витальевич"},"location":{"building":85,"street":"Железнодорожная","city":"Сочи","state":"Чувашская Республика","zip":76097},"username":"yellowdog","email":"yellowdog39@example.com","password":"z_MaKZHtGjA","salt":"UPMkuJxQVTg","md5":"377ce6220cc5d728583e1f8351aec1f7","sha1":"faf94493907292814e5bc02f6097f9f516baa907","sha256":"db433d0bc0ba45d3809fee0b1b9c2af65242aa97fc4ba5c400a8e7014166b6ca","registered":537446905,"dob":193506533,"phone":"7-495-267-75-52","cell":"7-926-721-94-42","picture":{"large":"http://randomuser.ru/images/men/39.jpg","medium":"http://di.sabir.pro/assets/images/children/13.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/39.jpg"}}},{"user":{"gender":"male","name":{"first":"Олег","last":"Дорофеев","middle":"Ильич"},"location":{"building":15,"street":"Полевая","city":"Ставрополь","state":"Калиниградская область","zip":26590},"username":"greensanta","email":"greensanta86@example.com","password":"snB6alyIG8I","salt":"Hqy717iZ_f0","md5":"9d5eb5c386034b377939b1806c1e1202","sha1":"43bcd4164ef59e189f6b616c3a4f7d7e387c30eb","sha256":"5632bd94d308486370a3c359c63e06308b6929340a05c8cc215d5bc12218235a","registered":588522360,"dob":266798674,"phone":"7-495-838-85-28","cell":"7-926-756-58-51","picture":{"large":"http://randomuser.ru/images/men/83.jpg","medium":"http://di.sabir.pro/assets/images/children/14.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/83.jpg"}}},{"user":{"gender":"male","name":{"first":"Илья","last":"Белоусов","middle":"Витальевич"},"location":{"building":37,"street":"Вокзальная","city":"Сочи","state":"Республика Марий Эл","zip":47059},"username":"hotdog","email":"hotdog51@example.com","password":"0MuBEmouJVU","salt":"HSt-YcMhvw0","md5":"0f3e3bde2b36f3108c8e97ad96e29c96","sha1":"187c5e126d163b3b428ccbce21c2684af4c295f0","sha256":"61e8101e1f821f77861211102b2ba0e6c144a2892a2535a57b5081014c6982fc","registered":741703270,"dob":457978901,"phone":"7-495-308-57-70","cell":"7-918-715-70-85","picture":{"large":"http://randomuser.ru/images/men/23.jpg","medium":"http://di.sabir.pro/assets/images/children/15.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/23.jpg"}}},{"user":{"gender":"male","name":{"first":"Михаил","last":"Ситников","middle":"Антонович"},"location":{"building":17,"street":"Свободы","city":"Новокузнецк","state":"Орловская область","zip":55964},"username":"yellowvoid","email":"yellowvoid89@example.com","password":"mNEsdFRW5eg","salt":"YOmGIPKQz-8","md5":"8bf8c03d9cc9f8faa5af626f8153cbb7","sha1":"569aaba1bef00f509aca99ff5bca4998788eacab","sha256":"a78e716247aa9345a4063c59b1cf287bcadd65eed8216626d11916fbfbce1b9c","registered":310324182,"dob":276341776,"phone":"7-495-455-28-78","cell":"7-916-840-36-53","picture":{"large":"http://randomuser.ru/images/men/66.jpg","medium":"http://di.sabir.pro/assets/images/children/16.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/66.jpg"}}},{"user":{"gender":"male","name":{"first":"Иван","last":"Яковлев","middle":"Аркадьевич"},"location":{"building":89,"street":"Лесной","city":"Томск","state":"Магаданская область","zip":21302},"username":"goodorange","email":"goodorange20@example.com","password":"Rv1PZdvHw_8","salt":"f1Yk_8yEIdk","md5":"680ecbb4c83bb9dd261f901973888643","sha1":"30ab0b7432f0eb3807af37dc7a1b5a756283dd26","sha256":"3206077681af6423be4f8c5364880050b732fe3da181b1b9ff6fc721ecd41df7","registered":269523060,"dob":444458590,"phone":"7-495-736-40-54","cell":"7-906-206-76-31","picture":{"large":"http://randomuser.ru/images/men/20.jpg","medium":"http://di.sabir.pro/assets/images/children/17.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/20.jpg"}}},{"user":{"gender":"male","name":{"first":"Анатолий","last":"Дементьев","middle":"Егорович"},"location":{"building":51,"street":"Сосновая","city":"Барнаул","state":"Красноярский край","zip":69466},"username":"tinyelephant","email":"tinyelephant73@example.com","password":"gTDXSpVYW3g","salt":"h6xK_1b-SLY","md5":"1a87bb7c26a398e2657e13c5f7ea81e4","sha1":"4820d176d65e3a58ac42e65ce9fad48ce6acd511","sha256":"d53829e2ee00e9a34f85a2917cd981c3d7dd42f908000528c18a626455fe9c37","registered":442263027,"dob":255899102,"phone":"7-495-370-97-22","cell":"7-903-699-19-11","picture":{"large":"http://randomuser.ru/images/men/75.jpg","medium":"http://di.sabir.pro/assets/images/children/18.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/75.jpg"}}},{"user":{"gender":"male","name":{"first":"Василий","last":"Дементьев","middle":"Евгеньевич"},"location":{"building":80,"street":"Московская","city":"Тула","state":"Красноярский край","zip":39858},"username":"crazysnake","email":"crazysnake63@example.com","password":"LBFQpeTTPoQ","salt":"75X42opOpps","md5":"97e587394e30a1d718d52ea807e99766","sha1":"c76287caf63c1f6db4637a3de3b90d28c7f17e88","sha256":"72e7a9fa15f02d63bf94e6467d7da086b94f0121d901f0b17d68bf110e9c635c","registered":94882535,"dob":444306337,"phone":"7-495-961-30-53","cell":"7-926-558-92-31","picture":{"large":"http://randomuser.ru/images/men/66.jpg","medium":"http://di.sabir.pro/assets/images/children/19.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/66.jpg"}}},{"user":{"gender":"male","name":{"first":"Сергей","last":"Пахомов","middle":"Ярославович"},"location":{"building":72,"street":"Островского","city":"Тула","state":"Коми-Пермяцкий автономный округ","zip":66601},"username":"yellowelephant","email":"yellowelephant10@example.com","password":"OiIhdmAc1W4","salt":"4RTo2Qc8yTs","md5":"19a293304414a9cd2703145891c6cbbd","sha1":"24654e169c705e0e0bbfc551da40596fe57874ac","sha256":"482ed83e2a73a804658fd4fdc24497ba3ee963f6b9b95b62e51ca89ce0ff4f9a","registered":154752421,"dob":261788974,"phone":"7-495-171-94-64","cell":"7-910-666-52-45","picture":{"large":"http://randomuser.ru/images/men/46.jpg","medium":"http://di.sabir.pro/assets/images/children/20.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/46.jpg"}}},{"user":{"gender":"male","name":{"first":"Андрей","last":"Фомин","middle":"Юрьевич"},"location":{"building":90,"street":"Фрунзе","city":"Курск","state":"Смоленская область","zip":77787},"username":"crazytiger","email":"crazytiger68@example.com","password":"qcP8L4lV3_c","salt":"fMtlxYbNulo","md5":"fd776eabf8efac142cb5f01d08a98158","sha1":"610102f07b366477dc8c1830c782f074fb8bede2","sha256":"4265eae803bb6e00cf2725e15b5f3136fa46c1e61f4cf468f72a7810eecee8e7","registered":564505798,"dob":477267502,"phone":"7-495-272-81-94","cell":"7-903-347-38-60","picture":{"large":"http://randomuser.ru/images/men/78.jpg","medium":"http://di.sabir.pro/assets/images/children/21.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/78.jpg"}}},{"user":{"gender":"male","name":{"first":"Роман","last":"Мухин","middle":"Лаврентьевич"},"location":{"building":32,"street":"Лермонтова","city":"Ульяновск","state":"Липецкая область","zip":46556},"username":"hotkoala","email":"hotkoala47@example.com","password":"WmrMiAXY-uo","salt":"sVNJkc83yhA","md5":"8b681b3748ba26db21cae87794496705","sha1":"c56dd39ccb8c7bc0abe6ef5240f1cf40ef560f0e","sha256":"e7204472eaf5167cb5b29aa4c64abdc3153d44bfb0095fa760d5e8744f381be8","registered":592333748,"dob":86117395,"phone":"7-495-739-69-69","cell":"7-903-382-22-30","picture":{"large":"http://randomuser.ru/images/men/49.jpg","medium":"http://di.sabir.pro/assets/images/children/22.JPG","thumbnail":"http://randomuser.ru/images/men/thumb/49.jpg"}}},{"user":{"gender":"male","name":{"first":"Степан","last":"Лазарев","middle":"Васильевич"},"location":{"building":59,"street":"Шоссейная","city":"Рязань","state":"Республика Ингушетия","zip":18219},"username":"goodbutterfly","email":"goodbutterfly39@example.com","password":"BV93oRq05JA","salt":"yE7TCXgZymE","md5":"25d6b649a9fcbffc346a47ea12bb0b2e","sha1":"b11ef0bf4a482e812d9bd1b8a8d63863dbb7e28c","sha256":"767bb35bb55a5cd01216a5d4200bcdcc54b062beac8a1c0a29dba26c29f129a7","registered":742592874,"dob":225047172,"phone":"7-495-640-31-29","cell":"7-916-381-51-78","picture":{"large":"http://randomuser.ru/images/men/54.jpg","medium":"http://randomuser.ru/images/men/med/54.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/54.jpg"}}},{"user":{"gender":"male","name":{"first":"Борис","last":"Рябов","middle":"Никитич"},"location":{"building":72,"street":"Свердлова","city":"Кемерово","state":"Агинский Бурятский авт. округ","zip":45657},"username":"crazybutterfly","email":"crazybutterfly74@example.com","password":"g01M-e3d5a8","salt":"J8Tq5wBtaKw","md5":"ed424768f37de5cee0ade7cac6fb5412","sha1":"7080f4b5aaa45dd32fefe6b4521fc48c981b57e7","sha256":"48321fcd6da64d3139aa270878b5dd040437768c3b49174ea11bc3e891e88b32","registered":249754201,"dob":87048577,"phone":"7-495-999-79-50","cell":"7-910-345-55-48","picture":{"large":"http://randomuser.ru/images/men/43.jpg","medium":"http://randomuser.ru/images/men/med/43.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/43.jpg"}}},{"user":{"gender":"male","name":{"first":"Михаил","last":"Петров","middle":"Леонидович"},"location":{"building":17,"street":"Весенняя","city":"Новгород","state":"Новосибирская область","zip":15982},"username":"goldenbear","email":"goldenbear90@example.com","password":"HMYMUiou0dw","salt":"YTxTnD92KuA","md5":"181b8f5c64c4e339355fef420e3971ca","sha1":"e94f1d549db4b58fcf18303102da7082a15028dc","sha256":"1685b6d53ff94cc946135f6172d863b849484fa951da4db1f77c28ef59e97e73","registered":814108190,"dob":51208002,"phone":"7-495-619-12-20","cell":"7-906-365-80-73","picture":{"large":"http://randomuser.ru/images/men/75.jpg","medium":"http://randomuser.ru/images/men/med/75.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/75.jpg"}}},{"user":{"gender":"male","name":{"first":"Анатолий","last":"Тихонов","middle":"Евгеньевич"},"location":{"building":99,"street":"Молодежная","city":"Рязань","state":"Липецкая область","zip":26225},"username":"angryuser","email":"angryuser97@example.com","password":"20yYru2FQEs","salt":"P0feTJvGDRA","md5":"840a18335d1a6965c66128fe7c443a85","sha1":"7f39162d5d0af815eaaf78931432d29842c6e4a8","sha256":"1b7426b6396734d43c8dc47cf4390e0e7ebb920dc96a1dceaa209a6dc254afe6","registered":163027051,"dob":444269808,"phone":"7-495-588-69-53","cell":"7-910-467-62-29","picture":{"large":"http://randomuser.ru/images/men/28.jpg","medium":"http://randomuser.ru/images/men/med/28.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/28.jpg"}}},{"user":{"gender":"male","name":{"first":"Андрей","last":"Кузнецов","middle":"Егорович"},"location":{"building":29,"street":"Свободы","city":"Томск","state":"Республика Татарстан","zip":93000},"username":"newbear","email":"newbear88@example.com","password":"u_7GofKHEhc","salt":"ZH7qzP1SJYc","md5":"9e8382e94e489152e766b5dc02cf31cc","sha1":"6dea9801595f84504c8b7a555b533a3f5a63ca57","sha256":"4fc3a4d5d25e2d69f07a3c450defcfce9635a81a2975f2a637bc50147865c752","registered":511878536,"dob":358063098,"phone":"7-495-857-75-48","cell":"7-915-565-40-74","picture":{"large":"http://randomuser.ru/images/men/5.jpg","medium":"http://randomuser.ru/images/men/med/5.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/5.jpg"}}},{"user":{"gender":"male","name":{"first":"Григорий","last":"Тетерин","middle":"Станиславович"},"location":{"building":4,"street":"Калинина","city":"Казань","state":"Костромская область","zip":73793},"username":"yellowdeath","email":"yellowdeath68@example.com","password":"GFt4TSpETPQ","salt":"9eTBhIemuaw","md5":"c66d048d7ce299108b4985aef8651f13","sha1":"ec2d3f7f7d515aa827c9527cf99ca95966f60e7e","sha256":"b8f80e3137b2a95dad7038f5d8d45737d7525849ebc03975e2235e1afb7620d1","registered":861785054,"dob":27233293,"phone":"7-495-934-16-35","cell":"7-918-185-71-37","picture":{"large":"http://randomuser.ru/images/men/12.jpg","medium":"http://randomuser.ru/images/men/med/12.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/12.jpg"}}},{"user":{"gender":"male","name":{"first":"Юрий","last":"Кононов","middle":"Даниилович"},"location":{"building":52,"street":"Матросова","city":"Красноярск","state":"Республика Северная Осетия-Алания","zip":29153},"username":"awesomecat","email":"awesomecat77@example.com","password":"txVK1rGz2OE","salt":"n3sOezEm_Bc","md5":"88a2dff911a012e19cd723d8df72c0d0","sha1":"2a2226642e66552548682c8776d8c9f2d7d78f9c","sha256":"ff4da6acc62ac12e87b1e6349e16379330a9b6b99c33c8112a051ae5ae006a6d","registered":565408891,"dob":447511538,"phone":"7-495-896-15-96","cell":"7-903-185-91-10","picture":{"large":"http://randomuser.ru/images/men/56.jpg","medium":"http://randomuser.ru/images/men/med/56.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/56.jpg"}}},{"user":{"gender":"male","name":{"first":"Валерий","last":"Наумов","middle":"Викторович"},"location":{"building":91,"street":"Луговая","city":"Новокузнецк","state":"Таймырский (Долгано-Ненецкий) автономный округ","zip":61243},"username":"angryrainbow","email":"angryrainbow34@example.com","password":"xRjQ7Ry0oMY","salt":"AJIcJb26BnU","md5":"8286f2aad5d9b7f66497b603f6a65257","sha1":"90e7c97a795d3acadab00764906f032f34273af3","sha256":"25711c14727056980f391d3c4136633b9ca7b54df0b230c7991a4ecbb1025d60","registered":99429901,"dob":367121320,"phone":"7-495-642-51-28","cell":"7-915-612-67-22","picture":{"large":"http://randomuser.ru/images/men/7.jpg","medium":"http://randomuser.ru/images/men/med/7.jpg","thumbnail":"http://randomuser.ru/images/men/thumb/7.jpg"}}}];
        var self = this;
        var users = arr.map(function(a){
            return {
                name: self.getPrettyName(a.user.name.first, a.user.name.last),
                email: a.user.email,
                avatar: a.user.picture.medium

            }
        });
        return users;
    }



};

module.exports = SportHelper;