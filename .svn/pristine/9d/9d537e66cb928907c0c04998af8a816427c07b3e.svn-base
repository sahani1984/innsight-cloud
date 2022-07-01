import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-collection-entity',
  templateUrl: './collection-entity.component.html',
  styleUrls: ['./collection-entity.component.scss']
})
export class CollectionEntityComponent implements OnInit {
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;
  status_btn:string = 'btn btn-bold btn-sm btn-font-sm'
  sourceList:any= this.collectionService.socialIcons;
  
 /**GET KEYWORD LIST**/   
 collectionEntityList = [];
 search:string = "";
 searchType:any = "entity";
 source:string = "";
activationStatus:string = "";
 crawlingStatus:any = "";
 ClientID:any = "pcr";
 collectionType:any="keyword"
 collectionId:any = ""
 sort:any = "";
 profileType:any="profile"
 avatar:any = "";

  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>
  @ViewChild('profileTbl', {static:false}) profileTable:MatTable<Element>
  @ViewChild('locationTbl', {static:false}) locationTable:MatTable<Element>
  @ViewChild('fedetatedTbl', {static:false}) fedetatedTable:MatTable<Element>
  displayedColumns: string[] = ['Sr.No', "Collection Name", "Client ID", "Keyword Name", "Source",  "Created Date",  "isActive", "Crawling Status", "Migration Status", "Start Crawl Date", "Last Crawl Date",  "Message", "Collection ID", "Keyword ID", "Action"];
  displayedColumnsProf: string[] = ['Sr.No', "Profile Image",  "Collection Name", "Client ID", "Source", "Created Date", "isActive", "Crawling Status", "Avatar", "Start Crawl Date", "Last Crawl Date",  "Start/Last Crawling Status", "IsValid", "Paused Status", "Profile Category", "Profile Country", "Profile ID","Profile Name", "Profile URL", "Profile Username",  "Message","Threat Score", "Collection ID", "Keyword ID",  "Action"];
  displayedColumnsLoc: string[] = ['Sr.No', "Collection Name", "Client ID", "Keyword Name", "Source",  "Created Date", "isActive", "Crawling Status",  "Start Crawl Date", "Last Crawl Date", "Start/Last Crawling Status", "Location Center", "Location Name", "Radius", "Paused Status", "Message", "Collection ID", "Keyword ID", "Action"];

  constructor(
    private collectionDbService:CollectionDbService,
    private router:Router,
    private route:ActivatedRoute,
    private collectionService:CollectionService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
     }
  
  activeQueryId:any;
  ngOnInit(): void {
    this.getClientList();
    this.getAvatar() 
    
   if(Object.keys(this.route.snapshot.queryParams).length){
    this.route.queryParamMap.subscribe(res=> {    
      console.log(res) 
      this.activeQueryId = res["params"];     
      this.collectionType =   res["params"].type;
      this.ClientID = res["params"].client; 
      this.bindData();      
    });
   }else{
    this.bindData(); 
   }
  }
   
  bindData(){  
    if(this.collectionType == "")  this.collectionType = "keyword";
    if(this.collectionType == 'keyword') this.getListEventKeyword();   
    if(this.collectionType == 'profile') this.getListProfileKeyword();  
    if(this.collectionType == 'location') this.getListLocationKeyword();  
    if(this.collectionType == 'federated') this.getFederatedKeyword();
    this.page = 0;
  }

   

    getListEventKeyword(){    
    if(this.activeQueryId){
      this.collectionId = this.activeQueryId["id"];
    }
    let obj= {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["clientId"] = this.ClientID;
    obj["collectionType"] = this.collectionType;
    obj["search"] = this.search;
    obj["searchType"] = this.searchType;
    obj["source"] = this.source;
    obj["crawlingStatus"] = this.crawlingStatus;
    obj["collectionId"] = this.collectionId;
    obj["sort"] = this.sort;
    obj["activationStatus"] = this.activationStatus;
    // console.log(JSON.stringify(obj));
    this.collectionDbService.listKeywordOfCollection(obj).subscribe(
      res => {        
      this.collectionEntityList = res;
      if(this.collectionEntityList.length){
        this.totalNumberOfRecord = this.collectionEntityList[0].count
       }else  this.totalNumberOfRecord = 0;    
       console.log('keywordList', this.collectionEntityList);         
      },
      err => console.log('error is showing')
     )
    }
 
    profileKeywordList:any=[];
    getListProfileKeyword(){
      if(this.activeQueryId){
        this.collectionId = this.activeQueryId["id"];
      }
      this.collectionType = "profile";
      let obj= {};
      obj["pageNumber"] = this.page;
      obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
      obj["clientId"] = this.ClientID;
      obj["collectionType"] = this.collectionType;
      obj["search"] = this.search;
      obj["searchType"] = this.searchType;
      obj["source"] = this.source;
      obj["crawlingStatus"] = this.crawlingStatus;
      obj["collectionId"] = this.collectionId;
      obj["sort"] = this.sort;
      obj["activationStatus"] = this.activationStatus;
      obj["profileType"] = this.profileType;
      obj["avatar"] = this.avatar;
      console.log(obj);
      this.collectionDbService.listKeywordOfCollection(obj).subscribe(
        res => {  
          this.profileKeywordList = res 
         if(this.profileKeywordList.length){
          this.totalNumberOfRecord = this.profileKeywordList[0].count
         }else  this.totalNumberOfRecord = 0;
         console.log('profileList', this.profileKeywordList);         
        },
        err => console.log('error is showing')
       )
    }

    locationKeywordList:any=[]
    getListLocationKeyword(){    
      if(this.activeQueryId){
        this.collectionId = this.activeQueryId["id"];
      }
      this.collectionType = "location";
      let obj= {};
      obj["pageNumber"] = this.page;
      obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
      obj["clientId"] = this.ClientID;
      obj["collectionType"] = this.collectionType;
      obj["search"] = this.search;
      obj["searchType"] = this.searchType;
      obj["source"] = this.source;
      obj["crawlingStatus"] = this.crawlingStatus;
      obj["collectionId"] = this.collectionId;
      obj["sort"] = this.sort;
      obj["activationStatus"] = this.activationStatus;
      obj["profileType"] = "";
      obj["avatar"] = "";
      console.log(obj);
      this.collectionDbService.listKeywordOfCollection(obj).subscribe(
        res => {
         this.locationKeywordList = res;
         if(this.locationKeywordList.length){
          this.totalNumberOfRecord = this.locationKeywordList[0].count
         }else  this.totalNumberOfRecord = 0;
         console.log('locationList', this.locationKeywordList);         
        },
        err => console.log('error is showing')
       )
    }
    federatedKeywordList:any=[];
    getFederatedKeyword(){
      if(this.activeQueryId){
        this.collectionId = this.activeQueryId["id"];
      }
      this.collectionType = "location";
      console.log('fedetated');
    }

 


  /**GET ALL CLIENT LIST **/
  clientList:any = [];
  getClientList(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_CLIENT_LIMIT
    obj["search"] = '';
    this.collectionDbService.selectAllClient(obj).subscribe(
      res =>{        
        if(res["type"]==="success"){
          this.clientList = res["data"];               
        }else{
          console.log(AppConstant.ERROR_MSG);
        }        
      },
      err => console.log(err)
    )
 }

 /**GET ALL AVATAR LIST**/
 avatarList:any = [];
getAvatar(){
   let obj = {};
   obj["pageNumber"] = this.page;
   obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
   obj["order"] = "newest";
   obj["source"] = ""
   obj["country"] = "in";
   obj["status"] =  ""
   obj["search"] = "";
   obj["categoryId"] = ""; 
  //  console.log(obj)    
    this.collectionDbService.selectAllAvatar(obj).subscribe(
         res=>{
           console.log(res);       
           if(res["type"]="success"){             
             this.avatarList = res["data"];         
          }else{
           console.log(AppConstant.ERROR_MSG);
           }      
         },
         err=>console.log(err)
       )   
    }

 viewEntity(keywordId){   
   this.router.navigate(['/pages/manage-jobs/job-detail'], {queryParams:{keyword:keywordId}})  
 }

 reCrawl(keywordId){
   let obj = {};
   obj["type"] = "keyword"
   obj["keywordId"] = keywordId
 this.collectionDbService.reCrawling(obj).subscribe(
  
   res => {
    console.log(res)
    if(res["status"] == "success"){
      this.bindData();
    }
   }, err=> console.log(err)
 )
 }

/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    if(this.collectionType == 'keyword') this.getListEventKeyword();   
    if(this.collectionType == 'profile') this.getListProfileKeyword();  
    if(this.collectionType == 'location') this.getListLocationKeyword(); 
  }

  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
  }

}
