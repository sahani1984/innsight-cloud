import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table'
import {AppConstant} from 'src/app/shared/app-constant';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-news-source',
  templateUrl: './list-news-source.component.html',
  styleUrls: ['./list-news-source.component.scss']
})
export class ListNewsSourceComponent implements OnInit {

  @ViewChild('sourceListTbl', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'News Source','Country', "Language", "Collection Mode",  "Status", "Start Crawl Date", "Last Crawl Date", "Crawling Status", "Message", "Record ID", 'Action'];
  
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  isRestorefilter:boolean = false
  sourceList:any= [ ]
  status_btn:string = 'btn btn-bold btn-sm btn-font-sm'
     
  constructor(
    public collectionService:CollectionService,
    private collectionDbServices:CollectionDbService,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute ) { 
      this.collectionService.isStoreListNewsdata.subscribe(res=>this.isRestorefilter = res);
  }

  ngOnInit(): void {
    this.collectionService.bindMaster(); 
     if(this.isRestorefilter){
      let data = JSON.parse(sessionStorage.getItem('searchObj')); 
      this.searchByName = data["search"];
      this.collection_mode = data["collMode"];
      this.language =  data["lang"];
      this.country = data["country"];
      this.page = data["page"];
      this.getAllNewsSource(); 
      this.isRestorefilter = false;
     }else{
      this.bindData();
    }   
  }

  bindData() {   
    this.page = 0;
    this.getAllNewsSource();
  }

/**GET ALL NEWS SOURCE**/
  searchByName:any = '';
  status:any = '';
  language:any = '';
  source:any = '';
  country:any= '';
  collection_mode:any = '';

  getAllNewsSource(){   
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;
    obj["search"] = this.searchByName;
    obj["language"] = this.language
    obj["country"] = this.country
    obj["activeStatus"] = this.status
    obj["collectionMode"] = this.collection_mode;
    // console.log(obj);
    this.collectionDbServices.selectAllNewsSource(obj).subscribe(
      res => {           
        if(res["type"]== 'success'){
          this.sourceList = res["data"];          
          this.totalNumberOfRecord = this.sourceList.length? this.sourceList[0]["totalCount"]:0;
          console.log(this.sourceList);
        }else{
          console.log(AppConstant.ERROR_MSG);
        }
      },
      err => console.log(err)
    )
  }

/**DELETE NEWS SOURCE FROM THE LIST**/
  delete(recordId){
    let obj = {};
    obj["recordId"] = recordId;
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbServices.deleteNewsSourceById(obj).subscribe(
          res =>{
            console.log(res);
            if(res["type"]=='success'){
              this.toastr.success(AppConstant.DELETED_SUCCESSFULLY_MSG, 'Success!');
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

/**NAVIGATE TO FORM PAGE TO EDIT THE DATA**/
  editNewsSource(recordId){
    let obj = {};
    obj["search"] = this.searchByName
    obj["collMode"] = this.collection_mode;
    obj["lang"] = this.language;
    obj["country"] = this.country;
    obj["page"] = this.page;
    sessionStorage.setItem('searchObj', JSON.stringify(obj));
    this.router.navigate(['../update-news-source', recordId], {relativeTo:this.route});
  }

/**METHOD FOR CHANGE STATUS OF NEWS SOURCE WHEN CLICK ON IT**/
  changeStatus(event, status, id){
    console.log('status')
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
        this.collectionDbServices.updateStatusNewsSource(obj).subscribe(
          res=>{
            //console.log(res);
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

 /**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
 paginate(event) {
  this.page = event["pageIndex"];
  this.getAllNewsSource();    
 }

 getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}


}
