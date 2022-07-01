
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  jobsPieChartOptions: Highcharts.Options
  jobsColumnChartOptions: Highcharts.Options
  Highcharts: typeof Highcharts = Highcharts;

  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  IPlist:any=[]
  sourceList:any=this.collectionService.socialIcons;
  panelOpenState:boolean = true;


  @ViewChild('recordTbl', {static:false}) table:MatTable<Element>;  
  displayedColumns: string[] = ['Sr.No', "Collection Name", "Collection Type", "Name", "Crawling Status", "Source", "Client",  "Start Crawl Date", "Last Crawl Date", "Message", "Collection ID",   "keyword ID", "Created At", "Created By",  "Job ID", "Log Inserted Date", "Machine IP", "Action"];
  constructor(
    private collectionDbService:CollectionDbService,
    private collectionService:CollectionService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router) {  }

  ngOnInit(): void {   
    this.collectionDbService.loadMachineIP()
    .subscribe(res=>  this.IPlist = res["machineIPList"])
    this.getClientList();
    if(Object.keys(this.route.snapshot.queryParams).length){
      this.route.queryParamMap.subscribe(res=> { 
        if(res["params"].keyword){
          this.search = res["params"].keyword; 
        }else{
          this.crawlingStatus = "error";
          this.ClientID = res["params"].client
        }    
       this.bindData();      
      });
     }else{
      this.bindData();
     }     
  }
  
  bindData(){
    this.page = 0
    this.getJobDetails();
    this.initChart();
  }
   
  startDate:any = new Date( new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,1,0))
  endDate:any = new Date();
  searchType:any='entity';
  source:any=''
  collectionType:any=''
  crawlingStatus:any=''
  ClientID:any='';
  machineIP:any=''
  dateFilterType:any ='startCrawlDate';
  search:any="";  
  sort:any="newest";
  readStatus:any = "";

  jobDetailsList:any[]=[]
  getJobDetails(){  
      let obj = {};  
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_RECORD_LIMIT;     
    obj["dateFrom"] =  moment(this.startDate).format("YYYY-MM-DD HH:mm:ss");
    obj["dateTo"] =  moment(this.endDate).format('YYYY-MM-DD HH:mm:ss');
    obj["dateFilterType"] = this.dateFilterType;
    obj["searchType"] = this.searchType;
    obj["source"] = this.source;
    obj["clientId"] = this.ClientID;
    obj["collectionType"] = this.collectionType;
    obj["machineIp"] = this.machineIP
    obj["searchKeyword"] = this.search;    
    obj["crawlingStatus"]=  this.crawlingStatus;  
    obj["order"]= this.sort;    
    obj["readStatus"] = this.readStatus;
     console.log(obj);
    this.collectionDbService.jobLoggedData(obj).subscribe(     
      res =>{      
        console.log(res)      
        if(res["status"] == "success"){
            this.jobDetailsList = res["data"];
            this.totalNumberOfRecord = res["totalCount"];            
            // console.log(this.jobDetailsList);
        }
      }
    )
  }

  

  
  viewJob(item){
  console.log(item);
  let obj = {}; 
  obj["page"] = this.page;
  obj["jobId"] = item.jobId;
  obj["limit"] = this.size;
  obj["order"] = this.sort;
  this.router.navigate(['/pages/manage-jobs/job-logs'], {queryParams:obj})  
}


updateReadStatus(event:MatSlideToggleChange,item){ 
   let obj = {};
   obj["id"] = item.jobId
   obj["readStatus"] = event.checked?"read":"unread";
   (event.checked==true)?item.readStatus = "read":item.readStatus = "unread";
   this.collectionDbService.changeReadStatus(obj).subscribe(
     res => {
       if(res["status"] == "success"){      
         this.toastr.success(res["msg"], 'Success!');
       }else this.toastr.error(AppConstant.ERROR_MSG, "Error!")
     },
     err => console.log(err))
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
        if(res["type"]==="success"){
          this.clientList = res["data"];               
        }else{
          console.log(AppConstant.ERROR_MSG);
        }        
      },
      err => console.log(err)
    )
 }

 jobPieChartDataArr:any=[];
 jobsColumnsChartArr:any=[];
 initChart(){
  this.jobPieChartDataArr.length = 0;
  this.jobsColumnsChartArr.length = 0;
   let obj = {};  
    obj["dateFrom"] =  moment(this.startDate).format("YYYY-MM-DD HH:mm:ss");
    obj["dateTo"] =  moment(this.endDate).format('YYYY-MM-DD HH:mm:ss');
    obj["dateFilterType"] = this.dateFilterType;
    obj["searchType"] = this.searchType;
    obj["source"] = this.source;
    obj["clientId"] = this.ClientID;
    obj["collectionType"] = this.collectionType;
    obj["machineIp"] = this.machineIP
    obj["searchKeyword"] = this.search;    
    obj["crawlingStatus"]=  this.crawlingStatus;  
    obj["order"]= this.sort;    
    obj["readStatus"] = this.readStatus;
  this.collectionDbService.statusCount(obj).subscribe(res=>{
    if(res["status"]=="success"){
      let dataObj =res["statusCount"];   
      for(let key in dataObj){
        if(dataObj[key] != 0 && key !== 'total'){
          let obj = {};
          obj["name"] = this.capitalize(key)
          obj["y"] = dataObj[key]
          if(key =="processing") obj["color"] = "#ffb822"
          if(key =="completed") obj["color"] = "#088141"
          if(key =="error") obj["color"] = "#DD0031"
          this.jobPieChartDataArr.push(obj);
        }
      } 
      if(this.jobPieChartDataArr.length){
        this.jobsPieChart(this.jobPieChartDataArr)
      } 
     }
  }, err => console.log(err))
   
  this.collectionDbService.sourceWiseStatusCount(obj).subscribe((res:any)=>{  
    console.log(res); 
    if(res["status"] =="success"){
      let dataObj = res["sourceWiseStatusCount"];
      // let dataObj = this.sourceWiseStatusCount; 
      let finalData:any = {}
      let sourceList: any = [];     
      let processingdata: any = [];
      let completeddata: any = [];
      let errordata:any = [];
      for (let key in dataObj) {
        if(key !== ""){
        sourceList.push(this.capitalize(key));            
        processingdata.push(dataObj[key].processing || 0);
        completeddata.push(dataObj[key].completed || 0); 
        errordata.push(dataObj[key].error || 0);
        }
      }
      this.jobsColumnsChartArr = [      
        { name: "Processing", color: "#ffb822", data: processingdata },
        { name: "Completed", color: "#088141", data: completeddata },
        { name: "Error", color: "#DD0031", data: errordata }
      ]
      finalData["source"] = sourceList;
      finalData["chartdataArr"] = this.jobsColumnsChartArr 
      if(this.jobsColumnsChartArr.length){
        this.jobsColumsChart(finalData);
      }  
      
    }
  }, err => console.log(err))

 }

 jobsPieChart(array){  
   console.log(array)
  this.jobsPieChartOptions = {
  chart: {
      type: 'pie',
      options3d: {
          enabled: true,
          alpha:10
      },
      style: {
        fontFamily: 'Poppins, Helvetica, sans-serif !important'
      }
  },
  title: {
    text: 'Status Count'
  },
plotOptions: {
  pie: {
      innerSize:20,
      depth:50
  }
},
    series: [{
      name: 'status',
      data: array,
      type: 'pie'
    }]
  }
 }

 jobsColumsChart(data){
  this.jobsColumnChartOptions = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 0 ,
        viewDistance: 25,
        depth: 40
    },
      style: {
        fontFamily: 'Poppins, Helvetica, sans-serif !important'
      }
  },
  title: {
      text: 'Source wise status count'
  },
  xAxis: {
     categories: data.source,
     labels: {
      skew3d: true,
      style: {
          fontWeight: '700',
          fontSize:'.9rem'
      }
  }
  },
 yAxis: {
        min: 0,
        title: {
            text: 'Total client count'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
  legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
  },
  tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      depth:30,
      maxPointWidth: 50,
      dataLabels: {
        enabled: true
    }
  }
  },
  series:data.chartdataArr
  }
 }


 createColumnChartData(dataObj, columnArr):any{
  let finalData:any = {}
      let sourceList: any = [];     
      let processingdata: any = [];
      let completeddata: any = [];
      let errordata:any = [];
      for (let key in dataObj) {
        if(key !== ""){
        sourceList.push(this.capitalize(key));            
        processingdata.push(dataObj[key].processing || 0);
        completeddata.push(dataObj[key].completed || 0); 
        errordata.push(dataObj[key].error || 0);
        }
      }
      columnArr = [      
        { name: "Processing", color: "#ffb822", data: processingdata },
        { name: "Completed", color: "#088141", data: completeddata },
        { name: "Error", color: "#DD0031", data: errordata }
      ]    
      finalData["source"] = sourceList;
      finalData["chartdataArr"] = columnArr        
  return finalData;    
 }

 /**MAKE CAPITAL FIRST LETTER OF STRING**/
 capitalize(str){
  return `${str.toString()[0].toUpperCase()}${str.toString().substr(1)}` 
}


/**PAGINATION EVENT FOR NEXT/PRE OPERATION**/
paginate(event) {
  this.page = event["pageIndex"];
  this.getJobDetails();    
}

getRecordNumber(index){
  return (((this.page)*10))+(index+1);
}


}
