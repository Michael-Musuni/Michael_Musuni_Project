import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { BillingService } from '../../billing.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass']
})
export class ExpenseComponent implements OnInit {
  role: any
  data: any
  subscription: Subscription
  isLoading: Boolean
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['route', 'expenseName','vendor','description','amount','actions']
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private billingService: BillingService,
    private dialog: MatDialog,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {

  }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0]
    this.getExpenses()

  }
  applyFilter(event: Event) {


  }
  
  refresh() {

    this.getExpenses()

  }
  addExpenses() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
   
   
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddExpenseComponent, dialogConfig)
  }
  
  getExpenses() {
    
    this.subscription = this.billingService.getExpenses().subscribe(res => {
      this.data = res
      console.log(this.data)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  selectProperty() {
    this.router.navigate(['/property/main']);
  }

  viewExpenses(row: any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "800px";
    // dialogConfig.data = {
    //   row,
    // };
    // const dialogRef = this.dialog.open(ViewExpensesComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((result) => {
    // });
  }
  editExpense(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      customer: row
    }
    this.dialog.open(EditExpenseComponent, dialogConfig)
  }

  deleteExpense(row){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "500px"
    // dialogConfig.data = {
    //   row: row
    // }
    // this.dialog.open(DeleteExpensesComponent, dialogConfig)
  }

}
