import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { MatTable } from '@angular/material/table';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/partial/layout/confirm-dialog/confirm-dialog.component';
import { AppConstant } from 'src/app/shared/app-constant';

@Component({
  selector: 'app-add-news-source',
  templateUrl: './add-news-source.component.html',
  styleUrls: ['./add-news-source.component.scss']
})
export class AddNewsSourceComponent implements OnInit {
  addNewsSource:FormGroup;
  user_id:any;
  news_source_feedUrl:any =[];
  isValidForm:boolean = false;

  news_recoredId:string = ''
  isEditMode:boolean = false;
  collectionMode:any = 'scrapper';
  

  @ViewChild('rssFeed', {static:false}) table:MatTable<Element>;
  displayedColumns: string[] = ['Sr.No', 'Feed URL', 'Category', 'Action'];

  selected_collection:boolean = false;
  constructor(
    private fb:FormBuilder,
    public collectionService:CollectionService,
    private collectionDbServices:CollectionDbService,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.collectionService.userID.subscribe(res=> this.user_id = res);
    this.collectionService.bindMaster();    
    this.initform();    
    
      this.addNewsSource.valueChanges.subscribe(res=>{      
        if(res.collectionMode == 'feed'){
          this.selected_collection = true
          if(!this.news_source_feedUrl.lenght) this.isValidForm = false          
        }else {
          this.selected_collection = false
          this.news_source_feedUrl = [];
        }
      })
      this.addNewsSource.statusChanges.subscribe(result=>{
        if(result ==='VALID'){
          if(this.addNewsSource.controls.collectionMode.value == 'scrapper') this.isValidForm = true          
          if(this.addNewsSource.controls.collectionMode.value == 'feed' && this.news_source_feedUrl.length )  this.isValidForm = true                   
        } else this.isValidForm = false;       
      })

      this.assignEditableDataToForm();    
   }
/**ADD NEW SOURCE**/
  addSource(data){
    let obj = {};
    obj["country"] = data.country
    obj["language"] = data.language_name
    obj["newsPaperSource"] = data.newsPaperSource
    obj["collectionMode"] = data.collectionMode
    obj["delta"] = data.collection_interval
    obj["userId"] = this.user_id?this.user_id:"1";
    obj["feed"] = this.news_source_feedUrl;   
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width:'350px',
      maxWidth:'400px',
      data:dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult=>{
      if(dialogResult){
        this.collectionDbServices.addNewsSource(obj).subscribe(
          res =>{
            //console.log(res);
            if(res["type"]=='success'){
              this.toastr.success(AppConstant.SAVED_SUCCESSFULLY_MSG, 'Success!');
              this.router.navigate(['../list-news-source'], {relativeTo:this.route});
            }else{
              this.toastr.error(AppConstant.ERROR_MSG, 'Error!');
            }
          },
          err => console.log(err)
        )
      }
    })
  }

/**ADD FEED URL TO THE LIST**/
  addFeedUrl(data){   
    let obj = {};
    obj["feedUrl"] = data.feedUrl
    obj["categoryId"] = data.category
    this.news_source_feedUrl.push(obj);
    this.table.renderRows(); 
    this.addNewsSource.patchValue({
      feedUrl:'',
      category:''
    })
   }
   
/**DELETE FEED URL FROM THE LIST**/
   delete_feedUrl(index){
    this.news_source_feedUrl.splice(index, 1);
    this.table.renderRows();    
   }

   
/**ASSIGN EDITABLE DATA TO THE FORM IN THE UPDATE CASE**/
   assignEditableDataToForm(){
     this.route.params.subscribe(params=> this.news_recoredId =  params.id)
     if(this.news_recoredId == undefined){
      this.isEditMode = false;
     }else{
      this.isEditMode = true;
      this.collectionDbServices.selectNewsSourceById({recordId:this.news_recoredId}).subscribe(
        res =>{
          //console.log(res);
          if(res["type"]=='success'){
            this.addNewsSource.patchValue({
              newsPaperSource : res["newsSource"].art_source,
              country : res["newsSource"].country_code,
              language_name : res["newsSource"].language,
              collection_interval :  res["newsSource"].delta_interval.toString(),
              collectionMode:res["newsSource"].collection_mode           
            })           
        if(res["feedList"]){
          let feeListArr:any = res["feedList"]
          feeListArr.forEach(item=>{
            let obj = {};
            obj["feedUrl"] = item.feed_url;
            obj["categoryId"] = item.category_id;
            this.news_source_feedUrl.push(obj);
            this.table.renderRows();
            })         
          }
         }
        },
        err => console.log(err)
      )
     }    
   }

/**NAVIGATE TO LIST WHEN CLICK ON CANCEL BUTTON**/
   navigateToList(){     
    if(this.isEditMode) this.router.navigate(['../../list-news-source'], {relativeTo:this.route});
    else this.router.navigate(['../list-news-source'], {relativeTo:this.route});
    this.collectionService.isStoreListNewsdata.next(true);
   }

/**UPDATE NEWS SOURCE**/
   update(data){    
     let obj = {};
     obj["recordId"] = this.news_recoredId;
     obj["country"] = data.country
     obj["language"] = data.language_name
     obj["newsPaperSource"] = data.newsPaperSource
     obj["collectionMode"] = data.collectionMode
     obj["delta"] = data.collection_interval
     obj["userId"] = this.user_id?this.user_id:"1";
     obj["feed"] = this.news_source_feedUrl;    
     const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_UPDATE);
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       width:'350px',
       maxWidth:'400px',
       data:dialogData
     })
     dialogRef.afterClosed().subscribe(dialogResult=>{
       if(dialogResult){
         this.collectionDbServices.updateNewsSource(obj).subscribe(
           res =>{
             //console.log(res);
             if(res["type"]=='success'){
               this.toastr.success(AppConstant.UPDATED_SUCCESSFULLY_MSG, 'Success!');
               this.router.navigate(['../../list-news-source'], {relativeTo:this.route});
             }
           }
         )
       }
     })
   }

/**INITIALIZE THE NEWS SOURCE REACTIVE FORM**/
   initform(){
    this.addNewsSource = this.fb.group({
      newsPaperSource:[null, [Validators.required]],
      country:['in', [Validators.required]],
      language_name:["", [Validators.required]],
      collection_interval:['21600', [Validators.required]],
      collectionMode:['scrapper'],
      feedUrl:'',
      category:''
    })  
   }

}
