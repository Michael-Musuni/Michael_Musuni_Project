import { Component, Inject, OnInit } from '@angular/core';
import { ExpenseComponent } from '../expense/expense.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MetreLookupComponent } from 'src/app/tenants/metre-lookup/metre-lookup.component';
import { RouteLookupComponent } from 'src/app/lease/pages/route-lookup/route-lookup.component';
import { BillingService } from '../../billing.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.sass']
})
export class AddExpenseComponent implements OnInit {
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
      expenseName: ['', [Validators.required]],

      dateOccurred: ['', ],
      amount: ['', [Validators.required]],
     
      description: ['', [Validators.required]],
      vendor: [''],
      route: [''],
     

     
    });
  }

  openRouteDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: ""
    }
    const dialogRef=this.dialog.open(RouteLookupComponent, dialogConfig)
    
     dialogRef.afterClosed().subscribe({
      next:(value:any)=> {
        console.log("rtyuhjjjj"+value.data.meterNumber)
        this.expensesForm.get('route').setValue(value.data.routeName)
      
      },
    })
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

    this.billing.addExpense(this.expensesForm.value).subscribe(
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
