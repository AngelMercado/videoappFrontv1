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
var login_service_1 = require('../service/login.service');
var router_1 = require('@angular/router');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var LoginComponent = (function () {
    function LoginComponent(_loginService, _route, _router) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
        this.titlePage = "Formulario de Login";
        this.errorMessage = "";
        this.successMessage = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var logout = +params["id"];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                _this.identity = null;
                _this.token = null;
                //this._router.navigate(["/index"]);
                window.location.href = "/login";
            }
        });
        this.user = {
            "email": "",
            "password": "",
            "gethash": false
        };
        //redirect index view in case user is authenticated		
        var identity = this._loginService.getIdentity();
        if (identity != null && identity.sub) {
            this._router.navigate(["/index"]);
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this._loginService.signup(this.user).subscribe(function (response) {
            var res = response;
            _this.status = (res.status != null) ? res.status : null;
            _this.data = (res.data != null) ? res.data : null;
            if (_this.status != null || _this.status == "error") {
                console.log("Service responses a error");
                console.log(res);
                _this.errorMessage = "invalid user or password";
            }
            else {
                //THE RESPONSE IS A IDENTITY OBJECT
                var identity = response;
                _this.successMessage = "Haz accedido con exito";
                console.log("saving identity in localStorage");
                //SAVE IDENTITY IN STORAGE
                localStorage.setItem('identity', JSON.stringify(identity));
                //console.log(localStorage.getItem("identity"));
                //GET TOKEN FROM LOGIN SERVICE								
                _this.user.gethash = true;
                _this._loginService.signup(_this.user).subscribe(function (response) {
                    var token = response;
                    _this.token = token;
                    if (_this.token.length <= 0) {
                        alert("error en el servidor");
                    }
                    else {
                        if (!_this.token.status) {
                            localStorage.setItem('token', JSON.stringify(token));
                            //console.log(localStorage.getItem("token"));
                            //REDIRECT SUCESS LOGIN
                            window.location.href = "/";
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log("Error en la peticion");
                    }
                });
            }
        }, function (error) {
            console.log("Error en la peticion");
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log("Error en la peticion");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/view/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map