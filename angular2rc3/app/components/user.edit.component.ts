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
	public identity;
	public ident;

	constructor(
		private _loginService : LoginService,
		private _userService :  UserService,
		private _route : ActivatedRoute,
		private _router : Router		
		){}

	ngOnInit(){
		let identity = this._loginService.getIdentity();
		this.ident = identity;
		console.log(this.ident);
		if(identity == null){
			console.log("the identity doesn't exists");
			this._router.navigate(["/index"]);

		}else{
			console.log("identity exists");

			this.user = new User(
					identity.sub,
					identity.rol,
					identity.name,
					identity.surname,
					identity.email,
					identity.password,
					"null"
				);
			
		}		
		
	}

	onSubmit(){
		let newPwd;
		//if password in token is equal user password set null
		//the api doest not update the password if the password is null		
		if(this.user.password == this.ident.password){
				this.user.password = "";
			}else{
				newPwd= this.user.password;
			}

		this._userService.update(this.user).subscribe(

			response =>{
				this.status = response.status;
				if(this.status != "success"){
					this.status == "error";
					console.log(response);
				}else{	
					if(this.user.password == this.ident.password){
							this.user.password = this.ident.password;
						}else{
							this.user.password = newPwd;
						}		
					
					localStorage.setItem('identity',JSON.stringify(this.user));		
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