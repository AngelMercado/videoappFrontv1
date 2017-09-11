// Importar el núcleo de Angular
import { Component ,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { UploadService } from '../service/upload.service';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'register',
    templateUrl : 'app/view/user-edit.html',
    directives : [ROUTER_DIRECTIVES],
    providers: [UserService,LoginService,UploadService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class UserEditComponent implements OnInit{ 
	public title:string = "Configuración de usuario";
	public user:User;
	public errorMessage;
	public status;
	public identity;
	public ident;
	public filesToUpload : Array<File>;
	public resultUpload;

	constructor(
		private _loginService : LoginService,
		private _userService :  UserService,
		private _uploadService : UploadService,
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
	fileChangeEvent(fileInput: any){
		console.log("file changed");
		this.filesToUpload = <Array<File>> fileInput.target.files;

		let token = this._loginService.getToken();
		//later create a file with the constants
		let url = "http://localhost/videoapp/symphony/web/app_dev.php/user/updateImage";

		this._uploadService.makeFileRequest(token,url,['image'],this.filesToUpload).then(
			(result) => {
					this.resultUpload = result;
					console.log(this.resultUpload);
					//update image reference in identity
					let identity = this._loginService.getIdentity();
					if(identity!="undefined"){
						identity.image = this.resultUpload.imgPath;
						//SAVE IDENTITY IN localStorage and update the DOM
						localStorage.setItem('identity',JSON.stringify(identity));
						document.getElementById("user-profile-image").setAttribute("src","http://localhost/videoapp/symphony/web/uploads/user/"+identity.image);
					}
				},
			(error) =>{
				console.log(error);
			});


	}

}