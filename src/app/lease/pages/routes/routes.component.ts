import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { AddRoutesComponent } from '../add-routes/add-routes.component';

import { LeaseService } from '../../service/lease.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.sass']
})
export class RoutesComponent implements OnInit {

  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["routeName","meterNumber","description","actions"]
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
    private dialog:MatDialog,
    private lease:LeaseService
  ) {

  }

  ngOnInit(): void {
    if(this.router.url == '/tenants/manage') this.divcss=true

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
    this.dialog.open(AddRoutesComponent, dialogConfig)
  }
  editCall(data: any){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "60%"
    // dialogConfig.data = {
    //   customer: data
    // }

    // console.log("passed data", data)
    // const dialogRef=this.dialog.open(EditMeterComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
    //   this.fetchAmenities()
    // })
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
  
    this.subscription = this.lease.getRoutes().subscribe({
      next: (res) => {
        this.data = res;
  
       
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching amenities:', err);
        this.isLoading = false;
      }
    });
  }
  
}
