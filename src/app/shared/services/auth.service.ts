import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstant } from '../app-constant';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionManagerUrl } from '../app_url/collection_manager_url';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _baseUrl: string;

  private isUserLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstant.baseUrl;
    let islogined = sessionStorage.getItem('islogin');   
    if (islogined) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  
  setLoggedIn() {
    this.isUserLoggedIn = true;
    sessionStorage.setItem('islogin', 'true')
  }

  getLoggedIn() {
    return this.isUserLoggedIn;
  }

  loggedOut() {
    this.isUserLoggedIn = false;
  }



  /**ACCOUNTS**/
  validateLogin(keywordVo: {}): Observable<any> {
    return this.http.post<any>(this._baseUrl + CollectionManagerUrl.validate_Login, keywordVo, httpOptions)
      .pipe(map(res => {
        if (res["status"] == "success") {
          let user: any = res["data"][0]
          if (user) {
            sessionStorage.setItem('log_user', JSON.stringify(user))
          }
        }
        return res;
      }))
  }


}
