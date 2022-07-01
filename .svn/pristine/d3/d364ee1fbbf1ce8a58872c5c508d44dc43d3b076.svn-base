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
  pieChartOptions: Highcharts.Options
  columnChartOptions: Highcharts.Options;

  Highcharts: typeof Highcharts = Highcharts;


  constructor(private collectionDbService: CollectionDbService) { }

  ngOnInit(): void {
    this.initChartData();
  }
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

  /**MAKER UPPERCASE**/
  capitalize(str) {
    return `${str?.toString()[0].toUpperCase()}${str?.toString().substr(1)}`
  }



}
