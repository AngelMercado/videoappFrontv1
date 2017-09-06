import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RegisterService{
	public url = "http://localhost/videoapp/symphony/web/app_dev.php";
	public identity;
	public token;

	constructor(private _http: Http){}
	register(user){
		let json = JSON.stringify(user);
		let params = "json="+json;		
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/user/create",params,{headers:headers})
					.map(res => res.json());
	
	}		
}