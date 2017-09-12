// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
import {LoginService} from '../service/login.service';
import {UploadService} from '../service/upload.service';
import {User} from "../model/user";
import {Video} from "../model/video";
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video-create.html',
    directives: [ROUTER_DIRECTIVES],    
    providers: [LoginService,UploadService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class VideoCreateComponent implements OnInit{ 	

	public title:string = "Crear un nuevo video";

	constructor(private _loginService : LoginService,
				private _uploadService : UploadService,
				private _router : Router,
				private _route : ActivatedRoute){}

	ngOnInit(){
		
		console.log("VideoCreateComponent loaded");	
	}

}