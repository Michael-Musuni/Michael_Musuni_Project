import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';
import { ManualMeterReadingsComponent } from 'src/app/tenants/pages/manual-meter-readings/manual-meter-readings.component';

@Component({
  selector: 'app-member-lookup',
  templateUrl: './member-lookup.component.html',
  styleUrls: ['./member-lookup.component.sass']
})
export class MemberLookupComponent implements OnInit {
  loading: boolean = false;
  isdata: boolean = false;
  subscription!: Subscription;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["firstName", "memberNumber", "meterNumber", "phoneNumber"];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild("filter", { static: true }) filter!: ElementRef;

  constructor(
    private propertyService: LeaseService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<ManualMeterReadingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getProperties();
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

  getProperties() {
    this.loading = true;
    this.subscription = this.propertyService.getMembers().subscribe(
      (res: any) => {
        if (res && res.entity) {
          this.dataSource = new MatTableDataSource<any>(res.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isdata = this.dataSource.data.length > 0;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
          this.isdata = false;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }

  onSelectRow(row: any) {
    // Close the dialog with the selected member
    console.log("Selected Member:", row);
    this.dialogRef.close({ data: row });
  }
}
