import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import {MatTable } from '@angular/material/table';
import {AppConstant} from '../../../shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../partial/layout/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-avatar-list-category',
  templateUrl: './avatar-list-category.component.html',
  styleUrls: ['./avatar-list-category.component.scss']
})
export class AvatarListCategoryComponent implements OnInit {
  searchCategory:string = ''
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  categoryList:any = []
  @ViewChild('categoryTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Category', 'Action'];

  constructor(
      private collectionDbService:CollectionDbService, 
      public collectionService:CollectionService,
      private dialog:MatDialog,
      private toastr: ToastrService
      ) { }

  ngOnInit(): void {
    this.bindData();
  }

  /**GET AVATAR LIST CATEGORY DATA**/
  bindData() {   
    this.page = 0;
    this.getAvatarCategory();
  }
  getAvatarCategory(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["categoryName"] = this.searchCategory;
    this.collectionDbService.selectAllAvatarCategory(obj).subscribe(
      res=>{
        //console.log(res);
        if(res["type"]=="success"){
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

 /**DELETE AVATAR LIST CATEGORY**/
  delete(id){   
    let obj = {};
    obj["categoryId"] = id;   
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbService.deleteAvatarCategoryById(obj).subscribe(
          res =>{           
            if(res["type"]=='success'){
              this.bindData();
              this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success!');
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
    this.getAvatarCategory();    
  }
  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
}


}
