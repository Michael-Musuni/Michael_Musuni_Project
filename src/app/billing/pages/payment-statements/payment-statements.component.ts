import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { BillingService } from '../../billing.service';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-payment-statements',
  templateUrl: './payment-statements.component.html',
  styleUrls: ['./payment-statements.component.sass']
})
export class PaymentStatementsComponent implements OnInit {
  subscription!: Subscription;
  expensesForm: FormGroup;
  loading: boolean = false;
  submissionStatus: string = '';
  dialogData: any;
  selectedValue: any;
  units: any;
  idFile: any;
  imageSrc: string;
  id: string | ArrayBuffer;
  expensesData: any;
  route: string = "";
  selectedRoute: string;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private billing: BillingService,
    public dialogRef: MatDialogRef<ExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.expensesForm = this.fb.group({
     
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true; // Start loading
    const { fromDate,  toDate } = this.expensesForm.value;
    const formattedFromDate = this.formatDate(fromDate);
    const formattedToDate = this.formatDate(toDate);

    this.billing. paymentStatement(formattedFromDate,  formattedToDate).subscribe(
      (response: Blob) => {
        this.loading = false; // Stop loading
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'paymentReport.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.snackbar.showNotification("snackbar-success", "Report downloaded successfully.");
        this.expensesForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false; 
        this.snackbar.showNotification("snackbar-danger", "Failed to download report.");
      }
    );
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

