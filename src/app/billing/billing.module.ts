
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { BillingRoutingModule } from './billing-routing.module';

import { MatDatepicker } from '@angular/material/datepicker';




import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';


import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CdkColumnDef } from '@angular/cdk/table';
import { MainbillingComponent } from './pages/mainbilling/mainbilling.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { EditExpenseComponent } from './pages/edit-expense/edit-expense.component';
import { MpesaDialogComponent } from './pages/mpesa-dialog/mpesa-dialog.component';
import { InvoiceDownloadComponent } from './pages/invoice-download/invoice-download.component';
import { RevenuesComponent } from './pages/revenues/revenues.component';
import { MemberStatementComponent } from './pages/member-statement/member-statement.component';
import { PaymentStatementsComponent } from './pages/payment-statements/payment-statements.component';
import { RevenuesStatementComponent } from './pages/revenues-statement/revenues-statement.component';
import { UnpaidInvoiceComponent } from './pages/unpaid-invoice/unpaid-invoice.component';


@NgModule({
  declarations: [
   

  
    MainbillingComponent,
              InvoicesComponent,
              RevenueComponent,
              ExpenseComponent,
              AddExpenseComponent,
              EditExpenseComponent,
              MpesaDialogComponent,
              InvoiceDownloadComponent,
              RevenuesComponent,
              MemberStatementComponent,
              PaymentStatementsComponent,
              RevenuesStatementComponent,
              UnpaidInvoiceComponent
  ],
  imports: [
    CommonModule,
    
    SharedModule,
    PerfectScrollbarModule,
    ComponentsModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule,
    MatTableModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
   
    MatSnackBarModule, 
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    BillingRoutingModule,

    
    MatNativeDateModule,
   
    ChartsModule
    
    
  ],
  providers: [CdkColumnDef]
})
export class BillingModule { }
