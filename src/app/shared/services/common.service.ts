import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {  
  graphdata:any = new Subject<any>()

  constructor() { }

  sendGraphData(obj:{}){
    return this.graphdata.next(obj);    
  }

  getGraphData(){
    return this.graphdata.asObservable();
  }

  public allSourceList:any = [];


}
