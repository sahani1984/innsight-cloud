import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import {ConfirmDialogModel, ConfirmDialogComponent } from '../../../partial/layout/confirm-dialog/confirm-dialog.component'
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {AppConstant} from '../../../shared/app-constant';


@Component({
  selector: 'app-avatar-add',
  templateUrl: './avatar-add.component.html',
  styleUrls: ['./avatar-add.component.scss']
})
export class AvatarAddComponent implements OnInit {
  addAvatarform:FormGroup;
  user_id:any;

  @ViewChild(FormGroupDirective) formGroupDirective:FormGroupDirective
  constructor(private fb:FormBuilder,
              private collectionDbService:CollectionDbService, 
              public collectionService:CollectionService,
              private router:Router,
              private route:ActivatedRoute,
              private dialog:MatDialog,
              private toastr:ToastrService ){
                this.collectionService.userID.subscribe(res=> this.user_id = res)
                }         
           
 ngOnInit(): void {
  
       this.collectionService.bindMaster();      
       this.assignEditableDataToForm();  
       this.initform();     
  }


  /*ADD NEW AVATAR*/
  addAvatar(data){    
    let proxyIdsObj = {}
    proxyIdsObj["proxyId"] = data.proxy
    let obj = {};    
    obj["firstName"] = data.firstName;
    obj["lastName"] = data.lastName;
    obj["email"] = data.email;
    obj["phone"] = data.phone;
    obj["sex"] = data.gender;
    obj["country"] = data.country;
    obj["userName"] = data.username;
    obj["password"] = data.password;
    obj["source"] = data.source;
    obj["userId"] = this.user_id?this.user_id:'1';
    obj["proxyIds"] = [proxyIdsObj];
    obj["categoryIds"] = [data.category];   
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult =>{
      if(dialogResult){
        this.collectionDbService.addNewAvatar(obj).subscribe(
          res=> {
          console.log(res)
          if(res["type"]=='success'){        
           this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success');     
           this.askForNext();
           }else{
             this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
           }
        },
        err => console.log(err)
        )
      }
    })   
    
  }

/*ASKED TO ADD NEXT AVATAR*/
askForNext() {  
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to add more avatar.');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {   
         setTimeout(()=>{
            this.formGroupDirective.resetForm()
            this.defaultFormValue();
          },0)   
        return false;     
       } else {    
       this.router.navigate(['../avatar-list'], { relativeTo: this.route })
       }
    });    
  }

 
 /*CLICKING ON EDIT ICON FROM AVATAR LIST AND REDICTING, ASSIGN EDITABLE DATA TO THE FORM */ 
  editableObj:any={};
  isEditMode:boolean = false;
  ediTableRecordId:any=''
  assignEditableDataToForm(){      
    this.route.params.subscribe(params=> {
      if(params.id){
        this.isEditMode = true;          
           this.collectionDbService.selectAvatarById({id:params.id}).subscribe(
             res=>{ 
               //console.log(res);
               this.editableObj = res;
               this.ediTableRecordId = res["avatarData"][0].record_id,         
               this.addAvatarform.patchValue({
                  firstName:res["avatarData"][0].first_name,
                  lastName:res["avatarData"][0].last_name,
                  username:res["avatarData"][0].user_name,
                  password:res["avatarData"][0].password,
                  country:res["avatarData"][0].country,
                  gender:res["avatarData"][0].sex,
                  email:res["avatarData"][0].email,
                  phone:res["avatarData"][0].phone,
                  source:res["avatarData"][0].source,
                  category:res["categoryData"][0].category_id,
                  proxy:res["proxyData"][0].proxy_id
              })         
             },
             err => console.log(err)
           )
      }    
    });     
  }


/*UPDATE AVATAR*/
  update(data){     
    let proxyIdsObj = {}
    proxyIdsObj["proxyId"] = data.proxy
    let obj = {};    
    obj["firstName"] = data.firstName;
    obj["lastName"] = data.lastName;
    obj["email"] = data.email;
    obj["phone"] = data.phone;
    obj["sex"] = data.gender;
    obj["country"] = data.country;
    obj["userName"] = this.editableObj["avatarData"][0].user_name,
    obj["password"] = data.password;
    obj["source"] = this.editableObj["avatarData"][0].source,
    obj["userId"] =  this.user_id?this.user_id:'1';
    obj["recordId"] = this.ediTableRecordId;
    obj["proxyIds"] = [proxyIdsObj];
    obj["categoryIds"] = [data.category];    
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_UPDATE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){      
        console.log(obj);
        this.collectionDbService.updateAvatar(obj).subscribe(
          res=> {
            console.log(res);      
            if(res["type"] =='success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success!')
              this.router.navigate(['../../avatar-list'], {relativeTo:this.route});
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!!')
            }
          },
          err =>  console.log(err)
        )
      }
    })    
  }

/*INITIALISE THE ADD AVATAR FORM */
initform(){
  this.addAvatarform = this.fb.group({
    firstName:['', [Validators.required]],
    lastName:['', [Validators.required]],
    username:[{value: '', disabled: this.isEditMode}, [Validators.required]],
    password:['', [Validators.required]],
    country:['in', [Validators.required]],
    gender:['male', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    phone:[null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    source:[{value: '', disabled: this.isEditMode}, [Validators.required]],
    category:['', [Validators.required]],
    proxy:["", [Validators.required]]
  }); 
}

/*AFTER CLEAR FORM ASSING DEFAULT VALUE THE FORM */
defaultFormValue(){
    this.addAvatarform.patchValue({    
      country:'in',
      gender:'male',    
     })
  }

 /*NAVIGATE TO THE AVATAR LIST FROM ADD/EDIT MODE*/
  navigateToList(){
    if(this.isEditMode) this.router.navigate(['../../avatar-list'], {relativeTo:this.route});
    else this.router.navigate(['../avatar-list'], {relativeTo:this.route});
  }

}
