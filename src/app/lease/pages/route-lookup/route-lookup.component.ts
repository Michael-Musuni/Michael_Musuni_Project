import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddMeterComponent } from 'src/app/tenants/pages/add-meter/add-meter.component';
import { TenantService } from 'src/app/tenants/tenants.service';
import { AddRoutesComponent } from '../add-routes/add-routes.component';
import { LeaseService } from '../../service/lease.service';
import { RoutesComponent } from '../routes/routes.component';

@Component({
  selector: 'app-route-lookup',
  templateUrl: './route-lookup.component.html',
  styleUrls: ['./route-lookup.component.sass']
})
export class RouteLookupComponent implements OnInit {

  loading:Boolean
  isdata: Boolean;
  subscription!: Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["routeName", "meterNumber", "description", ]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(
    // public dialogRef: MatDialogRef<AddRoutesComponent>,
    // @Inject(MAT_DIALOG_DATA) public data,
    private propertyService: LeaseService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<RoutesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getProperties()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data });
  }

  getProperties() {
    this.loading = true;
    this.subscription = this.propertyService.getRoutes().subscribe(
      (res) => {
        this.data = res
        if (this.data.length > 0) {
          this.loading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.loading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );

  }
}
