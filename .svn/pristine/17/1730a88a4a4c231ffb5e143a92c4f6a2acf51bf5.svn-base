import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCatForm:FormGroup;
  user_id:any;
  constructor(
    private fb:FormBuilder,
    private collectionDbService:CollectionDbService,
    private collectionServices:CollectionService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private collectionService:CollectionService
  ) { }

  ngOnInit(): void {
    this.addCatForm = this.fb.group({
      categoryName:[null, [Validators.required]]
    }) 
    this.collectionService.userID.subscribe(res=> this.user_id = res);    
  }

  /*ADD NEW CATEGORY TO CATEGORY LIST */
  addCategory(obj){  
    obj["userId"] = this.user_id?this.user_id:"1";
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbService.addNewNewsCategory(obj).subscribe(
          res =>{
            //console.log(res);
            if(res["type"]=='success'){
              this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success!');
              this.router.navigate(['../list-category'],{relativeTo:this.route})
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          },
          err => console.log(err)
        )
      }
    })
  }

  
}
