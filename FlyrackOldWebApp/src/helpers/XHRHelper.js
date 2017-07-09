/**
 * Created by sabir on 23.08.16.
 */

var XHRHelper = {

    getXmlHttp: function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    },

    //returns blob uri
    loadFile: function(url, onSuccess, onError, onProgress){
        if (url == undefined){
            return;
        }
        var xmlhttp = this.getXmlHttp();
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function() {
            if (this.status == 200) {
                var blob_uri = URL.createObjectURL(this.response);
                onSuccess(blob_uri);
            }else {
                onError();
            }
        };
        xmlhttp.onerror = function(){
            onError();
        }
        xmlhttp.onprogress = function(event){
            if (onProgress != undefined){
                onProgress(event.loaded, event.total);
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send(null);
    },

    uploadFile: function(file, onSuccess, onError, onProgress){
        var uploadUrl = 'http://www.sabir.pro/upload.php';
        var baseDir = '';

        var xhr = this.getXmlHttp();
        var formData = new FormData();
        formData.append("file", file);

        xhr.onload = function() {
            if (this.status == 200) {
                console.log('onload occured: this.response = ', this.response);
                onSuccess(this.response);
                //var blob_uri = URL.createObjectURL(this.response);
                //onSuccess(blob_uri);
            }else {
                //onError();
            }
        };
        xhr.onerror = function(){
            onError();
        }
        xhr.upload.onprogress = function(event){
            if (onProgress != undefined){
                console.log('onprogress: event = ', event);
                var perc = Math.round(1000.0 * event.loaded / event.total) / 10.0;
                onProgress(perc);
                //onProgress(event.loaded, event.total);
            }
        }
        xhr.open('POST', uploadUrl, true);
        xhr.send(formData);

    },

    uploadImage: function(file, onSuccess, onError, onProgress){
        this.uploadFile(file, function(data){
            onSuccess(JSON.parse(data));
        }, onError, onProgress);
    }

};

module.exports = XHRHelper;