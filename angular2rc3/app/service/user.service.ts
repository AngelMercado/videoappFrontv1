import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";

@Injectable()
export class UserService{
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
	update(user){
		let json = JSON.stringify(user);		
		let params = "json="+json+"&authorization="+this.getToken();
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		console.log(params);
		return this._http.post(this.url+"/user/update",params,{headers:headers})
					.map(res => res.json());

	}
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			identity = identity;
		}else{
			identity = null;
		}
		return identity;
	}
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
}