import { Component, OnInit, ViewChild} from '@angular/core';
import {AppConstant} from '../../../shared/app-constant'
import { MatTable } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CommonService } from 'src/app/shared/services/common.service';
import * as moment from 'moment';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  chartData:any = {type:"default"}
  IPlist:any=[]

  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>
  displayedColumns: string[] = ['Sr.No', "Job Status", 'Client',  "Activated Date","Deactivated Date", "Contact Person Name", "Mobile Number", "Email ID", "Status",   'Action'];
  
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  constructor(
    private router:Router, 
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private collectionDbservices:CollectionDbService,
    private commonService:CommonService
    ) { }

  ngOnInit(): void {
    this.collectionDbservices.loadMachineIP().subscribe(res=> this.IPlist = res["machineIPList"])
    this.bindData();
    this.initChart();
    // this.toolTipMsg(2)
  }

  bindData(){
    this.getClientList();
    this.page = 0;

  }

  /**GET ALL CLIENT LIST **/ 
  crawlingErrorDays:any=''
  clientList:any = [];
 
  getClientList(){   
    let obj = {};  
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;    
   this.collectionDbservices.selectAllClient(obj).subscribe(
       res =>{     
         if(res["type"]==="success"){
           this.clientList = res["data"];          
           this.totalNumberOfRecord = this.clientList.length?this.clientList[0].totalCount:0;           
           this.toolTipMsg(this.clientList[0].crawlingErrorInDays)      
         }else{
           console.log(AppConstant.ERROR_MSG);
         }        
       },
       err => console.log(err)
     )
  }

  errorTooltipMsg:any="";
  toolTipMsg(d){      
      let backday = Number(d) - 1;    
      let st = moment(new Date( new Date(new Date().setDate(new Date().getDate() - backday)).setHours(0,0,1,0))).format("DD-MM-YYYY HH:mm:ss");
      let en =  moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
      this.errorTooltipMsg = `Error from ${st} to ${en}`;
   }


/**NAVIGATE TO FORM FOR EDIT CLIENT **/
  editClient(clientId){
    let obj = {};
    obj["clientId"] = clientId
    this.router.navigate(['../update-client'], {relativeTo:this.route, queryParams:obj})
  }

  /**DELETE CLIENT FORM LIST**/
  delete(elementId){
    let obj = {};
    obj["clientId"] = elementId;
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth: "400px",
      data:dialogData
    })
  dialogRef.afterClosed().subscribe(dialogResult=>{
    if(dialogResult){
      this.collectionDbservices.deleteClientById(obj).subscribe(
        res =>{
          console.log(res);
          if(res["type"]==="success"){
            this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success!');
            this.bindData();
          }
        },
        err => console.log(err)        
      )
      
    }
  })
  }
startDate:any = new Date(new Date().setDate(new Date().getDate() - 7));
endDate:any = new Date();
initChart(){
  let obj = {};
    obj["search"]= "";
    obj["collectionType"] = "";
    obj["clientId"] = ""
    obj["activationStatus"] = "";
    obj["startDate"] = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss');
    obj["endDate"] = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'); 
    this.commonService.sendGraphData(obj);
}


 /**VIEW DETAIL**/ 
 viewDetail(clientId){
  this.router.navigate(["/pages/manage-jobs/collection-list"],{queryParams:{"client":clientId}})
 }

 viewStatus(client){
   let obj = {};   
   obj["client"] = client
  this.router.navigate(["/pages/manage-jobs/job-detail"],{queryParams:obj})
 }

 viewStatusDetails(clientId){
   this.router.navigate(['./pages/manage-jobs/migration-track-status'],{queryParams:{"client":clientId}})
 }


/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
paginate(event) {
  this.page = event["pageIndex"];
  this.bindData();    
}

getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}
}
