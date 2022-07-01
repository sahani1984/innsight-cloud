import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';

@Component({
  selector: 'migration-job-tracking',
  templateUrl: './migration-job-tracking.component.html',
  styleUrls: ['./migration-job-tracking.component.scss']
})
export class MigrationJobTrackingComponent implements OnInit {
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>
  displayedColumns: string[] = ['Sr.No', 'Client', "Source", "Job Name",  "Document Count",   'Last Hit Time'];

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
    this.getSourceList(); 
    this.getClientList();
    this.getJobNames();
    this.bindData(); 

  }
  bindData(){
    this.page = 0;
    this.getClientJobTrackingStatus();
  }
  ClientID:any = ""
  sort:any="newest";
  source:any=""
  jobName:any=""
 jobMigrationTrackingArr:any=[];
  getClientJobTrackingStatus(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = this.size;
    obj["order"] = this.sort;
    obj["clientId"] =  this.ClientID;
    obj["source"] =  this.source;
    obj["jobName"] = this.jobName;
    this.collectionDbservices.clientsJobMigrationTracking(obj)
    .subscribe((res)=>{
      console.log(res);
      if(res["status"] == "success"){
        this.jobMigrationTrackingArr = res["data"];
        this.totalNumberOfRecord =  res["count"]
      }
    }, err => console.log(err))
  }



  /**GET ALL SOURCE LIST **/
 sourceList:any=[]
 getSourceList(){
   this.collectionDbservices.getUniqueSources().subscribe(res=>{
     if(res["status"]=="success"){
       this.sourceList = res["distinctSources"];      
       console.log(this.sourceList)
     }
   },err => console.log(err))
 }

    /**GET ALL CLIENT LIST **/
    clientList:any = [];
    getClientList(){
      let obj = {};
      obj["pageNumber"] = this.page;
      obj["limit"] = AppConstant.TOTAL_CLIENT_LIMIT;
      this.collectionDbservices.selectAllClient(obj).subscribe(
        res =>{    
          console.log(res);    
          if(res["type"]==="success"){
            this.clientList = res["data"];          
          }else{
            console.log(AppConstant.ERROR_MSG);
          }        
        },
        err => console.log(err)
      )
   }

   jobNameList:any=[]
   getJobNames(){
     this.collectionDbservices.getUniqueJobNames().subscribe(res=>{
       if(res["status"] == "success"){
         this.jobNameList = res["distinctJobNames"];      
       }
     }, err => console.log(err))
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
