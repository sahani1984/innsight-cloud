import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';

@Component({
  selector: 'migration-track-status',
  templateUrl: './migration-track-status.component.html',
  styleUrls: ['./migration-track-status.component.scss']
})
export class MigrationTrackStatusComponent implements OnInit {

  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>
  displayedColumns: string[] = ['Sr.No', 'Client', "Job Name",   'Last Hit Time'];

  constructor(
    private collectionDbservices:CollectionDbService, 
    private route:ActivatedRoute) {
     this.route.queryParams.subscribe(res=>{
        if(Object.keys(res).length){
          this.ClientID = res["client"];
        }
      })
   }

  ngOnInit(): void {
   this.getClientList();
   this.bindData();
  }

  bindData(){
    this.page = 0;
    this.getClientJobTrackingStatus();
  }
  ClientID:any = "innefu"
  sort:any="newest"

  clientJobTrackingArr:any=[];
  getClientJobTrackingStatus(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = 20
    obj["order"] = this.sort;
    obj["clientId"] =  this.ClientID;
    this.collectionDbservices.clientsJobStatusTracking(obj).subscribe(res=>{   
      if(res["status"] == "success"){
        this.clientJobTrackingArr = res["data"];
        this.totalNumberOfRecord = res["count"]
      }
    }, err => console.log(err))
  }


    /**GET ALL CLIENT LIST **/
  clientList:any = [];
  getClientList(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_CLIENT_LIMIT
    this.collectionDbservices.selectAllClient(obj).subscribe(
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


  
   /*SET PAGINATION**/
   paginate(event) {
    this.page = event["pageIndex"];   
    this.getClientJobTrackingStatus();    
      
  }
 getRecordNumber(index){
      return (((this.page)*10))+(index+1);
  }

}
