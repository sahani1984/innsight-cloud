import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTable} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AppConstant} from '../../../shared/app-constant';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../partial/layout/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-avatar-list',
  templateUrl: './avatar-list.component.html',
  styleUrls: ['./avatar-list.component.scss']
})
export class AvatarListComponent implements OnInit {
  @ViewChild('avatarListTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Name','Username', "Source", "Created At","Added From",  "Status", 'Action'];
  
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  constructor(
      private collectionDbService:CollectionDbService, 
      public collectionService:CollectionService,
      private router:Router,
      private route:ActivatedRoute,
      private dialog:MatDialog,
      private toastr:ToastrService,
        ) { }

  ngOnInit(): void {
    this.bindData();    
  }

/**FETCH AVATAR LIST DATA**/
  bindData() {
    this.collectionService.bindMaster();   
    this.page = 0;
    this.selectAvatar();
  }
 
  /**GET ALL AVATAR LIST**/
  searchByCategory:any = '';
  status:any = '';
  category:any = '';
  source:any = '';
  country:any= 'in'
  sortBy:any = 'asc'
  avatarList:any = [];
  selectAvatar(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["order"] = "newest";
    obj["source"] = this.source;
    obj["country"] = this.country;
    obj["status"] = this.status;
    obj["search"] = this.searchByCategory;
    obj["categoryId"] = this.category;   
     this.collectionDbService.selectAllAvatar(obj).subscribe(
          res=>{
            //console.log(res);       
            if(res["type"]="success"){             
              this.avatarList = res["data"];            
              this.totalNumberOfRecord = this.avatarList.length? this.avatarList[0]["totalCount"]:0;
              console.log( this.avatarList);             
            }else{
            console.log(AppConstant.ERROR_MSG);
            }      
          },
          err=>console.log(err)
        )   
     }

    

/**CHANGE STATUS OF THE AVATAR DATA ON CLICKING ON BUTTON**/
  changeStatus(event, status, id){   
     let obj = {};
     obj["recordId"] = id
     obj["status"] = status =='active'?'inactive':'active';    
     const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_CHANGE);
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width:'350px',
        maxWidth:'400px',
        data:dialogData
     })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        console.log(obj);
         this.collectionDbService.changeStatusOfAvatar(obj).subscribe(
           res=>{            
             if(res["type"]==='success'){
              let e = event.target;
              if(e.innerText == 'active'){
                e.innerText = 'inactive'
                e.classList.remove('btn-label-success');
                e.classList.add('btn-label-danger');
              }else{
                e.innerText = 'active'
                e.classList.remove('btn-label-danger');
                e.classList.add('btn-label-success');
              }
             }else{
               this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
             }
           },
           err => console.log(err)
         )
      }
    })   
  }

/**DELETE AVATAR USING ID**/
  delete(id){
  let obj = {};
  obj["id"] = id;
  const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
  const dailogRef = this.dialog.open(ConfirmDialogComponent, {
    width:'350px',
    maxWidth:'400px',
    data:dialogData
  })
  dailogRef.afterClosed().subscribe(dialogResult=>{
    if(dialogResult){
      this.collectionDbService.deleteAvatarById(obj).subscribe(
        res=>{
          if(res["type"]=='success'){
            this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success');
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

/**NAVIGATE TO FORM COMPONENT TO UPDATE THE AVATAR DATA**/
editAvatar(id:string){   
    this.router.navigate(['../avatar-update', id], {relativeTo:this.route});
  }

/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    this.selectAvatar();    
  }

  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
}



}
