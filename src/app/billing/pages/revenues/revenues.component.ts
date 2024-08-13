import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { BillingService } from '../../billing.service';
import { MpesaDialogComponent } from '../mpesa-dialog/mpesa-dialog.component';
import { InvoiceDownloadComponent } from '../invoice-download/invoice-download.component';
import { RevenuesStatementComponent } from '../revenues-statement/revenues-statement.component';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.sass']
})
export class RevenuesComponent implements OnInit {

  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["memberNumber","totalUnits","totalCost","totalDue"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  role: Role;

  constructor(
     private tenants:BillingService,
    private dialog:MatDialog
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
 

 
  fetchAmenities() {
    this.isLoading = true;

    this.subscription = this.tenants.getRevenue().subscribe({
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
   

    const dialogRef = this.dialog.open(RevenuesStatementComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
}

