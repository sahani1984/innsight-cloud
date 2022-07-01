import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppConstant } from 'src/app/shared/app-constant';

import * as moment from 'moment';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { MatTable } from '@angular/material/table';
// import localization from 'moment/locale/de';
// moment.updateLocale('de', localization)

@Component({
  selector: 'app-profile-finder',
  templateUrl: './profile-finder.component.html',
  styleUrls: ['./profile-finder.component.scss']
})
export class ProfileFinderComponent implements OnInit {
  toppings = new FormControl();
  //Filters
  search: string = "";
  bookmark: string = "";
  published: string = "";
  searchStatus: string = "";
  searchType: string = "";
  tags;
 sort: string = "newest";
  daterangeObj: any = {
    startDate: "",
    endDate: ""
  }
  toppingList:any = []
  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>
  displayedColumns: string[] = ["Sr.No", "Search Keyword", "Search Type", "Search Date","Search Status", "Created By", "isBookMark", "HasPublishProfile"];

  constructor(
    private collectionDbService:CollectionDbService
  ) { }

  ngOnInit(): void {
    this.bindData();
  }

  /**GET HISTORY DATA**/
  bindData() {
    this.page = 0;
    this.fetchAllkeyword();
    // this.getAllTags();
    // this.panelOpenState = false;
  }

/**DATE RANGE PICKER METHOD**/
change(e) {
  this.daterangeObj.startDate = moment(e.startDate, 'DD/MM/YY').format('L')
  this.daterangeObj.endDate = moment(e.endDate, 'DD/MM/YYYY').format('L');
  console.log(this.daterangeObj);
}

  /**GET ALL KEYWORD**/
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;
  historyList: any = []
  fetchAllkeyword() {
    let obj = {};   
    obj["searchKeyword"] = this.search;
    obj["bookmark"] = this.bookmark;
    obj["published"] = this.published;
    obj["searchType"] = this.searchType;
    obj["searchStatus"] = this.searchStatus;

    if (
      this.daterangeObj.startDate != "" && this.daterangeObj.startDate != "Invalid date" &&
      this.daterangeObj.endDate != "" && this.daterangeObj.endDate != "Invalid date"
    ) {
      obj["dateFrom"] = this.daterangeObj.startDate;
      obj["dateTo"] = this.daterangeObj.endDate;
    }

    if (typeof this.tags !== "undefined" && this.tags != "") {
      obj["tags"] = this.tags.toString().split(",");
    }
    obj["sortby"] = this.sort;
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["userId"] = '1';
    this.totalNumberOfRecord = 0;
    this.collectionDbService.showAllKeywordFromSearchList(obj).subscribe(
      res => {
        this.historyList = res;       
        if (res.length > 0) {
          this.totalNumberOfRecord = res[0]["count"];
        }
        console.log(this.historyList);
      },
      err => console.log('error is showing')
    )
  }

  /**GET ALL TAGS**/
  // getAllTags() {
  //   this.profilefinderDbServices.showAllTags({}).subscribe(
  //     res => {
  //       this.toppingList = res;
  //     },
  //     err => console.log('error is showing')
  //   )
  // }

/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
paginate(event) {
  this.page = event["pageIndex"];
  this.fetchAllkeyword();    
}

getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}
}
