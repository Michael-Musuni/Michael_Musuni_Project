import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { EditReadmeterComponent } from '../edit-readmeter/edit-readmeter.component';
import { TenantService } from '../../tenants.service';
import { ManualMeterReadingsComponent } from '../manual-meter-readings/manual-meter-readings.component';
import { Router } from '@angular/router';
import { MeterReadingsReportComponent } from 'src/app/lease/pages/meter-readings-report/meter-readings-report.component';

@Component({
  selector: 'app-meter-read',
  templateUrl: './meter-read.component.html',
  styleUrls: ['./meter-read.component.sass']
})
export class MeterReadComponent implements OnInit {

  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["memberName","memberNumber","currentReadings","totalUnits","totalCost","uploadDate","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  role: Role;
  divcss= false
  constructor(
     private tenants:TenantService,
    private dialog:MatDialog,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    

    this.fetchAmenities()
   

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.fetchAmenities()

  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      test: ""
    }
     this.dialog.open(ManualMeterReadingsComponent, dialogConfig)
  }
  editCall(data: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "50%"
    dialogConfig.data = {
      customer: data
    }

    console.log("passed data", data)
    const dialogRef=this.dialog.open(EditReadmeterComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.fetchAmenities()
    })
  }
  deleteCall(data:any){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "40%"
    // dialogConfig.data = {
    //   customer:data
    // }
    // console.log("passed data", data)
    // const dialogRef=this.dialog.open(DeleteAmenityComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
      
    // })
  }
  fetchAmenities() {
    this.isLoading = true;

    this.subscription = this.tenants.getReads().subscribe({
      next: (res) => {
        this.data = res;

        console.log(this.data.entity[0].members);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching amenities', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Fetching amenities completed');
      }
    });
  }

ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }
  viewRevenueOptions(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { test: "data" }
   

    const dialogRef = this.dialog.open(MeterReadingsReportComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
}
