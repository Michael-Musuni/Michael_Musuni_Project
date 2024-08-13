import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BillingService } from '../../billing.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { MpesaDialogComponent } from '../mpesa-dialog/mpesa-dialog.component';
import { InvoiceDownloadComponent } from '../invoice-download/invoice-download.component';
import { Router } from '@angular/router';
import { UnpaidInvoiceComponent } from '../unpaid-invoice/unpaid-invoice.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  selectedStatus: string = '';
  data: any;
  mpesaForm: FormGroup;
  isLoading: Boolean = false;
  subscription: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ["date", "firstName", "invoiceNumber", "paymentStatus", "totalAmount","actions"];
  divcss
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  
  constructor(
    private tenants: BillingService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.mpesaForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      Amount: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^254\d{9}$/)]]
    });
  }
  onSubmit(menuTrigger: MatMenuTrigger): void {
    if (this.mpesaForm.valid) {
      menuTrigger.closeMenu();
      this.isLoading = true;
      const formData = {
        Amount: this.mpesaForm.value.Amount,
        PhoneNumber: this.mpesaForm.value.PhoneNumber,
        invoiceNumber: this.mpesaForm.value.invoiceNumber
      };

      this.subscription = this.tenants.submitSTK(formData).subscribe({
        next: (res) => {
          
          this.isLoading = false;
        
        },
        error: (err) => {
          this.isLoading = false;
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.router.url === '/billing/invoices') {
      this.divcss = true;
    }
    this.fetchAmenities();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchAmenities() {
    this.isLoading = true;
    this.subscription = this.tenants.getInvoices().subscribe({
      next: (res) => {
        this.data = res;
        this.dataSource.data = this.data.entity;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching invoices', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event?: Event): void {
    const filterValue = (event?.target as HTMLInputElement)?.value.trim().toLowerCase() || this.selectedStatus.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const paymentStatus = data.paymentStatus ? data.paymentStatus.toLowerCase() : '';
      const firstName = data.firstName ? data.firstName.toLowerCase() : '';
      const invoiceNumber = data.invoiceNumber ? data.invoiceNumber.toLowerCase() : '';
  
      const dataStr = `${paymentStatus} ${firstName} ${invoiceNumber}`;
      return dataStr.includes(filter);
    };
  
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilter();
  }

  viewReportOptions() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    dialogConfig.data = { test: "data" };

    const dialogRef = this.dialog.open(InvoiceDownloadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      console.log('Invoice download dialog closed');
    });
  }
  viewUnpaidInvoices() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { test: "data" };

    const dialogRef = this.dialog.open(UnpaidInvoiceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      console.log('Invoice download dialog closed');
    });
  }

  openMpesaDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '80%';
    dialogConfig.data 

    const dialogRef = this.dialog.open(MpesaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit(); // Refresh the data after the dialog is closed
    });
  }
  refresh() {
    this.fetchAmenities()

  }
}
