// Importar el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
import { LoginService } from '../service/login.service';
import { CommentService } from '../service/comment.service';
import { User } from "../model/user";
import { Video } from "../model/video";
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],    
    providers: [LoginService,CommentService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CommentComponent implements OnInit{ 	
	
	public titleComments:string = "Comentarios";
	public comment={};
	public identity;
	public status;
	public 	errorMessage;

	constructor(private _loginService:LoginService,
				private _commentService:CommentService,
				private _router:Router,
				private _route:ActivatedRoute){}

	ngOnInit(){
		let id = null;
		this.identity = this._loginService.getIdentity();
		
		this._route.params.subscribe(
				params=>{
					id = +params["id"];	

					this.comment = {
						"video_id": id,
						"body": ""
					};

				}
			);
		
	}

	onSubmit(){
		console.log("algo");
		let token = this._loginService.getToken();
		this._commentService.create(token,this.comment).subscribe(
			response =>{
					console.log(response);

					this.status = (response.status != null) ? response.status : null;
					if(this.status != "success"){
						this.status = "error";
					}else{
						this.comment = {
							"video_id" :"",
							"body": "";
						};
						//console.log(this.comment);
					}						
				},
			error => {
				console.log("Error en la peticion");					
				this.errorMessage = <any> error;
				if(this.errorMessage != null){
					console.log("Error en la peticion");
				}
			});

	}



}