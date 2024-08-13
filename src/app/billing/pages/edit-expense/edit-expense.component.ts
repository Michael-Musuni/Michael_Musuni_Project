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
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.sass']
})
export class EditExpenseComponent implements OnInit {
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
    this.expensesForm=this.amenityDetails()
  }

  amenityDetails(): FormGroup{
    return this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      expenseName: [this.data.customer.expenseName, [Validators.required]],
      route: [this.data.customer.route, [Validators.required]],
      dateOccurred: [this.data.customer.dateOccurred, [Validators.required]],
      vendor: [this.data.customer.vendor, [Validators.required]],
      description: [this.data.customer.description, [Validators.required]],
      amount: [this.data.customer.amount, [Validators.required]],
      
    });

  }


 
  pickProperty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: { selectedRoute: this.selectedRoute }
    }
    this.dialog.open(RouteLookupComponent, dialogConfig)


  }


  onSubmit() {

    this.billing.editExpense(this.expensesForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.data=res
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
  closeDialog(): void {
    this.dialogRef.close();
  }

}
