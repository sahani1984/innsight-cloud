import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTable} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../partial/layout/confirm-dialog/confirm-dialog.component';
import {AppConstant} from '../../../shared/app-constant';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-proxy',
  templateUrl: './list-proxy.component.html',
  styleUrls: ['./list-proxy.component.scss']
})
export class ListProxyComponent implements OnInit { 
  
  proxyList:any = []
  search_by_proxy:string = '';
  status_val:string = '';
  selected_country:string = 'in';  

  @ViewChild('proxyListTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Proxy', "Port", "Added From",  'Country',  "Status", 'Action'];

  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0; 

  constructor(
    public collectionService:CollectionService,
    private collectionDbService:CollectionDbService,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.collectionService.bindMaster();
     this.bindData();     
  }
 
  bindData() {   
    this.page = 0;
    this.getAllProxy();
  }

/*GET ALL PROXY LIST OR FILTERD PROXY*/
  getAllProxy(){    
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["ip"] = this.search_by_proxy;
    obj["country"] = this.selected_country;
    obj["status"] = this.status_val;
    this.collectionDbService.selectAllProxy(obj).subscribe(
      res =>{
        if(res["type"] =='success'){
          this.proxyList = res["data"];
          if(this.proxyList.length){
            this.totalNumberOfRecord = this.proxyList[0]["totalCount"];
          }    
          console.log(this.proxyList);     
        }else{
          console.log(AppConstant.ERROR_MSG);
        }      
       },
      err => console.log(err)
    )
  }

  /*DELETE PROXY FORM THE LIST */
  delete(id){
    let obj = {};
    obj["id"]= id;    
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px", 
      maxWidth: "400px", 
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbService.deleteProxyById(obj).subscribe(
          res =>{          
            if(res["type"]=="success"){
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

/*CHANGE PROXY LIST STATUS IN (ACTIVE/INACTIVE)*/
  changeStatus(event, status, recordId){
    let obj = {};
    obj["status"] = status =='active'?'inactive':'active';
    obj["recordId"] = recordId;    
   const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_CHANGE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px", 
      maxWidth: "400px", 
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
       this.collectionDbService.changeStatusOfProxy(obj).subscribe(
          res=>{
            if(res["type"]=='success'){
              let e = event.target;
              if(e.innerText ==='active'){
                e.innerText  = 'inactive';
                e.classList.remove('btn-label-success');
                e.classList.add('btn-label-danger');
              }else{
                e.innerText  = 'active';
                e.classList.remove('btn-label-danger');
                e.classList.add('btn-label-success');      
              }
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }            
          },
          err=> console.log(err)
        )
      }
    })
  }

/*FOR EDIT PROXY LIST REDIRECT TO UPDATE FORM WITH THE QUERY PARAMETERS*/
  edit(obj){
    console.log(obj)
    this.router.navigate(['../proxy-update',  obj.record_id], {relativeTo:this.route, queryParams:obj});
  }

/*PAGINATION METHOD */
  paginate(event) {
    this.page = event["pageIndex"];
    this.getAllProxy();    
  }
  getRecordNumber(index){
    return (((this.page)*10))+(index+1);
  }




}
