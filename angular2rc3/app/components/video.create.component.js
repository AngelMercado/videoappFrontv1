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
// Importar el núcleo de Angular
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('../service/login.service');
var upload_service_1 = require('../service/upload.service');
var video_service_1 = require('../service/video.service');
var video_1 = require("../model/video");
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var VideoCreateComponent = (function () {
    function VideoCreateComponent(_loginService, _uploadService, _videoService, _router, _route) {
        this._loginService = _loginService;
        this._uploadService = _uploadService;
        this._videoService = _videoService;
        this._router = _router;
        this._route = _route;
        this.titlePage = "Crear un nuevo video";
    }
    VideoCreateComponent.prototype.ngOnInit = function () {
        this.video = new video_1.Video(1, "", "", "public", "null", "null", null, null);
    };
    VideoCreateComponent.prototype.callVideoStatus = function (value) {
        this.video.status = value;
    };
    VideoCreateComponent.prototype.onSubmit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._videoService.createVideo(token, this.video).subscribe(function (response) {
            console.log(response);
            _this.status = (response.status != null) ? response.status : null;
            if (_this.status != "success") {
                _this.status = "error";
            }
            else {
                _this.video = response.data;
                console.log(_this.video);
            }
        }, function (error) {
            console.log("Error en la peticion");
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log("Error en la peticion");
            }
        });
    };
    VideoCreateComponent = __decorate([
        core_1.Component({
            selector: 'video-new',
            templateUrl: 'app/view/video-create.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, upload_service_1.UploadService, video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, upload_service_1.UploadService, video_service_1.VideoService, router_1.Router, router_1.ActivatedRoute])
    ], VideoCreateComponent);
    return VideoCreateComponent;
}());
exports.VideoCreateComponent = VideoCreateComponent;
//# sourceMappingURL=video.create.component.js.map