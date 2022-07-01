
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(
  
  ) { }

  public  getCurrentDate()
    {
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
        return output;
    }

convertDateFormatddMMyyyy(d:Date)
{
  var month = d.getMonth()+1;
  var day = d.getDate();
  var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
  return output;
}

convertDateFormatyyyy_MM_dd(d:Date)
{
  var month = d.getMonth()+1;
  var day = d.getDate();
 
  var day1=((''+day).length<2 ? '0' : '') + day;
  var month1=((''+month).length<2 ? '0' : '') + month;
  var year=d.getFullYear();
  var output=year+'-'+month1+'-'+day
  //var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
  return output;
}

    
public getAddDaysToCurrentDate()
    {
        var d = new Date();
        d.setDate(d.getDate() + 7);
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
        return output;
    }

public getAddedDaysToCurrentDate(day:number)
    {
        var d = new Date();
        d.setDate(d.getDate() + day);
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
        return output;
    }


public getSubtDaysToCurrentDate()
{
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;
}


convertStringToDate()
{
  var  dFrom1 = (String(this.getSubtDaysToCurrentDate()));
  var  dTo1    = (String(this.getCurrentDate()));
  var dfrom= +dFrom1.split("/")[0];
  var mfrom=+(dFrom1.split("/")[1])-1;
  var yfrom=+(dFrom1.split("/")[2]);
  var dTo= +dTo1.split("/")[0];
  var mTo=+(dTo1.split("/")[1])-1;
  var yTo=+(dTo1.split("/")[2]);
  var mydateFrom = new Date(yfrom,mfrom,dfrom);
  var mydateTo = new Date(yTo,mTo,dTo);
  var dateArr=[mydateFrom,mydateTo];
  return dateArr;
}


convertStringToDateFromDb(dat:string)
{
  var dfrom= +dat.split("/")[0];
  var mfrom=+(dat.split("/")[1])-1;
  var yfrom=+(dat.split("/")[2]);
  var mydate = new Date(yfrom,mfrom,dfrom);
  return mydate;
}



getNext30_dayStringConvertedToDate()
{
  var  dFrom1 = (String(this.getAddedDaysToCurrentDate(30)));
  var  dTo1    = (String(this.getCurrentDate()));
  var dfrom= +dFrom1.split("/")[0];
  var mfrom=+(dFrom1.split("/")[1])-1;
  var yfrom=+(dFrom1.split("/")[2]);
  var dTo= +dTo1.split("/")[0];
  var mTo=+(dTo1.split("/")[1])-1;
  var yTo=+(dTo1.split("/")[2]);
  var mydateFrom = new Date(yfrom,mfrom,dfrom);
  var mydateTo = new Date(yTo,mTo,dTo);
  var dateArr=[mydateFrom,mydateTo];
  return dateArr;
}



convertDateToString(unixtimestamp){
  // Months array
  var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // Convert timestamp to milliseconds
  var date = new Date(unixtimestamp);
  // Year
  var year = date.getFullYear();
  // Month
  var month = months_arr[date.getMonth()];
  // Day
  var day = date.getDate();
  // Hours
  var hours = date.getHours();
  // Minutes
  var minutes = "0" + date.getMinutes();
  // Seconds
  var seconds = "0" + date.getSeconds();
  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime = month+' '+day+', '+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
   return convdataTime; 
 }



 
}
