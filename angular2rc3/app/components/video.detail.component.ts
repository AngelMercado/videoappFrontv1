import { Component , OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';
import { VideoService } from "../service/video.service";
import { GenerateDatePipe } from "../pipes/generate.date.pipe";
import { User } from "../model/user";
import {Video} from "../model/video";

@Component({
	selector: "video-detail",
	templateUrl: "app/view/video-detail.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService,VideoService],
	pipes: [GenerateDatePipe]

})	

export class VideoDetailComponent implements OnInit{
	public title: string = "Detalle del video";
	public videoId: number;
	public video;
	public errorMessage;
	public status;
	public loading = 'show';
	public lastVideos;
	public statusLastVideos;

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
				//get videoDetail
				this.videoId = id; 
				this._videoService.getVideo(id).subscribe(
					response =>{
						this.status = response.status;
						if(this.status =! "success"){
								this._router.navigate(['/index']);
							}else{
								this.video = response.data;
							}
							this.loading = 'hiden';
						},
					error=>{
						this.errorMessage = <any> error;
						if(this.errorMessage != null){
							alert(this.errorMessage);
						}
					}
					);

				//get last Videos

				this._videoService.getLastVideos().subscribe(
					response=>{
						this.lastVideos = response.data;
						this.statusLastVideos = response.status;

						if(this.statusLastVideos != "success"){
							this._router.navigate(["/index"]);
						}
					},
					error=>{

						this.errorMessage = <any> error;
						if(this.errorMessage !=null){
							alert(this.errorMessage);	
						}
					}

					);
			});

		
	}



}