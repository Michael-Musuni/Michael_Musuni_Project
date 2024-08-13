import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { MeterComponent } from '../meter/meter.component';
import { EditMeterComponent } from '../edit-meter/edit-meter.component';
import { TenantService } from '../../tenants.service';
import { DeleteMeterComponent } from '../delete-meter/delete-meter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.sass']
})
export class AddMeterComponent implements OnInit {

  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["meterNumber","size","status","description","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  role: Role;
divcss
  constructor(
    private router:Router,
     private tenants:TenantService,
    private dialog:MatDialog
  ) {

  }

  ngOnInit(): void {
    if(this.router.url == '/tenants/unit') this.divcss=true
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
    this.dialog.open(MeterComponent, dialogConfig)
  }
  editCall(row: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      customer: row
    }

    console.log("passed data", row)
    const dialogRef=this.dialog.open(EditMeterComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.fetchAmenities()
    })
  }
  deleteCall(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      customer:row
    }
   
    const dialogRef=this.dialog.open(DeleteMeterComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      
    })
  }
  fetchAmenities() {
    this.isLoading = true;
  
    this.subscription = this.tenants.getMeters().subscribe({
      next: (res) => {
        this.data = res;
  
        console.log(this.data.message);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching meters:', err);
        this.isLoading = false;
      }
    });
  }
  

}
