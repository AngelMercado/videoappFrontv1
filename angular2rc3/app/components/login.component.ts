// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]

})
 
// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit{ 
	public title:string = "Formulario de Login";
	public user;
	public errorMessage:string ="";
	public identity;
	private token;
	constructor(private _loginService:LoginService){

	}
	ngOnInit(){
		
		this.user ={
			"email" : "",
			"password": "",
			"gethash": false
		}
		let ide = this._loginService.getIdentity();
		let tk = this._loginService.getToken();
		console.log(ide);
		console.log(tk);

	}
	
	onSubmit(){
		this._loginService.signup(this.user).subscribe(
				response => {
						
						let identity = response;
						this.identity = identity;
						
						if(this.identity.length <= 0 ){
							alert("error en la autenticación");
						}
						else{
							//VERIFY DONT RETURN SOMETHING DIFERENT TO IDENTY
							if(!this.identity.status){
								//SAVE IDENTITY IN STORAGE
								localStorage.setItem('identity',JSON.stringify(identity));
								//console.log(localStorage.getItem("identity"));

								//GET TOKEN FROM LOGIN SERVICE								
								this.user.gethash = true;
								this._loginService.signup(this.user).subscribe(
									response => {
										let token = response;
										this.token = token;

										if(this.token.length <=0){
											alert("error en el servidor")
										}else{
											if(!this.token.status){
												localStorage.setItem('token',JSON.stringify(token));
												//console.log(localStorage.getItem("token"));
												//REDIRECT SUCESS LOGIN
											}
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
					},
				error => {
					this.errorMessage = <any> error;
					if(this.errorMessage != null){
						console.log("Error en la peticion");
					}
				}
			);
	}

	
}