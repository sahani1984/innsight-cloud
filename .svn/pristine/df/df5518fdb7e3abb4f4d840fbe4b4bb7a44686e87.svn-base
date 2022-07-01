import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogModel, ConfirmDialogComponent } from '../../../partial/layout/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstant } from 'src/app/shared/app-constant';

@Component({
  selector: 'app-add-proxy',
  templateUrl: './add-proxy.component.html',
  styleUrls: ['./add-proxy.component.scss']
})
export class AddProxyComponent implements OnInit {

  addProxyform:FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective:FormGroupDirective;
  constructor(private fb:FormBuilder,
              private collectionDbService:CollectionDbService, 
              public collectionService:CollectionService,
              private dialog:MatDialog,
              private router:Router,
              private route:ActivatedRoute,
              private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.collectionService.bindMaster();
    this.initform();
    this.assignEditableDataToForm();     

  }

 

 

  /*ADD NEW PROXY */ 
  addProxy(data) {
    let obj = {};
    obj["ip"] = data.proxyIP;
    obj["port"] = data.port;
    obj["userName"] = data.username;
    obj["password"] = data.password;
    obj["country"] = data.country;
    console.log(obj);
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      maxWidth: '400px',
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.collectionDbService.addNewProxy(obj).subscribe(
          res => {
            console.log(res);
            if (res["type"] === 'success') {
              this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success')
              this.askForNextProxy();
            } else {
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!!');
            }
          },
          err => console.log(err)
        )
      }
    })
  }

   /*ASK FOR ADD MORE PROXY OTHERWISE REDIRECT TO LIST */ 
  askForNextProxy() {  
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to add more proxy.');
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
       this.router.navigate(['../list-proxy'], { relativeTo: this.route })
       }
    });    
  }

  /*UPDATE PROXY */ 
  update(data){    
    let obj = {};
    obj["recordId"] =  this.ediTableData.record_id;
    obj["userName"] = data.username;
    obj["password"] = data.password;
    obj["country"] = data.country;
   const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_UPDATE);
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     width:'350px',
     maxWidth:'400px',
     data:dialogData
   })
   dialogRef.afterClosed().subscribe(dialogResult=>{
     if(dialogResult){
    this.collectionDbService.updateProxy(obj).subscribe(
        res=>{
          if(res["type"]=='success'){        
            this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success');        
            this.router.navigate(['../../list-proxy'], { relativeTo: this.route });
            setTimeout(()=>{
              this.formGroupDirective.resetForm()
              this.defaultFormValue();
            },0);          
           }else{
             this.toastr.error(AppConstant.ERROR_MSG, 'Error!')
           }        
        },
        err => console.log(err)
      )
     }
   })    
  }
  
  /*ASSIGN EDITABLE DATA TO THE FORM WHEN CLICK ON THE EDIT BUTTON ON PROXY LIST */ 
  editmode:boolean = false;
  ediTableData:any;
  assignEditableDataToForm(){    
  this.route.queryParams.subscribe(res=>{   
      this.ediTableData = res    
     if(Object.keys(this.ediTableData).length)  this.editmode = true         
     if(this.editmode){   
        this.addProxyform.get('proxyIP').disable();
        this.addProxyform.get('port').disable();     
        let countryVal:any = this.collectionService.countryList.filter(item=> item.country == this.ediTableData.country)
      this.addProxyform.patchValue({
          proxyIP: this.ediTableData.ip,
          port: this.ediTableData.port,
          username: this.ediTableData.username,
          password: this.ediTableData.password,
          country: 'in'
        })      
      }
    });    
  }

/*INITILISE THE REACTIVE FORM OF ADD PROXY*/
  initform(){
    this.addProxyform = this.fb.group({
      proxyIP:['', [Validators.required]],
      port:[null, [Validators.required]],
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      country:['in', [Validators.required]],
    })
  }

/*SET DETAULT FORM DATA WHEN CLEAR THE FORM*/
  defaultFormValue(){
    this.addProxyform.patchValue({      
      country:'in'
    })
  }

  navigateToList(){
    if(this.editmode){
      this.router.navigate(['../../list-proxy'], {relativeTo:this.route});
    }else{
      this.router.navigate(['../list-proxy'], {relativeTo:this.route});
    }
  }
  
}
