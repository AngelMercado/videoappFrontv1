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
var user_service_1 = require('../service/user.service');
var login_service_1 = require('../service/login.service');
var router_1 = require('@angular/router');
var user_1 = require('../model/user');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var UserEditComponent = (function () {
    function UserEditComponent(_loginService, _userService, _route, _router) {
        this._loginService = _loginService;
        this._userService = _userService;
        this._route = _route;
        this._router = _router;
        this.title = "Configuración de usuario";
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var identity = this._loginService.getIdentity();
        if (identity == null) {
            console.log("the identity doesn't exists");
            this._router.navigate(["/index"]);
        }
        else {
            console.log("identity exists");
            this.user = new user_1.User(identity.sub, "user", identity.name, identity.surname, identity.email, identity.password, "null");
        }
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        this._userService.update(this.user).subscribe(function (response) {
            _this.status = response.status;
            if (_this.status != "success") {
                _this.status == "error";
                console.log(response);
            }
            else {
                console.log("user register");
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log("Error en la peticion");
            }
        });
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'app/view/user-edit.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService, login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user.edit.component.js.map