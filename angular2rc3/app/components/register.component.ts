// Importar el núcleo de Angular
import {Component ,OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'register',
    templateUrl : 'app/view/register.html',
    directives : [ROUTER_DIRECTIVES],
    providers: [UserService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class RegisterComponent implements OnInit{ 
	public title:string = "Registro de usuario";
	public user:User;
	public errorMessage;
	public status;
	
	constructor(
		private _UserService :  UserService,
		private _route : ActivatedRoute,
		private _router : Router
		){}

	ngOnInit(){
		this.user = new User(1,"user","","","","","null");
	}

	onSubmit(){
		console.log(this.user);

		this._UserService.register(this.user).subscribe(

			response =>{
				this.status = response.status;
				if(this.status != "success"){
					this.status == "error";
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