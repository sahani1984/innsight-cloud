import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app-constant';
import { CollectionManagerUrl } from '../app_url/collection_manager_url';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})
export class JobsDbService {
  _baseUrl: string;
  constructor(private http:HttpClient) { 
    this._baseUrl = AppConstant.baseUrl;
  }

  clientsJobDateWiseMigratedDocumentCount(keywordVo:{}):Observable<{}>{
    return this.http.post<{}>(this._baseUrl+CollectionManagerUrl.clientsJobDateWiseMigratedDocumentCount, keywordVo, httpOptions)
  }

  getCategoryTypeForHeartbeat():Observable<{}>{
    return this.http.get<{}>(this._baseUrl+CollectionManagerUrl.getCategoryTypeForHeartbeat, httpOptions)
  }

  getJobNameForCategoryType(keywordVo:{}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.getJobNameForCategoryType, keywordVo, httpOptions)
  }
  getHeartbeat(keywordVo:{}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.getHeartbeat, keywordVo, httpOptions)
  }
}
