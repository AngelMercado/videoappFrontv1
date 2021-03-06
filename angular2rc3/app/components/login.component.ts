// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]

})
 
// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit{ 
	public titlePage:string = "Formulario de Login";
	public user;
	public errorMessage:string ="";
	public successMessage:string="";
	public identity;
	public data;
	public status;
	private token;

	constructor(private _loginService:LoginService, private _route:ActivatedRoute, private _router:Router){}
	ngOnInit(){
		
		this._route.params.subscribe(params => {
			let logout = +params["id"];
			
			if(logout==1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');
				this.identity = null;
				this.token = null;
				//this._router.navigate(["/index"]);
				window.location.href = "/login";
			
			}
		});

		this.user ={
			"email" : "",
			"password": "",
			"gethash": false
		}

		//redirect index view in case user is authenticated		
		let identity = this._loginService.getIdentity(); 
		if(identity != null && identity.sub ){
			this._router.navigate(["/index"]);
		}

	}
	
	onSubmit(){				
		this._loginService.signup(this.user).subscribe(
				response => {					
						let res= response;	
						this.status = (res.status != null) ? res.status:null;
						this.data = (res.data != null) ? res.data:null;																	
						
						if(this.status != null || this.status =="error"){
							console.log("Service responses a error");		
							console.log(res);
							this.errorMessage = "invalid user or password";
							
						}
						else{
							//THE RESPONSE IS A IDENTITY OBJECT
								let identity = response;
								this.successMessage = "Haz accedido con exito";
								console.log("saving identity in localStorage");
								
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
											alert("error en el servidor");
										}else{
											if(!this.token.status){
												localStorage.setItem('token',JSON.stringify(token));
												//console.log(localStorage.getItem("token"));
												//REDIRECT SUCESS LOGIN
												window.location.href = "/";
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
					},
				error => {
					console.log("Error en la peticion");					
					this.errorMessage = <any> error;
					if(this.errorMessage != null){
						console.log("Error en la peticion");
					}
				}
			);
	}

	
}