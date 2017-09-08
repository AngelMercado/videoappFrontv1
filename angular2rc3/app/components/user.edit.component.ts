// Importar el núcleo de Angular
import { Component ,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'register',
    templateUrl : 'app/view/user-edit.html',
    directives : [ROUTER_DIRECTIVES],
    providers: [UserService,LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class UserEditComponent implements OnInit{ 
	public title:string = "Configuración de usuario";
	public user:User;
	public errorMessage;
	public status;

	constructor(
		private _loginService : LoginService,
		private _userService :  UserService,
		private _route : ActivatedRoute,
		private _router : Router
		){}

	ngOnInit(){
		let identity = this._loginService.getIdentity();

		if(identity == null){
			console.log("the identity doesn't exists");
			this._router.navigate(["/index"]);

		}else{
			console.log("identity exists");

			this.user = new User(
					identity.sub,
					"user",
					identity.name,
					identity.surname,
					identity.email,
					identity.password,
					"null"
				);
			
		}		
		
	}

	onSubmit(){
		console.log(this.user);

		this._userService.update(this.user).subscribe(

			response =>{
				this.status = response.status;
				if(this.status != "success"){
					this.status == "error";
					console.log(response);
				}else{					
					console.log("user register");
				}
			},
			error =>{
				this.errorMessage = <any> error;
				if(this.errorMessage != null){

					console.log("Error en la peticion");
				}
			}
		);


	}

}