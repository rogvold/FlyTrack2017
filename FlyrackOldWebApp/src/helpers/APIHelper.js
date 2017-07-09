/**
 * Created by sabir on 05.09.16.
 */

var APIHelper = {

    sendRequest: function(headers, data, url, requestType, callback, errorCallback){
        var oReq = new XMLHttpRequest();
        oReq.open(requestType, url);

        for (var i in headers){
            oReq.setRequestHeader(headers[i].name, headers[i].value);
        }

        if (requestType.toUpperCase() == 'POST'){
            oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        oReq.onreadystatechange = function() {//Call a function when the state changes.
            console.log('onreadystatechange: oReq  = ', oReq);
            if(oReq.readyState == 4 && oReq.status == 200) {
                console.log('oReq.responseText = ', oReq.responseText);
                console.log('typeof oReq.responseText = ', typeof oReq.responseText);
                callback(JSON.parse(oReq.responseText));
            }else {
                if (errorCallback != undefined){
                    errorCallback(JSON.parse(oReq.responseText));
                }
            }
        }

        oReq.send(JSON.stringify(data));
    },

    getCurlString: function(headers, data, url, requestType){
        if (data == undefined){
            data = {};
        }
        var s = 'curl -X ' + requestType + ' \n';
        for (var i in headers){
            s = s + '-H "' + headers[i].name + ": " + headers[i].value + '"' + '  \n';
        }
        if (requestType == 'POST'){
            s = s + "-d '" + JSON.stringify(data) + "' \n";
        }

        s = s + url;
        return s;
    }

};

module.exports = APIHelper;