import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import * as moment from 'moment';
import { AppConstant } from 'src/app/shared/app-constant';
import { map } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData {
  message: string,
  profileType: string,
  input: string,
  type: string,
  apiName: string,
  source: string
}

@Component({
  selector: 'app-cloud-logs',
  templateUrl: './cloud-logs.component.html',
  styleUrls: ['./cloud-logs.component.scss']
})

export class CloudLogsComponent implements OnInit {
  logsFilterForm: FormGroup;
  startDate: any = new Date(new Date().setHours(0, 0, 1, 1));
  endDate: any = new Date();
  selectedType: any;
  selectedApiName: any;
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;
  constructor(
    private fb: FormBuilder,
    private collectionDbService: CollectionDbService,
    private dialog: MatDialog
  ) { }

  @ViewChild('recordTbl', { static: false }) table: MatTable<Element>
  displayedColumns: string[] = ['Sr.No', 'Inserted Date', 'Input', "Message"];


  ngOnInit(): void {
    // this.getType(this.startDate, this.endDate);
  }

  getTypeByStartDate(event) {
    this.nameTypeList = [];
    this.startDate = new Date(event.target.value)
    this.getType(this.startDate, this.endDate);
  }

  getTypeByEndDate(event) {
    console.log(event.target.value)
    this.nameTypeList = []
    this.endDate = new Date(event.target.value)
    this.getType(this.startDate, this.endDate);
  }

  typeList: any = [];
  getType(startdate, enddate) {
    let obj = {};
    obj["dateFrom"] = moment(startdate).format('YYYY-MM-DD HH:mm:ss');
    obj["dateTo"] = moment(enddate).format('YYYY-MM-DD HH:mm:ss');
    this.collectionDbService.loadLoggingType(obj).subscribe(
      res => {
        this.typeList = res["distinctTypeList"];
        this.logDataArr = [];
        if (this.typeList.length) {
          this.getNameType(this.typeList[0])
        }
      },
      err => console.log(err)
    )
  }

  nameTypeList: any = [];
  getNameType(type) {
    let obj = {};
    obj["dateFrom"] = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss');
    obj["dateTo"] = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss');
    obj["type"] = type;
    this.selectedType = type;
    this.collectionDbService.getApiNamesForType(obj).subscribe(
      res => {
        this.nameTypeList = res["distinctApiNamesForTypeList"];
        this.logDataArr = [];
        this.selectedSource = "";
        if (this.nameTypeList.length) {
          this.getLogData(this.nameTypeList[0])
        }
      },
      err => console.log(err)
    )
  }

  logDataArr: any = [];
  searchedValue: any = '';
  selectedOrder: any = 'newest';
  getLogData(apiname) {
    this.sourceTypeList = [];
    this.clientsLists = [];
    this.searchInput.nativeElement.value = "";
    this.selectedApiName = apiname
    let mandateObj = {};
    mandateObj["dateFrom"] = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss');
    mandateObj["dateTo"] = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss');
    mandateObj["type"] = this.selectedType;
    mandateObj["apiName"] = apiname;
    let obj = {};
    obj["clientId"] = this.selectedClients;
    obj["source"] = this.selectedSource;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["pageNumber"] = this.page;
    obj["profileType"] = this.selectedProfile;
    obj["searchKeyword"] = this.searchedValue;
    obj["order"] = this.selectedOrder;

    this.getClientsByApi(mandateObj);
    this.getSourceByApi(mandateObj);
    this.getProfileByApi(mandateObj);
    let allParams = { ...mandateObj, ...obj }
    console.log(allParams);
    this.collectionDbService.getLoggingData(allParams)
      .pipe(map(item => {
        console.log(item)
        this.totalNumberOfRecord = item["totalCount"];
        let resdata = item["data"];
        let dataArr: any = [];
        for (let key in resdata) {
          let data = JSON.parse(resdata[key])
          dataArr.push({ id: key, ...data })
        }
        return dataArr;
      }))
      .subscribe(
        (res: any) => {
          this.logDataArr = res;
          console.log(this.logDataArr);
        },
        err => console.log(err)
      )

  }

  selectedClients: any = ""
  filterByClient(client) {
    this.selectedClients = client;
    this.selectedSource = ""
    this.selectedProfile = ""
    this.searchInput.nativeElement.value = "";
    this.getLogData(this.selectedApiName);
  }


  selectedSource: any = ""
  filterBySource(source) {
    this.selectedSource = source;
    this.selectedProfile = ""
    this.searchInput.nativeElement.value = "";
    this.selectedOrder = 'newest';
    this.getLogData(this.selectedApiName);
  }

  selectedProfile: any = ""
  filterByProfile(profileVal) {
    this.selectedProfile = profileVal;
    this.selectedOrder = 'newest';
    this.searchedValue = "";
    this.searchInput.nativeElement.value = "";
    this.getLogData(this.selectedApiName);
  }


  filterByOrder(orderVal) {
    console.log(this.profileTypeList);
    this.selectedOrder = orderVal;
    this.searchInput.nativeElement.value = ""
    this.searchedValue = "";
    this.getLogData(this.selectedApiName);
  }

  @ViewChild('searchValue') searchInput: any;
  filterBySearchText(searchText) {
    this.searchedValue = searchText;
    this.getLogData(this.selectedApiName);
  }

  clientsLists: any = []
  getClientsByApi(obj) {
    console.log(obj)
    this.collectionDbService.loadClientsForLog(obj).subscribe(
      res => {
        console.log(res)
        if (res["loadDistinctClientss"]) {
          res["loadDistinctClientss"].forEach(item => {
            if ((item !== '') && (this.clientsLists.indexOf(item) == -1)) {
              this.clientsLists.push(item)
            }
          })
        }
        console.log(this.clientsLists)
      },
      err => console.log(err)
    )
  }

  /**GET SOURCE LIST**/
  sourceTypeList: any = [];
  getSourceByApi(obj) {
    this.sourceTypeList = []
    this.profileTypeList = []
    this.selectedOrder = 'newest';
    this.collectionDbService.loadSourcesForLog(obj).subscribe(
      res => {
        if (res["distinctSourceNames"]) {
          res["distinctSourceNames"].forEach(item => {
            if ((item !== '') && (this.sourceTypeList.indexOf(item) == -1)) {
              this.sourceTypeList.push(item)
            }
          })
        }
      },
      err => console.log(err)
    )
  }
  /**GET PROFILE LIST**/
  profileTypeList: any = []
  getProfileByApi(obj: {}) {
    obj["source"] = this.selectedSource;
    this.collectionDbService.loadProfileTypeForLog(obj).subscribe(
      res => {
        if (res["distinctProfileTypes"]) {
          res["distinctProfileTypes"].forEach(item => {
            if ((item !== "") && (this.profileTypeList.indexOf(item) == -1)) {
              this.profileTypeList.push(item)
            }
          })
          console.log(this.profileTypeList);
        }
      },
      err => console.log(err)
    )
  }



  setStrlength(str: any, len: number) {
    let s: any = str;
    if (str.length > len) {
      s = str.substring(0, len) + '. . .';
    }
    return s;
  }

  initform() {
    this.logsFilterForm = this.fb.group({
      start_date: [],
      end_date: [""],
      type: [""],
      name: [""],
      clientId: [""],
      source: [""],
      profileType: [""],
      order: ["newest"],
      searchKeyword: [""]
    })
  }




  openDialog(Obj): void {
    const dialogRef = this.dialog.open(DialogExampleDialog, {
      width: '450px',
      data: Obj
    });
  }

  /**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    this.getLogData(this.selectedApiName);
  }

  getRecordNumber(index) {
    return (((this.page) * 10)) + (index + 1);
  }

}


@Component({
  selector: 'cloud-dialog',
  templateUrl: 'cloud-dialog.html',
})
export class DialogExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
