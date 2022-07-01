import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/shared/services/common.service';


@Component({
  selector: 'app-collection-lists',
  templateUrl: './collection-lists.component.html',
  styleUrls: ['./collection-lists.component.scss']
})
export class CollectionListsComponent implements OnInit{
  chartData:any = {type:"all"}

  show_row_details:number = null;
  is_active_row:number = null;
  selectedIndex:number = null;  
  startDate:any = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate:any = new Date();
  sort:string="newest";
  clientID:string = 'pcr'
  priority:string="";
  collectionType:string="";
  searchType:string = 'collection' 
  search:string="";  
  activationStatus:string="";
  isSelect:boolean = false;
  constructor(
    private collectionDbService:CollectionDbService,
    private collectionService:CollectionService,
    private toastr:ToastrService,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private commonService:CommonService
    ) { }

  ngOnInit(): void {  
    this.route.queryParams.subscribe(res=>{
      if(Object.keys(res).length){
        this.clientID = res["client"];
      }
  })
    this.getClientList();
    this.bindData();
    
  }
 

  /*REFRESH COLLECTION LIST ITEMS*/
  bindData() {
    this.selectedCollectionId=[];
    this.page = 0;
    this.fetchAllData();    
  }


  dataList=[];
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;  
  fetchAllData() {
     let obj = {};
     obj["dateFrom"] = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'); 
     obj["dateTo"] = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'); 
     obj["pageNumber"] = this.page;
     obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
     obj["clientId"] = this.clientID;
     obj["search"] = this.search;
     obj["activationStatus"] = this.activationStatus;
     obj["priority"] = this.priority;
     obj["collectionType"] = this.collectionType;
     obj["sort"] = this.sort;
    //  console.log(obj)
     this.commonService.sendGraphData(obj);
    this.totalNumberOfRecord = 0;      
    this.collectionDbService.listCollection(obj).subscribe(
      res => {
        this.dataList = res;      
        console.log(this.dataList);
        this.totalNumberOfRecord = this.dataList.length? this.dataList[0].count:0 ;      
        },
      err => console.log('error is showing')
    )
  }



  /**GET ALL CLIENT LIST **/
  clientList:any = [];
  getClientList(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_CLIENT_LIMIT
    obj["search"] = '';
    this.collectionDbService.selectAllClient(obj).subscribe(
      res =>{    
        // console.log(res);    
        if(res["type"]==="success"){
          this.clientList = res["data"];          
        }else{
          console.log(AppConstant.ERROR_MSG);
        }        
      },
      err => console.log(err)
    )
 }


  /****/
trackByCollectionID(index: number, collection: any): string {
  return collection.collection_id;
}


  /*DELETE COLLECTION  ROW DATA*/
  delete(collectionId, collectiontype){
    const message = AppConstant.CONFIRMATION_DELETE;
    const dialogData = new ConfirmDialogModel("Confirm", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
     if (dialogResult) {
      let keyObj = {};
      keyObj["collectionId"] = collectionId;          
      keyObj["userId"] = '1' 
      keyObj["collectionType"] = collectiontype;         
      console.log(keyObj);
       this.collectionDbService.deleteCollection(keyObj).subscribe(
         res => {
           console.log(res);
          if (res['type'] === 'success'){
            this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success');               
            this.bindData()
          }else{
            this.toastr.error(AppConstant.ERROR_MSG, 'Error!')
          }
        },
         err => console.log(err)
       )
   }
 })
}

viewDetails(itemObj){
   this.router.navigate(["/pages/manage-jobs/collection-entity"],{ queryParams:{id:itemObj.collection_id, type:itemObj.collection_type, client:itemObj.created_by}})
}

/*FOR MASTER CHECK*/
checked_checkbox:boolean = false;
isCheckedMasterCheckbox(event){   
  this.selectDeselectAll(event);    
  if(event.checked == true){
    this.checked_checkbox = true;    
    this.dataList.forEach(item=>{
      if(this.selectedCollectionId.indexOf(item.collection_id) == -1){
        this.selectedCollectionId.push(item.collection_id);
      }        
    })
    this.navfilter(this.selectedCollectionId);          
  }else{
    this.checked_checkbox = false;
    this.selectedCollectionId = [];
    this.navfilter(this.selectedCollectionId);       
  }      
}


/*COLLECTION ID FOR CHECKED ITEM*/
selectedCollectionId:any=[];
 addToSelected(event, collectionId, index){     
   this.selectCollection(event, index);
    if(event.checked == true){  
    this.selectedCollectionId.push(collectionId);
    if(this.selectedCollectionId.length === 10){
      this.isCheckedMasterCheckbox(event);
    }
    this.navfilter(this.selectedCollectionId);      
     }else{
      let collectionIndex = this.selectedCollectionId.findIndex(item=> item == collectionId);     
      if(collectionIndex >= 0){
        this.selectedCollectionId.splice(collectionIndex, 1);
      }   
      this.navfilter(this.selectedCollectionId);
      this.isSelect = false;     
    } 
  }

  /**SELECT/DESELECT COLLECTION ROW WHICH IS CHECKED*/
selectCollection(event, index){
  let list_row =   document.querySelectorAll('.list_row');
  if(event.checked == true){   
      list_row.forEach(item=>{
        if(item.getAttribute('data-id') == index) item.classList.add('selected');         
     })
  }else if(event.checked == false){
      list_row.forEach(item=>{
            if(item.getAttribute('data-id') == index) item.classList.remove('selected');                
        })
   }
}

/**SELECT/DESELECT ALL COLLECTION ROW RELATIVE TO MASTER CHECKBOX*/
selectDeselectAll(event){
  let list_row =   document.querySelectorAll('.list_row');
  if(event.checked == true){ 
     list_row.forEach(item=>{
        item.classList.add('selected');         
     })
  }else if(event.checked == false){
      list_row.forEach(item=>{
          item.classList.remove('selected');                
        })
   }
}

/*SHOW/HIDE PAUSED/RESUME BUTTON SHOWING AFTER CHECKED ITEM BESIDES TO REFRESH BUTTON */
  only_paused_action:boolean = false;
  only_resume_action:boolean = false;
  both_paused_resume:boolean = false;
  selectedCollection:any;
  navfilter(collectionIdArr){
    this.selectedCollection = this.dataList.filter(item=>  collectionIdArr.includes(item.collection_id));
    let status = this.selectedCollection.map(item=> item.paused_status);
    this.both_paused_resume = false; 
    this.only_resume_action = false;
    this.only_paused_action = false;
    if((status.indexOf('yes') >= 0) && (status.indexOf('no') >= 0)){   
      this.both_paused_resume = true;     
    }else if((status.indexOf('yes') >= 0) && (status.indexOf('no') == -1)){
      this.only_resume_action = true;     
    } else if((status.indexOf('yes') == -1) && (status.indexOf('no') >= 0)){
      this.only_paused_action = true;     
    } 
  }

  hideAction(){
  this.only_paused_action = false;
  this.only_resume_action = false;
  this.both_paused_resume = false;
  this.selectedCollectionId.length = 0
  }

  /*UPDATE PAUSED STATUS ON THE FRONTEND VIEW WIHOUT REFRESH THE API*/
  updataPausedStatus(collectionIdArr, status){
    this.dataList.forEach(item=>{    
      if((collectionIdArr.indexOf(item.collection_id) >= 0) && item.activationStatus == 'active'){       
        item.paused_status = status;
      }
    })
    if(this.selectedCollectionId.length) this.navfilter(this.selectedCollectionId);
  }


  /*DELETE COLLECTION LIST ITEM WHICH ARE CHECKED*/
  deleteSelected(){
    const dialogData = new ConfirmDialogModel("Confirm", "Do you want to delete selected collections?");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["collectionId"] = this.selectedCollectionId;          
        keyObj["userId"] = '1'
        console.log(keyObj);
         this.collectionDbService.deleteMultipleCollection(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.selectedCollectionId=[];
              this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success');               
              this.bindData();              
            }
            else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
           }
          },
           err => console.log(err)
         )
      }
    })    
  }

/*RESUME COLLECTION LIST ITEMS WHICH ARE CHECKED*/ 
  resume(){   
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to resume selected collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["collectionId"] = this.selectedCollectionId;          
        keyObj["userId"] = '1'
        keyObj["status"] = "no";         
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusById(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success'); 
              this.updataPausedStatus(this.selectedCollectionId, 'no');
              //this.bindData()
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    })    
  }
  
/*PAUSE COLLECTION LIST ITEMS WHICH ARE CHECKED*/ 
  pause(){   
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to pause selected collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["collectionId"] = this.selectedCollectionId;          
        keyObj["userId"] = '1' 
        keyObj["status"] = "yes"; 
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusById(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success'); 
              this.updataPausedStatus(this.selectedCollectionId, 'yes');
              //this.bindData()
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    })    
  }

  /*PAUSE ALL COLLECTION LIST ITEMS WITHOUT CHECKED*/ 
  pauseAll(){   
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to pause all collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["userId"] = '1'
        keyObj["status"] = "yes"; 
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusAll(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success');
              this.dataList.forEach(item=> {
                if(item.activationStatus == 'active') item.paused_status = 'yes'                
              }); 
              //this.bindData()
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    })    
  }
  
/*RESUME ALL COLLECTION LIST ITEMS WITHOUT CHECKED*/
  resumeAll(){   
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to resume all collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["userId"] = '1'
        keyObj["status"] = "no"; 
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusAll(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success'); 
              this.dataList.forEach(item=>  {
                if(item.activationStatus == 'active') item.paused_status = 'no'
              })
              //this.bindData()
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    })    
  }

/*RESUME ITEMS FOR A SINGLE ITEMS CLICKING ON MORE BUTTON ON EACH ROW*/
  resumeCollection(collectionId){
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to resume  collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["collectionId"] = [collectionId]
        keyObj["userId"] = '1'
        keyObj["status"] = "no"; 
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusById(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success');
             this.updataPausedStatus([collectionId], 'no');
              if(this.selectedCollectionId.length) this.navfilter(this.selectedCollectionId);              
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    })    
  }
/*PAUSE ITEMS FOR A SINGLE ITEMS CLICKING ON MORE BUTTON ON EACH ROW*/
  pauseCollection(collectionId){
    const dialogData = new ConfirmDialogModel("Confirm", 'Do you want to pause collections?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        let keyObj = {};
        keyObj["collectionId"] = [collectionId];   
        keyObj["userId"] = '1'
        keyObj["status"] = "yes"; 
        console.log(keyObj);
         this.collectionDbService.updateCollectionPausedStatusById(keyObj).subscribe(
           res => {
             console.log(res);
            if (res['type'] === 'success'){
              this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success'); 
              this.updataPausedStatus([collectionId], 'yes');
              if(this.selectedCollectionId.length) this.navfilter(this.selectedCollectionId);  
            }
            else{
                this.toastr.error(AppConstant.ERROR_MSG, 'Error'); 
            }
          },
           err => console.log(err)
         )
      }
    }) 
  }

  

  /*SET PAGINATION**/
  paginate(event) {
    this.page = event["pageIndex"];   
    this.fetchAllData();    
      
  }
 getRecordNumber(index){
      return (((this.page)*10))+(index+1);
  }

}
