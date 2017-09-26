// Importar el núcleo de Angular
import {Component,OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router'
import {LoginService} from '../service/login.service';
import {User} from "../model/user";
import {Video} from "../model/video";
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],    
    providers: [LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CommentComponent implements OnInit{ 	
	
	public titleComments:string = "Comentarios";
	public comment;
	public identity;
	constructor(private _loginService:LoginService,
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
		console.log(this.comment);
	}



}