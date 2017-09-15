import { Component , OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';
import { VideoService } from "../service/video.service";
import { User } from "../model/user";
import {Video} from "../model/video";

@Component({
	selector: "video-detail",
	templateUrl: "app/view/video-detail.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService,VideoService]

})	

export class VideoDetailComponent implements OnInit{
	public title: string = "Detalle del video";
	public videoId: number;
	public video;
	public errorMessage;
	public status;

	constructor(
		private _loginService : LoginService,
		private _videoService : VideoService,
		private _route: ActivatedRoute,
		private _router: Router){}
	
	ngOnInit(){
		//get id from url path

		this._route.params.subscribe(
			params => { 
				let id = +params["id"];
				this.videoId = id; 
				this._videoService.getVideo(id).subscribe(
					response =>{
						this.status = response.status;
						if(this.status =! "success"){
								this._router.navigate(['/index']);
							}else{
								this.video = response.data;
							}
						},
					error=>{
						this.errorMessage = <any> error;
						if(this.errorMessage != null){
							alert(this.errorMessage);
						}
					}
					);
			});

		console.log("detail component loaded");
	}



}