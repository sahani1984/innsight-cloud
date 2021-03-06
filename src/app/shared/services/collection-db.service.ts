import { CollectionManagerUrl } from './../app_url/collection_manager_url';
import { AppConstant } from './../app-constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class CollectionDbService {
  _baseUrl: string;
  _innsightUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = AppConstant.baseUrl;
    this._innsightUrl = AppConstant.innsightBaseUrls;

  }




  selectAllMaster(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.selectAllMaster, keywordVo, httpOptions);
  }


  /*****AVATAR Category**********/
  addNewAvatarCategory(keywordVo: {}): Observable<boolean> {
    return this.http.post<boolean>(this._baseUrl + CollectionManagerUrl.ADD_NEW_AVATAR_CATEGORY, keywordVo, httpOptions);
  }
  deleteAvatarCategoryById(keywordVo: {}): Observable<string> {
    return this.http.post<string>(this._baseUrl + CollectionManagerUrl.DELETE_AVATAR_CATEGORY_BYId + "?categoryId=" + keywordVo["categoryId"], httpOptions);
  }
  selectAllAvatarCategory(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.SELECT_ALL_AVATAR_CATEGORY, keywordVo, httpOptions);
  }
  updateAvatarCategory(keywordVo: {}): Observable<boolean> {
    return this.http.post<boolean>(this._baseUrl + CollectionManagerUrl.UPDATE_AVATAR_CATEGORY, keywordVo, httpOptions);
  }





  /*************Avatar Managment************************* */
  addNewAvatar(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_New_Avatar, keywordVo, httpOptions);
  }
  deleteAvatarById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_Avatar_By_Id + "?id=" + keywordVo["id"], httpOptions);
  }
  selectAllAvatar(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_All_Avatar, keywordVo, httpOptions);
  }
  selectAvatarById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_Avatar_By_Id + "?id=" + keywordVo["id"], httpOptions);
  }

  changeStatusOfAvatar(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.change_Status_Of_Avatar, keywordVo, httpOptions);
  }

  updateAvatar(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.update_Avatar, keywordVo, httpOptions);
  }


  /*************Proxy Managment************************* */
  addNewProxy(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_New_Proxy, keywordVo, httpOptions);
  }
  deleteProxyById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_Proxy_By_Id + "?id=" + keywordVo["id"], httpOptions);
  }
  selectAllProxy(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_All_Proxy, keywordVo, httpOptions);
  }
  selectProxyById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_Proxy_By_Id + "?id=" + keywordVo["id"], httpOptions);
  }

  changeStatusOfProxy(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.change_Status_Of_Proxy, keywordVo, httpOptions);
  }

  updateProxy(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.update_Proxy, keywordVo, httpOptions);
  }

  /*News Source Api*/
  /*category management*/
  addNewNewsCategory(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_New_News_Category, keywordVo, httpOptions)
  }

  deleteNewsCategoryById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_News_Category_ById + "=" + keywordVo["recordId"], keywordVo, httpOptions);
  }
  selectAllNewsCategory(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.select_All_News_Category, keywordVo, httpOptions);
  }

  /*language management */
  addNewsLanguage(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_News_Language, keywordVo, httpOptions);
  }

  deleteNewsLanguageById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_News_Language_ById + "=" + keywordVo["recordId"], keywordVo, httpOptions);
  }

  selectAllNewsLanguage(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.select_All_News_Language, keywordVo, httpOptions)
  }

  /*news source*/
  addNewsSource(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_News_Source, keywordVo, httpOptions);
  }

  deleteNewsSourceById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_News_Source_ById + "=" + keywordVo["recordId"], keywordVo, httpOptions)
  }

  selectAllNewsSource(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.select_All_News_Source, keywordVo, httpOptions);
  }

  selectNewsSourceById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_News_Source_ById, keywordVo, httpOptions);
  }

  updateNewsSource(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.update_News_Source, keywordVo, httpOptions);
  }

  updateStatusNewsSource(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.update_Status_News_Source, keywordVo, httpOptions);
  }

  /**Client Manager**/
  addNewClient(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.add_NewClient, keywordVo, httpOptions)
  }
  updateClient(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.update_Client, keywordVo, httpOptions);
  }
  deleteClientById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.delete_ClientById, keywordVo, httpOptions);
  }
  selectAllClient(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.select_AllClient, keywordVo, httpOptions);
  }
  selectClientById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.select_ClientById, keywordVo, httpOptions);
  }

  /**Cloud Logs**/
  loadLoggingType(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.loadLoggingType, keywordVo, httpOptions);
  }
  getApiNamesForType(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.getApiNamesForType, keywordVo, httpOptions);
  }
  getLoggingData(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.getLoggingData, keywordVo, httpOptions)
  }
  loadSourcesForLog(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.loadSourcesForLog, keywordVo);
  }
  loadProfileTypeForLog(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.loadProfileTypeForLog, keywordVo);
  }

  loadMachineIP(): Observable<{}> {
    return this.http.get<{}>(this._baseUrl + CollectionManagerUrl.loadMachineIP, httpOptions);
  }

  loadClientsForLog(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.loadClientsForLog, keywordVo);
  }

  /**MANAGE JOBS**/
  listCollection(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.listCollection, keywordVo, httpOptions);
  }
  deleteCollection(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._innsightUrl + CollectionManagerUrl.deleteCollection, keywordVo, httpOptions);
  }
  deleteMultipleCollection(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._innsightUrl + CollectionManagerUrl.deleteMultipleCollection, keywordVo, httpOptions);
  }
  updateCollectionPausedStatusById(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._innsightUrl + CollectionManagerUrl.updateCollectionPausedStatusById, keywordVo, httpOptions);
  }
  updateCollectionPausedStatusAll(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._innsightUrl + CollectionManagerUrl.updateCollectionPausedStatusAll, keywordVo, httpOptions);
  }
  showAllKeywordFromSearchList(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._innsightUrl + CollectionManagerUrl.showAllKeywordFromSearchList, keywordVo, httpOptions);
  }
  listKeywordOfCollection(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.listKeywordOfCollection, keywordVo, httpOptions);
  }

  loggedData(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.collectionLoggedData, keywordVo, httpOptions)
  }

  jobLoggedData(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.collectionJobLoggingData, keywordVo, httpOptions)
  }


  reCrawling(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.ToRecrawling, keywordVo, httpOptions)
  }

  /** CHARTS**/
  clientWiseCollectionCount(): Observable<[{}]> {
    return this.http.get<[{}]>(this._baseUrl + CollectionManagerUrl.clientWiseCollectionCount, httpOptions)
  }

  clientWiseCollectionActiveInactiveCount(): Observable<[{}]> {
    return this.http.get<[{}]>(this._baseUrl + CollectionManagerUrl.clientWiseCollectionActiveInactiveCount, httpOptions)
  }

  collectionEntityStatusCountForClient(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.collectionEntityStatusCountForClient, httpOptions)
  }
  collectionEntitySourceWiseStatusCountForClient(keywordVo: {}): Observable<[{}]> {
    return this.http.post<[{}]>(this._baseUrl + CollectionManagerUrl.collectionEntitySourceWiseStatusCountForClient, httpOptions)
  }

  statusCount(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.statusCount, keywordVo)
  }

  sourceWiseStatusCount(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.sourceWiseStatusCount, keywordVo)
  }

  changeReadStatus(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.changeReadStatus, keywordVo, httpOptions)
  }
  /****/

  getUniqueSources(): Observable<{}> {
    return this.http.get<{}>(this._baseUrl + CollectionManagerUrl.getUniqueSources, httpOptions)
  }

  getUniqueJobNames(): Observable<{}> {
    return this.http.get<{}>(this._baseUrl + CollectionManagerUrl.getUniqueJobNames, httpOptions)
  }

  clientsJobStatusTracking(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.clientsJobStatusTracking, keywordVo, httpOptions)
  }
  clientsJobMigrationTracking(keywordVo: {}): Observable<{}> {
    return this.http.post<{}>(this._baseUrl + CollectionManagerUrl.clientsJobMigrationTracking, keywordVo, httpOptions)
  }



}
