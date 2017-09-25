import {Pipe , PipeTransform} from '@angular/core';

@Pipe({name : 'generateDate'})
export class GenerateDatePipe implements PipeTransform{
	/**
	 * Return a String object with date format dd/mm/yyyy this method can be called from views
	 * after the pipe is iyected in the component
	 * @param String date timestamp format	
	 * @return String date dd/mm/yyyy format
	 */


	transform(value):string{
		
		let date = new Date(value*1000);

		//Get day and concat 0 in case the day is less nine
		let day = date.getDate();
		let final_day = day.toString();

		if(day <= 9){
			final_day = "0"+day;
		}
		//Get month and concat 0 in case the month is less nine
		
		let month = (date.getMonth() + 1);
		let final_month = month.toString();

		if(month <= 9){
			final_month = "0"+month;
		}		

		let result = final_day + "/" + final_month +"/" +date.getFullYear();
		return result;
	}




}