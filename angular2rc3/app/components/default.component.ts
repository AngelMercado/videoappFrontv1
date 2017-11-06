// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
import {LoginService} from '../service/login.service';
import {VideoService} from '../service/video.service'; 
import { GenerateDatePipe } from "../pipes/generate.date.pipe";
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],    
    providers: [LoginService,VideoService],
    pipes: [GenerateDatePipe]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class DefaultComponent { 
	public identity;
	public titlePage:string = "Videos mas vistos";
	public videos;
	public errorMessage;
	public status;
	public loading;

	constructor(private _loginService :LoginService, 
				private _videoService : VideoService,
				private _router : Router,
				private _route : ActivatedRoute){
			
				this.identity = this._loginService.getIdentity();	
	}

	ngOnInit(){
		this.identity = this._loginService.getIdentity();
		this.loading = "show";
		this.getAllVideos();		
		console.log(this.identity);	
	}

	getAllVideos(){
		this._route.params.subscribe(params=>{
			  let page = +params["page"];
			  console.log(page);
			  if(page == null){
			  	page = 1;
			  }
			  this._videoService.getVideos(page).subscribe(
			  	response =>{
			  				console.log(response);
			  				this.status = (response.status != null) ? response.status : null;
			  				if(this.status != "success"){
			  					this.status = "error";
			  				}else{
			  					this.videos = response.data;
			  					this.loading = "hide";
			  				}						
			  			},
			  		error => {				
			  			this.errorMessage = <any> error;
			  			if(this.errorMessage != null){
			  				console.log("Error en la peticion");
			  			}
			  		});


			});

		
	}
}