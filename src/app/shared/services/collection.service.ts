import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CollectionDbService } from './collection-db.service';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {  
  analysisOption: any = new BehaviorSubject(false);
  imgProcessingOption:any = new BehaviorSubject(false);  
  public userID = new BehaviorSubject<any>(1);
  public isStoreListNewsdata = new BehaviorSubject<boolean>(false)

 
  public category:any = [] 
  public categoryList = [];

  public userName:any = new BehaviorSubject<any>({});
  
  constructor(public router: Router, private collectionDbService:CollectionDbService) {  
    //   let userDtl:any = JSON.parse(sessionStorage.getItem('log_user'));     
    //   if(userDtl){        
    //   if((userDtl["id"] !== null) || (userDtl["id"] !== undefined)){
    //     //console.log(userDtl)   
    //     this.userID = userDtl["id"];
    //   }else{
    //     this.userID = 1
    //   }
    // }
   }

// ALL SOURCE IN THE COLLECTION KEYWORD
  public socialIcons: any = [
    { source: "facebook", status: false, icon: "socicon-facebook", name: "facebook", isChinese: false },
    { source: "twitter", status: false, icon: "socicon-twitter", name: "twitter", isChinese: false},    
    { source: "youtube", status: false, icon: "socicon-youtube",  name: "youtube", isChinese: false},
    { source: "dailymotion", status: false, icon: "socicon-dailymotion", name: "dailymotion", isChinese: false},
    { source: "instagram", status: false, icon: "socicon-instagram", name: "instagram", isChinese: false},
    { source: "reddit", status: false, icon: "socicon-reddit",  name: "reddit", isChinese: false},
    { source: "tumblr", status: false, icon: "socicon-tumblr", name: "tumblr", isChinese: false},
    { source: "wordpress", status: false, icon: "socicon-wordpress", name: "wordpress", isChinese: false},    
    { source: "web", status: false, icon: "",  name: "search engines", isChinese: false},
    { source: "darkweb", status: false, icon: "flaticon-globe", name: "dark web", isChinese: false},
    { source: "flickr", status: false, icon: "socicon-flickr", name: "flickr", isChinese: false},
    { source: "baidu", status: false, icon: "socicon-baidu",name: "baidu", isChinese:true},
    { source: "thinktanks", status: false, icon: "la la-lightbulb-o", name: "think tanks", isChinese:false}, 
    { source: "weibo", status: false, icon:"socicon-weibo",  name: "weibo", isChinese:true},
    { source: "tiktok", status: false, icon: "",  name: "tiktok", isChinese:true},
    { source: "vk", status: false, icon:"socicon-vkontakte",  name: "vk", isChinese: false}, 
    { source: "zhihu", status: false, icon:"",  name: "zhihu", isChinese: true},  
    { source: "toutiao", status: false, icon:"",  name: "toutiao", isChinese: true}  
  ];
 
  public avatarCat:any = []
  public proxyList:any = [];
  public countryList = [];
  public newsCategory = [];
  public newsLanguage = [];
  bindMaster() {
    this.collectionDbService.selectAllMaster({}).subscribe(
      res => {
        //console.log(res);      
        this.avatarCat = res["avatarCategory"];
        this.proxyList = res["proxy"];
        this.countryList = res["country"];
        this.newsCategory = res["newsCategory"];
        this.newsLanguage = res["newsLanguage"];           
      },
      err => {
        console.log(err);
      })
  }


 

public defltDeactivationDate(){  
  let  startdate = moment().format();
  let new_date = moment(startdate, "YYYY-MM-DD").add(3, 'days').format('YYYY-MM-DD');
   return new_date    
 }

}
