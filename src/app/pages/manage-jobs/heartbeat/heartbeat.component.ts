import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AppConstant } from 'src/app/shared/app-constant';
import { JobsDbService } from 'src/app/shared/services/jobs-db.service';

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.scss']
})
export class HeartbeatComponent implements OnInit {
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  categoryType: any = ""
  jobName:any=""
  categoryLists:any=[];
  jobLists:any=[]
  heartbeatLists:any = []

  @ViewChild('recordTbl', { static: false }) table: MatTable<Element>
  displayedColumns: string[] = ['Sr.No', 'Type', "Job Name", 'Last Hit Time'];

  constructor(private jobDbServices:JobsDbService) { }

  ngOnInit(): void {
    this.getCategory();
  }

 
  getCategory(){
    this.jobDbServices.getCategoryTypeForHeartbeat().subscribe(
      res=> {
        if(res["status"]==="success"){
          this.categoryLists = res["categoryType"]
        }
      }, err => console.log(err)
    )
  }

  getJobName() {
    let obj = {};
    obj["type"] = this.categoryType;
    this.jobDbServices.getJobNameForCategoryType(obj).subscribe(
      res => {
        if (res["status"] === "success") {
          this.jobLists = res["categoryType"];    
          this.getHeartbeat();
        }
      }, err => console.log(err)
    )
  }

  getHeartbeat(){
    let obj = {};
    obj["type"] = this.categoryType;
    obj["jobName"] = this.jobName;   
    this.jobDbServices.getHeartbeat(obj).subscribe(
      res=> {
        if(res["status"] === "success"){
          this.heartbeatLists = res["data"];
          console.log(this.heartbeatLists);
        }
      }, err => console.log(err)
    )
  }

  getRecordNumber(index) {
    return (((this.page) * 10)) + (index + 1);
  }

}
