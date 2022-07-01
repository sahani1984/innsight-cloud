import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConstant} from 'src/app/shared/app-constant';
import {MatTable} from '@angular/material/table';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  searchCategory:string = ''
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  categoryList:any = []
  @ViewChild('categoryTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Category', 'Action'];
  constructor(
    private collectionDbServoces:CollectionDbService,
    private dialog:MatDialog,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.bindData();
  }

/**GET THE  CATEGORY DATA**/
  bindData() {   
    this.page = 0;
    this.getNewsCategory();
  }
 
/**GET THE  CATEGORY DATA LIST**/  
getNewsCategory(){
  let obj = {};
  obj["pageNumber"] = this.page;
  obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
  obj["categoryName"] = this.searchCategory;
  this.collectionDbServoces.selectAllNewsCategory(obj).subscribe(
    res => {
      //console.log(res);      
      if(res["type"]=='success'){
        this.categoryList = res["data"];
        if(this.categoryList.length){
          this.totalNumberOfRecord = res["data"][0]["totalCount"];
        }        
        console.log(this.categoryList);      
      }else{
        console.log(AppConstant.ERROR_MSG);
      }     
    },
    err => console.log(err)
  )
}

/**DELETE CATEGORY DATA**/
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
        this.collectionDbServoces.deleteNewsCategoryById(obj).subscribe(
          res =>{
            console.log(res);
            if(res["type"]=='success'){
               this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success!');
               this.bindData();
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          }
        )
      }
    })    
  }
  
/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    this.getNewsCategory();    
  }
  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
  }
}
