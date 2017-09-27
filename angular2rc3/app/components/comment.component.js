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
var comment_service_1 = require('../service/comment.service');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var CommentComponent = (function () {
    function CommentComponent(_loginService, _commentService, _router, _route) {
        this._loginService = _loginService;
        this._commentService = _commentService;
        this._router = _router;
        this._route = _route;
        this.titleComments = "Comentarios";
        this.comment = {};
    }
    CommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = null;
        this.identity = this._loginService.getIdentity();
        this._route.params.subscribe(function (params) {
            id = +params["id"];
            _this.comment = {
                "video_id": id,
                "body": ""
            };
        });
    };
    CommentComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("algo");
        var token = this._loginService.getToken();
        this._commentService.create(token, this.comment).subscribe(function (response) {
            console.log(response);
            _this.status = (response.status != null) ? response.status : null;
            if (_this.status != "success") {
                _this.status = "error";
            }
            else {
                _this.comment = {
                    "video_id": "",
                    "body": ""
                };
            }
        }, function (error) {
            console.log("Error en la peticion");
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log("Error en la peticion");
            }
        });
    };
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'comments',
            templateUrl: 'app/view/comments.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, comment_service_1.CommentService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, comment_service_1.CommentService, router_1.Router, router_1.ActivatedRoute])
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map