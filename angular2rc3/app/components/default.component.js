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
var video_service_1 = require('../service/video.service');
var generate_date_pipe_1 = require("../pipes/generate.date.pipe");
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var DefaultComponent = (function () {
    function DefaultComponent(_loginService, _videoService, _router, _route) {
        this._loginService = _loginService;
        this._videoService = _videoService;
        this._router = _router;
        this._route = _route;
        this.titlePage = "Videos mas vistos";
        this.identity = this._loginService.getIdentity();
    }
    DefaultComponent.prototype.ngOnInit = function () {
        this.identity = this._loginService.getIdentity();
        this.loading = "show";
        this.getAllVideos();
        console.log(this.identity);
    };
    DefaultComponent.prototype.getAllVideos = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var page = +params["page"];
            if (page == null) {
                page = 1;
            }
            _this._videoService.getVideos(page).subscribe(function (response) {
                console.log(response);
                _this.status = (response.status != null) ? response.status : null;
                if (_this.status != "success") {
                    _this.status = "error";
                }
                else {
                    _this.videos = response.data;
                    _this.loading = "hide";
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log("Error en la peticion");
                }
            });
        });
    };
    DefaultComponent = __decorate([
        core_1.Component({
            selector: 'default',
            templateUrl: 'app/view/default.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, video_service_1.VideoService],
            pipes: [generate_date_pipe_1.GenerateDatePipe]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, video_service_1.VideoService, router_1.Router, router_1.ActivatedRoute])
    ], DefaultComponent);
    return DefaultComponent;
}());
exports.DefaultComponent = DefaultComponent;
//# sourceMappingURL=default.component.js.map