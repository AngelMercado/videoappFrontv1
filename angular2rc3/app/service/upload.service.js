"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var UploadService = (function () {
    function UploadService(_http) {
        this._http = _http;
    }
    UploadService.prototype.makeFileRequest = function (token, url, params, files) {
        return new Promise(function (resolve, reject) {
            //create a FormData and add inputs to send a request 
            var formData = new FormData();
            //create a client http 
            var xhr = new XMLHttpRequest();
            var name_file_input = params[0];
            var i = 0;
            for (i; i < files.length; i++) {
                //creates inputs and puts the values
                formData.append(name_file_input, files[i], files[i].name);
            }
            formData.append("authorization", token);
            //implement onreadystatechange
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            //add Listener to event upload
            xhr.upload.addEventListener("progress", function (event) {
                //restart the progressBar whe user fires the event 
                document.getElementById("upload-progress-bar").setAttribute("value", "0");
                document.getElementById("upload-progress-bar").style.width = "0%";
                //get the percent of the uploaded file 
                var percent = (event.loaded / event.total) * 100;
                var prc = Math.round(percent).toString();
                //change the value of the progressBar
                document.getElementById("upload-progress-bar").setAttribute("value", prc);
                document.getElementById("upload-progress-bar").style.width = prc + "%";
                document.getElementById("status").innerHTML = Math.round(percent) + " % subiendo porfavor espera a que termine";
            }, false);
            //add Listener to xhr when is load
            xhr.addEventListener("load", function () {
                var prc = "100";
                document.getElementById("status").innerHTML = "Subida completada";
                document.getElementById("upload-progress-bar").setAttribute("value", prc);
                document.getElementById("upload-progress-bar").setAttribute("aria-valuenow", prc);
                document.getElementById("upload-progress-bar").style.width = prc + "%";
            }, false);
            //add Listener to xhr in error event
            xhr.addEventListener("error", function () {
                document.getElementById("status").innerHTML = "Error al subir la imagen";
            }, false);
            //add Listener to xhr in abort event
            xhr.addEventListener("abort", function () {
                document.getElementById("status").innerHTML = "Subida Abortada";
            });
            //open conexion
            xhr.open("POST", url, true);
            //make request 
            xhr.send(formData);
        });
    };
    UploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map