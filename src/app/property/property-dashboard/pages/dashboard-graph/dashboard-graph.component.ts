import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexXAxis, ApexPlotOptions, ApexGrid, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  areachartOptions: Partial<ChartOptions>;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  responsive: ApexResponsive[];
};

export type PieChartOptions = {
  series: number[];
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

export type donutchartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type chart2Options = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.sass']
})
export class DashboardGraphComponent implements OnInit {
  piechartbOptions: Partial<ChartOptions>;
  propertyName: any;
  areachartOptions: Partial<ChartOptions>;
  name: string;
  subscription: any;
  data: any;
  loading: boolean;
  loaded: boolean;
  chargesArray: any;
  // fb: any;
  // Propertyform: any;
  tenantData: any;
  dialogData: any;
  units: any;
  Propertyform: FormGroup;




  initializeForm() {
    this.chargesArray = this.fb.array([]);
    // this.getChargesPerProperty(this.dialogData.data.id);


    this.Propertyform = this.fb.group({
      propertyId: [''],
      propertyName: [''],


    });
  }

  
  getUnitsPerProperty(arg0: string, id: any): any {
    throw new Error('Method not implemented.');
  }
  getChargesPerProperty(id: any) {
    throw new Error('Method not implemented.');
  }

  @ViewChild("chart") chart: ChartComponent;
  public areaChartOptions: Partial<ChartOptions>;
  public area2ChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;
  public piechartOptions: any;
  public pieOptions: any;
  


  constructor(private dialog: MatDialog, private service: AuthService, private fb: FormBuilder) {this.initializeForm(); }
  ngOnInit(): void {
    this.name = "something"
    this.waterUsage()
    this.fetchRevenueFromPropertiesData()
    this.getRevenuePieChartData()
    this.getRevenue()
    
  }

  fetchRevenueFromPropertiesData() {
    this.subscription = this.service.getRevenueFromPropertiesData().subscribe(
      (res: any) => {
        this.data = res;
        console.log("RevenuefromPropertiesData: ", this.data);

        // Updating area chart options with received data
        this.areaChartOptions = {
          series: [{
            name: "Total Income",
            data: this.data.values
          }],
          chart: {
            height: 350,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            categories: this.data.labels
          }
        };


      },

    );
  }
  waterUsage() {
    this.subscription = this.service.getWaterUsage().subscribe(
      (res: any) => {
        this.data = res;
        console.log("RevenuefromPropertiesData: ", this.data);

        // Updating area chart options with received data
        this.area2ChartOptions = {
          series: [{
            name: "Water Usage",
            data: this.data.values
          }],
          chart: {
            height: 350,
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            categories: this.data.labels
          }
        };


      },

    );
  }
  getRevenuePieChartData() {
    this.subscription = this.service.getRevenuePieChartData().subscribe(
      res => {
        this.data = res

        console.log("myrevenuedata", this.data)
        this.loading = false;
        this.piechartOptions = {
          series: this.data.values,
          chart: {
            width: 500,
            type: "pie"
          },
          labels: this.data.labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

      },)

  }
  getRevenue() {
    this.subscription = this.service.getRevenue().subscribe(
      res => {
        this.data = res;

        this.loading = false;
        this.pieOptions = {
          series: this.data.values,
          chart: {
            width: 500,
            type: "pie"
          },
          labels: this.data.labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      },
      error => {
        console.error('Error fetching revenue data', error);
        this.loading = false;
      }
    );
  }



 


}