import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommentService{

	public url = "http://localhost/videoapp/symphony/web/app_dev.php";
	public identity;
	public token;


	constructor(private _http: Http){}

	create(token,comment){

		let json = JSON.stringify(comment);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/comment/create",params ,{headers:headers})
					.map(res=>res.json());


	}
}