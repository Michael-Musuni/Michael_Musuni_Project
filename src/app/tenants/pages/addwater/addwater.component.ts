import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { AmenitiesService } from '../../services/amenities.service';

import { MatTableDataSource } from '@angular/material/table';
// import { AddAmenitiesComponent } from '../add-amenities/add-amenities.component';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { EditAmenityComponent } from '../edit-amenity/edit-amenity.component';
// import { DeleteAmenityComponent } from '../delete-amenity/delete-amenity.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/role';
import { AddMajiComponent } from '../add-maji/add-maji.component';
import { EditMajiComponent } from '../edit-maji/edit-maji.component';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-addwater',
  templateUrl: './addwater.component.html',
  styleUrls: ['./addwater.component.sass']
})
export class AddwaterComponent implements OnInit {
  
  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["type","costPerUnit","standingCharges","reconnectionCharges","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;                                                                                                           xx
  contextMenuPosition = { x: "0px", y: "0px" };
  role: Role;

  constructor(
    private tenants:TenantService,   
    private dialog:MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fetchAddwater()
   

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.fetchAddwater()

  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddMajiComponent, dialogConfig)
  }
  editCall(row: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      customer: row
    }

    console.log("the passesd"+row)
    const dialogRef=this.dialog.open(EditMajiComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.fetchAddwater()
    })
  }
  deleteCall(data:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      customer:data
    }
    console.log("passed data", data)
    // const dialogRef=this.dialog.open(DeleteWaterComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
      
    // })
  }
  fetchAddwater() {
    this.isLoading = true

    this.subscription = this.tenants.getwater().subscribe(res => {
      this.data = res

      console.log(this.data.message)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }

}