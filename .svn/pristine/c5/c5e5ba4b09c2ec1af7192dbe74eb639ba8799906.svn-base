import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionDbService } from './shared/services/collection-db.service';
import { CollectionService } from './shared/services/collection.service';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{  
    constructor(
      private _router: Router,
      private route:ActivatedRoute,
      private collectionDbService: CollectionDbService,
      private collectionService: CollectionService,
      private commonService:CommonService
    ) { }
    ngOnInit() {    
      this.getSourceList(); 
      this.setGlobalUserId(); 
       let uu = JSON.parse(sessionStorage.getItem('log_user'));
       if(uu){      
       this.collectionService.userName.next(uu[0]);  
       }
    }
  
    bindMaster() {
      this.collectionDbService.selectAllMaster({}).subscribe(
        res => {
          //console.log(res);
          this.collectionService.avatarCat = res["avatarCategory"];
          this.collectionService.proxyList = res["proxy"];
          this.collectionService.countryList = res["country"]           
        },
        err => {
          console.log(err);
        })
    }

    setGlobalUserId(){
      let userDtl:any = JSON.parse(sessionStorage.getItem('log_user'));    
      if(userDtl){ 
      if((userDtl["id"] !== null) || (userDtl["id"] !== undefined)){       
        this.collectionService.userID.next(userDtl["id"])         
      }   
      }
    }

  /**GET ALL SOURCE LIST **/
  sourceList: any = []
  getSourceList() {
    this.collectionDbService.getUniqueSources().subscribe(res => {
      if (res["status"] == "success") {
        this.commonService.allSourceList = res["distinctSources"];      
     }
    }, err => console.log(err))
  }
}
