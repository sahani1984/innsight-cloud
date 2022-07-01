import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConstant} from 'src/app/shared/app-constant';
import {MatTable} from '@angular/material/table';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-language',
  templateUrl: './list-language.component.html',
  styleUrls: ['./list-language.component.scss']
})
export class ListLanguageComponent implements OnInit {
  searchLanguage:string = ''
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  languageList:any = []
  @ViewChild('languageTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Language', 'Action'];

  constructor(
    private collectionDbServices:CollectionDbService,
    private dialog:MatDialog,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.bindData();
  }

  bindData() {   
    this.page = 0;
    this.getAllLanguage();
  }

  /**GET THE  LANGUAGE DATA**/
  getAllLanguage(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["language"] = this.searchLanguage;
    this.collectionDbServices.selectAllNewsLanguage(obj).subscribe(
      res =>{
        //console.log(res);
        if(res["type"]="success"){
          this.languageList = res["data"];       
          this.totalNumberOfRecord =   this.languageList.length? this.languageList[0]["totalCount"]:0;         
          console.log(this.languageList);
        }else{
          console.log(AppConstant.ERROR_MSG);
        }
      },
      err => console.log(err)
    )
  }

/**DELETE LANGUAGE FROM THE LIST**/
  delete(recordId){
    let obj = {};
    obj["recordId"] = recordId;
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbServices.deleteNewsLanguageById(obj).subscribe(
          res =>{
            //console.log(res);
            if(res["type"]=='success'){
              this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success!');
              this.bindData();
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          },
          err => console.log(err)
        )
      }
    })
  }

/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    this.getAllLanguage();    
  }
  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
  }


}
