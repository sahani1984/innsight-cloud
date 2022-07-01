import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  constructor(private collectionService:CollectionService) { }
 public sourceList:any= this.collectionService.socialIcons;
  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', "Machine IP",  "Entity Type", "Entity SubType", "Status", "Inserted Date", "Job ID", "keyword ID", "Source", "Message"];
  ngOnInit(): void {
  }
  search:any = "";
  startDate:any = "2020-12-01 16:00:00"
  endDate:any = "2020-12-01 18:00:00"
  machineIP:any = '';
  EntityType:any = "";
  EntitySubType:any="";     
  keywordId:any = '';
  source:any="";
  status:any = ""
  sort:any = 'newest'
  jobDetailsList:any[]=[]


  bindData(){
    console.log('dd')
  }




  /**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
paginate(event) {
  this.page = event["pageIndex"];
  //this.bindData();    
}

getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}
}
