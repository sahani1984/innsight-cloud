import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/shared/app-constant';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-avatar-add-category',
  templateUrl: './avatar-add-category.component.html',
  styleUrls: ['./avatar-add-category.component.scss']
})

export class AvatarAddCategoryComponent implements OnInit {
  user_id:any;
  addCatForm:FormGroup
  constructor(
    private collectionService:CollectionService,
    private collectionDbService:CollectionDbService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private dialog:MatDialog) {
      this.collectionService.userID.subscribe(res=> this.user_id = res); 
     }

  ngOnInit(): void {
    this.addCatForm = this.fb.group({
      categoryName:[null, [Validators.required, Validators.maxLength(30)]]
    }) 
   
   
  }

/**ADD AVATAR CATEGORY**/
  addCategory(obj){  
    obj["userId"] =  this.user_id?this.user_id:"1";
    console.log(obj);
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbService.addNewAvatarCategory(obj).subscribe(
          res=>{
            console.log(res);
            if(res["type"] == 'success'){
              this.toastr.success(AppConstant.ADDED_SUCCESSFULLY_MSG, 'Success!')          
              this.router.navigate(['../avatar-list-category'], { relativeTo: this.route}); 
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }            
          },
          err=> console.log(err)
        )  
      }
    })
  }


}
