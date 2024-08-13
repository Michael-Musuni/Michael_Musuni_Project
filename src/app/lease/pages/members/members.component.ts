import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';

import { EditMemberComponent } from '../edit-member/edit-member.component';
import { AddWaterComponent } from '../add-member/add-water.component';
import { LeaseService } from '../../service/lease.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddExcelComponent } from '../add-excel/add-excel.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {
  data:any
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['firstName', 'phoneNumber', 'memberNumber','meterNumber',  'route', 'actions'];
  isLoading: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dialogRef: any;
  divcss= false
  constructor(
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private lease:LeaseService,
    
  ) {}

  ngOnInit(): void {
    if(this.router.url == '/property/manage') this.divcss=true

    this.getMembers();
  }

  getMembers() {
    this.isLoading = true;
    this.lease.getMembers().subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.dataSource = new MatTableDataSource<any>(response.entity);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.snackbar.showNotification("snackbar-danger", error.message);
        this.isLoading = false;
      }
    });
  }

  refresh() {
    this.getMembers();
  }
  addNew(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height="80%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddWaterComponent, dialogConfig)
  }
  addExcel(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
   
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddExcelComponent, dialogConfig)
  }
  editMember(member:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height="80%"
    dialogConfig.data = {
      customer: member
      
    }
    console.log("passed data", member)
    const dialogRef=this.dialog.open(EditMemberComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getMembers()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteConfirmationDialog(member: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      customer:member
    }
    console.log("passed data", member)
    const dialogRef=this.dialog.open(DeleteMemberComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      
    })
  }

  // selectProperty(row) {
  //   this.router.navigate(['leasing/details',], {queryParams: {id: row.id}});
  //   row.data
  //    console.log("the row passses the id", row.data)
  // }

  showDeleteSuccessNotification(): void {
    // this.snackBar.open('Member deleted successfully', '', {
    //   duration: 3000,
    //   panelClass: ['snackbar-success']
    // });
  }
}
