import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from 'src/app/shared/app-constant';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit {
  addLangForm:FormGroup;
  user_id:any;
  constructor(
    private fb:FormBuilder,
    public collectionService:CollectionService,
    private collectionDbServices:CollectionDbService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.addLangForm = this.fb.group({    
      language:[null, [Validators.required]]
     })  
     this.collectionService.userID.subscribe(res=> this.user_id = res);  
  }
/*ADD NEW LANGUAGE TO THE LANGUAGE LIST*/
  addLanguage(obj){
    obj["userId"] = this.user_id?this.user_id:"1";
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dailogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dailogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbServices.addNewsLanguage(obj).subscribe(
          res =>{
            //console.log(res);
            if(res["type"]=="success"){
              this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success!');
              this.router.navigate(['../list-language'], {relativeTo:this.route});
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          },
          err=>console.log(err)
        )
      }
    })  
  }

}
