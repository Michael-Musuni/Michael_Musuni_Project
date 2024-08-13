import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteLookupComponent } from 'src/app/lease/pages/route-lookup/route-lookup.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { BillingService } from '../../billing.service';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-invoice-download',
  templateUrl: './invoice-download.component.html',
  styleUrls: ['./invoice-download.component.sass']
})
export class InvoiceDownloadComponent implements OnInit {
  subscription!: Subscription;
  expensesForm: FormGroup;
  loading: boolean = false;
  submissionStatus: string = '';
  dialogData: any
  selectedValue: any
  units: any;
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  expensesData: any;
  route:""
  selectedRoute: string;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    
private billing:BillingService,
    private router: Router,
    private dialog: MatDialog,
    
    public dialogRef: MatDialogRef<ExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.expensesForm = this.fb.group({
      memberNo: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.expensesForm.valid) {
      this.loading = true;  // Set loading to true when starting the request
      const memberNo = this.expensesForm.value.memberNo;

      this.billing.downloadInvoice(memberNo).subscribe(
        (res) => {
          this.loading = false;
          this.data = res;
          this.snackbar.showNotification("snackbar-success", this.data.message);
          this.expensesForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}