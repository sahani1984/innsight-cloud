import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import * as moment from 'moment';


@Component({
  selector: 'app-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss']
})
export class JobLogsComponent implements OnInit {
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

 public sourceList:any= this.collectionService.socialIcons;

 @ViewChild('recordTbl', {static:false}) table:MatTable<Element>;
 displayedColumns: string[] = ['Sr.No',  "Status", "Inserted Date", "Machine IP", "Message"];
 
  search:any = ""
  sort:any = "";
  jobId:any="";  
  status:any = ""

 constructor(
   private collectionDbService:CollectionDbService,
   private collectionService:CollectionService,
   private route:ActivatedRoute,
   private router:Router) { }

  ngOnInit(): void {     
 if(Object.keys(this.route.snapshot.queryParams).length){
      this.route.queryParamMap.subscribe(res=> {               
        this.sort = res["params"].order;    
        this.jobId = res["params"].jobId; 
        this.page =  res["params"].page; 
        this.size =  res["params"].limit; 
        this.bindData();      
      });
     }    
  }

  bindData(){
    this.page = 0;
    this.getJobDetails();
  }

  jobDetailsList:any[]=[];
  getJobDetails(){   
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["order"]= this.sort;
    obj["jobId"] =  this.jobId;
    obj["status"] =  this.status;
    obj["status"] =  this.status;
    obj["searchKeyword"]= this.search;
    console.log(obj);
    this.collectionDbService.loggedData(obj).subscribe(
      res =>{      
        if(res["status"] == "success"){
            this.jobDetailsList = res["data"];
            this.totalNumberOfRecord = res["totalCount"];
            console.log(this.jobDetailsList);
        }
      }
    )
  }

  
/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
paginate(event) {
  this.page = event["pageIndex"];
  this.getJobDetails();    
}

getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}


}
