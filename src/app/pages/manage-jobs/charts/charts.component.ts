import { Component, Input, OnInit } from '@angular/core';
import { CollectionDbService } from 'src/app/shared/services/collection-db.service';
import { CommonService } from 'src/app/shared/services/common.service';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public chartData: any = {};

  columnChartOptions: Highcharts.Options;
  pieChartOptions: Highcharts.Options

  clientPieChartOptions: Highcharts.Options
  sourceColumnChartOptions: Highcharts.Options

  jobsPieChartOptions: Highcharts.Options
  jobsColumnChartOptions: Highcharts.Options

  Highcharts: typeof Highcharts = Highcharts;


  constructor(
    private collectionDbService: CollectionDbService,
    private commonService: CommonService) {
    this.commonService.getGraphData().subscribe(res => {
      if (res["clientId"] !== "") {
        this.chartData["type"] = "client";
        let obj = {};
        obj["search"] = res["search"];
        obj["collectionType"] = res["collectionType"];
        obj["clientId"] = res["clientId"];
        obj["activationStatus"] = res["activationStatus"];
        obj["startDate"] = res["dateFrom"];
        obj["endDate"] = res["dateFrom"];
        this.initClientWiseChart(obj);
      } else {
        this.chartData["type"] = "default";
        this.initChartData();
      }
    })
  }

  ngOnInit(): void { }
  /**CHART DATA**/
  defaultPieChartArr: any[] = [];
  defaultColumnChartArr: any[] = []
  initChartData() {
    this.defaultPieChartArr = [];
    this.defaultColumnChartArr = []
    this.collectionDbService.clientWiseCollectionCount().subscribe(res => {
      if (res["status"] == "success") {
        let data = res["clientWiseCollectionCount"];
        data.forEach(item => {
          let obj = {};
          obj["name"] = this.capitalize(item.client_id)
          obj["y"] = item.count;
          this.defaultPieChartArr.push(obj);
        })
        // console.log(this.defaultPieChartArr);
        if (this.defaultPieChartArr.length) {
          this.loadPieChart(this.defaultPieChartArr)
        }

      }
    })
    this.collectionDbService.clientWiseCollectionActiveInactiveCount().subscribe(res => {
      if (res["status"] == "success") {
        let final: any = {}
        let data = res["clientWiseCollectionActiveInactiveCount"];
        let activedata: any = [];
        let inactivedata: any = []
        let clientlist: any = []
        // console.log(data);
        data.forEach(item => {
          activedata.push(item.active);
          inactivedata.push(item.inActive);
          clientlist.push(this.capitalize(item.client_id));
        })
        this.defaultColumnChartArr = [{ name: "Active", color: '#088141', data: activedata }, { name: "InActive", color: '#dd0031', data: inactivedata }]
        final["dataArr"] = this.defaultColumnChartArr;
        final["client"] = clientlist
        // console.log(this.defaultColumnChartArr)
        if (this.defaultColumnChartArr.length) {
          this.loadColumnChart(final)
        }
      }
    })
  }
  /**PEI CHART**/
  loadPieChart(dataArr) {
    this.pieChartOptions = {
      title: {
        text: 'Client wise collection count'
      },
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 40
        },
        style: {
          fontFamily: 'Poppins, Helvetica, sans-serif !important'
        }
      },
      plotOptions: {
        pie: {
          innerSize: 50,
          depth: 40
        }
      },
      series: [{
        name: 'count',
        data: dataArr,
        type: 'pie'
      }]
    }
  }
  /**COLUMN CHART**/
  loadColumnChart(data) {
    console.log(data);
    this.columnChartOptions = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 0,
          viewDistance: 25,
          depth: 40
        },
        style: {
          fontFamily: 'Poppins, Helvetica, sans-serif !important'
        }
      },
      title: {
        text: 'Client wise collection active and inactive count'
      },
      xAxis: {
        categories: data.client,
        labels: {
          skew3d: true,
          style: {
            fontWeight: '700',
            fontSize: '.9rem'
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
          depth: 30,
          dataLabels: {
            enabled: true
          }
        }
      },
      series: data.dataArr
    }
  }

  /**INITIATE CLINT WISE CHART**/
  clientPieChartArr: any[] = [];
  clientColumnChartArr: any = []
  initClientWiseChart(data) {
    this.clientPieChartArr = [];
    this.clientColumnChartArr = []
    this.collectionDbService.collectionEntityStatusCountForClient(data).subscribe(res => {
      if (res["status"] == "success") {
        let data = res["collectionEntityStatusCountForClient"];
        delete data["total"]
        for (let key in data) {
          let obj = {};
          obj["name"] = this.capitalize(key);
          obj["y"] = data[key];
          this.clientPieChartArr.push(obj);
        }
        if (this.clientPieChartArr.length) {
          this.loadClientPieChart(this.clientPieChartArr)
        }
      }
    })
    this.collectionDbService.collectionEntitySourceWiseStatusCountForClient(data).subscribe(
      res => {
        if (res["status"] == "success") {
          let finalData: any = {}
          let resData = res["sourceWiseStatusCount"];
          let sourceList: any = [];
          let pendingdata: any = [];
          let processingdata: any = [];
          let completeddata: any = [];
          let errordata: any = [];
          for (let key in resData) {
            if (key != "") {
              sourceList.push(this.capitalize(key));
              pendingdata.push(resData[key].pending || 0);
              processingdata.push(resData[key].processing || 0);
              completeddata.push(resData[key].completed || 0);
              errordata.push(resData[key].error || 0);
            }
          }
          this.clientColumnChartArr = [
            { name: "Pending", color: "#2786FB", data: pendingdata },
            { name: "Processing", color: "#ffb822", data: processingdata },
            { name: "Completed", color: "#088141", data: completeddata },
            { name: "Error", color: "#DD0031", data: errordata }
          ]
          finalData["source"] = sourceList;
          finalData["chartdataArr"] = this.clientColumnChartArr;
          if (this.clientColumnChartArr.length) {
            this.loadSourceColumnChart(finalData);
          }
        }
      }
    )
  }

  /**CLIENT PEI CHART**/
  loadClientPieChart(data) {
    this.clientPieChartOptions = {
      colors: ['#2786FB', '#FFAF05', '#088141', '#FF2313'],
      title: {
        text: 'Collection entity status count for client'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          innerSize: 40,
          depth: 40,
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 40
        },
        style: {
          fontFamily: 'Poppins, Helvetica, sans-serif !important'
        }
      },
      series: [{
        name: 'count',
        data: data,
        type: 'pie'
      }]
    }
  }

  /**COLUMN CHART**/
  loadSourceColumnChart(dataArr) {
    this.sourceColumnChartOptions = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 0,
          viewDistance: 25,
          depth: 40
        },
        style: {
          fontFamily: 'Poppins, Helvetica, sans-serif !important'
        }
      },
      title: {
        text: 'Collection entity source wise status count for client'
      },
      xAxis: {
        categories: dataArr.source,
        labels: {
          skew3d: true,
          style: {
            fontWeight: '700',
            fontSize: '.9rem'
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
        borderColor: '#f0f0f0',
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
          depth: 30,
          dataLabels: {
            enabled: true
          }
        }
      },
      series: dataArr.chartdataArr
    }
  }


  /**MAKER UPPERCASE**/
  capitalize(str) {
    return `${str?.toString()[0].toUpperCase()}${str?.toString().substr(1)}`
  }



}
