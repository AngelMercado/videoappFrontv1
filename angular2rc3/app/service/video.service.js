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
var VideoService = (function () {
    function VideoService(_http) {
        this._http = _http;
        //note: add constants later
        this.url = "http://localhost/videoapp/symphony/web/app_dev.php";
    }
    VideoService.prototype.createVideo = function (token, video) {
        var json = JSON.stringify(video);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/video/create", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VideoService.prototype.getVideo = function (videoId) {
        return this._http.get(this.url + "/video/detail/" + videoId)
            .map(function (res) { return res.json(); });
    };
    VideoService.prototype.getLastVideos = function () {
        return this._http.get(this.url + "/video/lastVideos")
            .map(function (res) { return res.json(); });
    };
    VideoService.prototype.getVideos = function (page) {
        if (page == null) {
            page = 1;
        }
        return this._http.get(this.url + "/video/list?page=" + page)
            .map(function (res) { return res.json(); });
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map