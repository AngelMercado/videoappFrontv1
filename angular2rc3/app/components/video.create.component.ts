// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
import {LoginService} from '../service/login.service';
import {UploadService} from '../service/upload.service';
import {VideoService} from '../service/video.service';
import {User} from "../model/user";
import {Video} from "../model/video";
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video-create.html',
    directives: [ROUTER_DIRECTIVES],    
    providers: [LoginService,UploadService,VideoService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class VideoCreateComponent implements OnInit{ 	

	public titlePage : string = "Crear un nuevo video";
	public video;
	public status;
	public errorMessage;

	constructor(private _loginService : LoginService,
				private _uploadService : UploadService,
				private _videoService : VideoService,
				private _router : Router,
				private _route : ActivatedRoute){}

	ngOnInit(){
		
		this.video = new Video(1,"","","public","null","null",null,null);
	}

	callVideoStatus(value){
		this.video.status = value;
	}

	onSubmit(){
		let token = this._loginService.getToken();

		this._videoService.createVideo(token,this.video).subscribe(
				response =>{
						console.log(response);
						this.status = (response.status != null) ? response.status : null;
						if(this.status != "success"){
							this.status = "error";
						}else{
							this.video = response.data;
							console.log(this.video);
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