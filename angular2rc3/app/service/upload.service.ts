import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UploadService{
	public progressBar;

	constructor(private _http :Http){}

	makeFileRequest(token, url:string, params: Array<string> , files: Array<File>){
		return new Promise((resolve,reject)=>{
			//create a FormData and add inputs to send a request 
			var formData: any = new FormData();
			//create a client http 
			var xhr = new XMLHttpRequest();
			var name_file_input = params[0];
			var i =0;
			for(i; i<files.length; i++){
				//creates inputs and puts the values
				formData.append(name_file_input,files[i],files[i].name);
			}

			formData.append("authorization",token);

			//implement onreadystatechange
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}


			//add Listener to event upload
			xhr.upload.addEventListener("progress", function(event:any){
				//restart the progressBar whe user fires the event 
				document.getElementById("upload-progress-bar").setAttribute("value","0");
				document.getElementById("upload-progress-bar").style.width = "0%";

				//get the percent of the uploaded file 
				var percent = (event.loaded / event.total) * 100;
				let prc = Math.round(percent).toString();

				//change the value of the progressBar
				document.getElementById("upload-progress-bar").setAttribute("value",prc);
				document.getElementById("upload-progress-bar").style.width= prc + "%";
				document.getElementById("status").innerHTML = Math.round(percent)+" % subiendo porfavor espera a que termine";

				},false);

			//add Listener to xhr when is load
			xhr.addEventListener("load",function(){
				let prc = "100";
				document.getElementById("status").innerHTML = "Subida completada";
				document.getElementById("upload-progress-bar").setAttribute("value",prc);
				document.getElementById("upload-progress-bar").setAttribute("aria-valuenow",prc);
				document.getElementById("upload-progress-bar").style.width= prc + "%";				

				},false);

			//add Listener to xhr in error event
			xhr.addEventListener("error",function(){
				document.getElementById("status").innerHTML = "Error al subir la imagen";

			},false);

			//add Listener to xhr in abort event
			xhr.addEventListener("abort",function(){
				document.getElementById("status").innerHTML = "Subida Abortada";	
			});

			//open conexion
			xhr.open("POST",url,true);

			//make request 
			xhr.send(formData);

		});



	}

}
