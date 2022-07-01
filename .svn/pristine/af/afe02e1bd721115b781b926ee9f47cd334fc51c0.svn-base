import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AppConstant } from 'src/app/shared/app-constant';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { JobsDbService } from 'src/app/shared/services/jobs-db.service';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { CommonService } from 'src/app/shared/services/common.service';
highcharts3D(Highcharts);

@Component({
  selector: 'app-migration-report',
  templateUrl: './migration-report.component.html',
  styleUrls: ['./migration-report.component.scss']
})
export class MigrationReportComponent implements OnInit {
  jobsColumnChartOptions: Highcharts.Options  
  jobsColumnChartOptionsSourceWise: Highcharts.Options  
  Highcharts: typeof Highcharts = Highcharts; 

  
  page = 0;
  size = AppConstant.TOTAL_RECORD_LIMIT;
  totalNumberOfRecord = 0;

  panelOpenState:boolean = true;


  constructor(
    private jobsDbServices: JobsDbService,
    private collectionDbservices: CollectionDbService,
    public commonService:CommonService) { }

  ngOnInit(): void {
    // this.getSourceList();
    this.getClientList();
    this.getJobNames();
    this.bindData();    
  }

  @ViewChild('recordTbl', { static: false }) table: MatTable<Element>
  displayedColumns: string[] = ["Sr.No", "Client", "Source", "Job Name", "Last Hit Time",  "Document Count"];


  bindData(){
    this.page = 0
    this.getMigrationReport();
  }

  ClientID: any = "innefu";
  source: any = "";
  jobName:any=""

  mReportArray: any = [];
  chartData:any ={};
  getMigrationReport() {
    let obj = {};
    obj["clientId"] = this.ClientID;
    obj["source"] = this.source;
    obj["jobName"] = this.jobName;
    this.jobsDbServices.clientsJobDateWiseMigratedDocumentCount(obj)
      .subscribe(
        res => {
          if (res["status"] == "success") {            
            this.sourceWiseData(res);
            this.mReportArray = res["clientsJobDateWiseMigratedDocumentCountList"];
            // console.log(this.mReportArray);
            let data = res["data"];
            let dates = [];
            let c = [];
           for(let key in data){
             dates.push(key);
             c.push(data[key]);
           }
           let counts = [{name:"Counts", data:c}]                    
           this.chartData["dates"] = dates;
           this.chartData["counts"] = counts; 
           this.loadColumnChart(this.chartData);
          }          
        },
        err => console.log(err)
      )
  }

sourceWiseDataArr:any=[]
sourceWiseData(res){
  let source = ["YouTube", "News", "Tumblr", "Flickr", "Dailymotion", "Instagram", "facebook", "Vk", "Reddit"]
  let data = res["clientsJobDateWiseMigratedDocumentCountList"]; 
  let dates = [];   
  for(let key in res["data"]){
    dates.push(key);
  }
  let facebook_data = [],
      news_data=[],
      dailymotion_data = [],
      tumblr_data = [], 
      youtube_data = [], 
      flickr_data = [],
      reddit_data= [],
      vk_data=[], 
      instagram_data=[],
      wordpress_data =[],
      blogger_data=[], 
      telegram_data=[]
  
  dates.forEach(item=>{
    let d = data.filter(element=> element.lastHitTime == item);    
    facebook_data.push(d.filter(d=> d.source.toLowerCase() == 'facebook')[0]?.documentCount || 0);    
    news_data.push(d.filter(d=> d.source == '')[0]?.documentCount || 0);
    dailymotion_data.push(d.filter(d=> d.source.toLowerCase() == 'dailymotion')[0]?.documentCount || 0);
    tumblr_data.push(d.filter(d=> d.source.toLowerCase() == 'tumblr')[0]?.documentCount || 0);
    youtube_data.push(d.filter(d=> d.source.toLowerCase() == 'youTube')[0]?.documentCount || 0);
    flickr_data.push(d.filter(d=> d.source.toLowerCase() == 'flickr')[0]?.documentCount || 0);
    reddit_data.push(d.filter(d=> d.source.toLowerCase() == 'reddit')[0]?.documentCount || 0);
    vk_data.push(d.filter(d=> d.source.toLowerCase() == 'vk')[0]?.documentCount || 0);
    instagram_data.push(d.filter(d=> d.source.toLowerCase() == 'instagram')[0]?.documentCount || 0);
    // wordpress_data.push(d.filter(d=> d.source.toLowerCase() == 'wordPress')[0]?.documentCount || 0);
    // blogger_data.push(d.filter(d=> d.source.toLowerCase() == 'blogger')[0]?.documentCount || 0);
    // telegram_data.push(d.filter(d=> d.source.toLowerCase() == 'telegram')[0]?.documentCount || 0);  
})
source.forEach(item=>{
  let obj = {};
  obj["name"] = item;
  if(item.toLowerCase() == 'facebook')  obj["data"] = facebook_data;
  if(item.toLowerCase() == '')  obj["data"] = news_data;
  if(item.toLowerCase() == 'dailymotion')  obj["data"] = dailymotion_data
  if(item.toLowerCase() == 'tumblr')  obj["data"] =  tumblr_data
  if(item.toLowerCase() == 'youtube')  obj["data"] = youtube_data;
  if(item.toLowerCase() == 'flickr')  obj["data"] = flickr_data;
  if(item.toLowerCase() == 'reddit')  obj["data"] = reddit_data;
  if(item.toLowerCase() == 'vk')  obj["data"] = vk_data;
  if(item.toLowerCase() == 'instagram')  obj["data"] = instagram_data;
  // if(item.toLowerCase() == 'wordpress')  obj["data"] = wordpress_data;
  // if(item.toLowerCase() == 'blogger')  obj["data"] = blogger_data;
  // if(item.toLowerCase() == 'telegram')  obj["data"] = telegram_data;     
  this.sourceWiseDataArr.push(obj);
})
console.log(this.sourceWiseDataArr);
this.loadColumnChartSourceWise(dates, this.sourceWiseDataArr);   

}


  /**GET ALL CLIENT LIST **/
  clientList: any = [];
  getClientList(){
    let obj = {};
    obj["pageNumber"] = this.page;
    obj["limit"] = AppConstant.TOTAL_CLIENT_LIMIT
    this.collectionDbservices.selectAllClient(obj).subscribe(
      res => {       
        if (res["type"] === "success") {
          this.clientList = res["data"];
        } else {
          console.log(AppConstant.ERROR_MSG);
        }
      },
      err => console.log(err)
    )
  }

  /**GET ALL SOURCE LIST **/
  // sourceList: any = []
  // getSourceList() {
  //   this.collectionDbservices.getUniqueSources().subscribe(res => {
  //     if (res["status"] == "success") {
  //       this.sourceList = res["distinctSources"];
  //     }
  //   }, err => console.log(err))
  // }

  /**GET ALL JOB LISTS**/
  jobNameList:any=[]
  getJobNames(){
    this.collectionDbservices.getUniqueJobNames().subscribe(res=>{
      if(res["status"] == "success"){
        this.jobNameList = res["distinctJobNames"];   
      }
    }, err => console.log(err))
  }


 /**COLUMN CHART**/
  loadColumnChart(data){
    this.jobsColumnChartOptions = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha:25,
          beta:0,
          viewDistance: 25,
          depth:25
      },
        style: {
          fontFamily: 'Poppins, Helvetica, sans-serif !important'
        }
    },
    title: {
        text: 'Clients Job Date Wise Migrated Document Count List'
    },
    xAxis: {
       categories:data.dates,
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
              text: 'Total  count'
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
        depth:25,
        dataLabels: {
          enabled: true
      }
    }
    },
    series:data.counts
    }
  }


  
    loadColumnChartSourceWise(categories, dataArr){      
      if(dataArr.length){ 
      this.jobsColumnChartOptionsSourceWise = {
        chart: {
          type: 'bar',         
          style: {
            fontFamily: 'Poppins, Helvetica, sans-serif !important'
          }
      },
      title: {
          text: 'Clients Job Date Wise Migrated Document Count List',
          style: {
            fontWeight: '700',
            opacity:0
        }
      },
      xAxis: {
         categories:categories,
         labels: {
          skew3d: true,
          style: {
              fontWeight: '700',
              fontSize:'.8rem'
          }
      }
      },
     yAxis: {
            min: 0,
            title: {
                text: 'Source wise collection  count',
                style: {
                  fontWeight: '700',
                  fontSize:'.9rem'
              }
            }
        },
      legend: {
        x:32,
        verticalAlign: 'top',
        y:0,
        floating: true,
        backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      plotOptions: {
        series: {
          stacking: 'normal'
      }
      },
      series:dataArr
      }
    }
    }
  




















  /*SET PAGINATION**/
  paginate(event) {
    this.page = event["pageIndex"];
    this.getMigrationReport();

  }
  getRecordNumber(index) {
    return (((this.page) * 10)) + (index + 1);
  }

}
