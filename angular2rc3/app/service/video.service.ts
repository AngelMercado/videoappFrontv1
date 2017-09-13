import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";

@Injectable()
export class VideoService{
	//note: add constants later
	public url = "http://localhost/videoapp/symphony/web/app_dev.php";
	public identity;
	public token;

	constructor(private _http: Http){}

	createVideo(token,video){
		let json = JSON.stringify(video);
		let params = "json="+json+"&authorization="+token;

		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/video/create",params,{headers:headers})
				.map(res=>res.json());
	}
}