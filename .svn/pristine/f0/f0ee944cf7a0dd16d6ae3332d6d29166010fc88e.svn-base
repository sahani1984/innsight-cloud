import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import {AppConstant} from '../../../shared/app-constant'
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { CollectionService } from 'src/app/shared/services/collection.service';




@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  user_id:any;
  clientForm:FormGroup;
  activationMinDate:any;
  deactivationMinDate:any;
  
  @ViewChild(FormGroupDirective) formGroupDirective:FormGroupDirective
  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private collectionDbservice:CollectionDbService,
    private collectionService:CollectionService
    ) {
    this.activationMinDate = moment().format();
   }

  ngOnInit(): void {
    this.getDeactivationMinDate(this.activationMinDate);
    this.initClientform();
    this.clientForm.valueChanges.subscribe(res=>{
      this.getDeactivationMinDate(res.activationDate);     
    })
    this.assignEditabedata(); 
    this.collectionService.userID.subscribe(res=> this.user_id = res)    
  }

/**SAVE CLIENT DETAILS**/
  saveClient(obj:{}){
    obj["userId"] = this.user_id?this.user_id:"1";
    obj["socialMediaCollection"] = "active",
    obj["newsFeedCollection"] = "active",
    obj["thinkTankCollection"] = "active"
    console.log(obj)
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     width:'350px',
     maxWidth:'400px',
     data: dialogData
   })
   dialogRef.afterClosed().subscribe(dialogResult=>{
     if(dialogResult){
      this.collectionDbservice.addNewClient(obj).subscribe(
        res =>{
          //console.log(res);    
          if(res["type"]==="success"){
            this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success!');
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

  /**ASK TO ADD MORE CLIENT**/
  askForNext(){
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_ADD_MORE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.formGroupDirective.resetForm();
        this.forms_default();
      }else{
        this.router.navigate(['../list-client'], {relativeTo:this.route})   
      }
    })
  }

  /**ASSIGN EDITABLE DATA TO FORM FOR EDIT THE CLIENT DETAILS**/
  editmode:boolean = false;
  assignEditabedata(){
    this.route.queryParams.subscribe(queryPara=> {     
      if(Object.keys(queryPara).length) this.editmode = true 
      if(this.editmode){  
       this.collectionDbservice.selectClientById(queryPara).subscribe(
         res => {
          console.log(res);
          if(res["type"]==='success'){
            if(res["data"].length){
            this.clientForm.patchValue({
              clientName : res["data"][0].client_name,
              clientId : res["data"][0].client_id,   
              userName: res["data"][0].userName,   
              password:res["data"][0].raw,      
              activationDate : res["data"][0].activation_date,
              deactivationDate : res["data"][0].deactivation_date,
              contactPersonName:res["data"][0].contact_person_name,
              contactPersonPhone:res["data"][0].contact_person_phone,
              contactPersonEmail:res["data"][0].contact_person_email,
            })
          }
          }else{
            console.log(AppConstant.ERROR_MSG);
          }
         },
         err => console.log(err)
       )
      }
    })
  }

  /**UPDATE CLIENT'S EDITED DATA**/
  update(data){
    let obj = {};
    obj["clientId"] = data["clientId"];
    obj["clientName"] = data["clientName"];
    obj["activationDate"] =  moment(data["activationDate"]).format("YYYY-MM-DD")+" 00:00:01";
    obj["deactivationDate"] = moment(data["deactivationDate"]).format("YYYY-MM-DD")+" 23:59:59";
    obj["userId"] = this.user_id?this.user_id:"1";
    obj["contactPersonName"] = data["contactPersonName"];
    obj["contactPersonPhone"] = data["contactPersonPhone"];
    obj["contactPersonEmail"] = data["contactPersonEmail"];
    obj["socialMediaCollection"] = "active";
    obj["newsFeedCollection"]  = "active";
    obj["thinkTankCollection"]  = "active";    
    const dailogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_UPDATE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dailogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        console.log(obj);
        this.collectionDbservice.updateClient(obj).subscribe(
          res =>{
            console.log(res);
            if(res["type"]==="success"){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success!');
              this.router.navigate(['../list-client'], {relativeTo:this.route})   
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          },
          err => console.log(err)
        )          
      }
    })
  }

  /**NAVIGATE TO CLIENT LIST COMPONENT**/
  navigateToList(){
    this.router.navigate(['../list-client'], {relativeTo:this.route})
  }

/**VALIDATE MIN DATE FOR THE DEACTIVATION DATE**/
getDeactivationMinDate(currrentdate){   
    this.deactivationMinDate = moment(currrentdate).add(1, 'days').format();
    return this.deactivationMinDate;
 }

 /**INITIALISE CLIENT'S REACTIVE FORM**/
  initClientform(){
    this.clientForm = this.fb.group({
      clientName:["", Validators.required],
      clientId:["", Validators.required],
      userName:["", Validators.required],
      password:["", Validators.required],
      activationDate:[this.activationMinDate, Validators.required],
      deactivationDate:[this.deactivationMinDate, Validators.required],
      contactPersonName:[""],
      contactPersonPhone:[""],
      contactPersonEmail:["", [Validators.email]],
    })
  }

/**CLIENT FORM DEFAULT VALUES**/
  forms_default(){
    this.getDeactivationMinDate(this.activationMinDate);
    this.clientForm.patchValue({
      activationDate: this.activationMinDate,
      deactivationDate: this.deactivationMinDate
    })
  }


}
