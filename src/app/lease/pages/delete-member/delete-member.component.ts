import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';
import { MembersComponent } from '../members/members.component';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.sass']
})
export class DeleteMemberComponent implements OnInit {
  utilityForm: FormGroup;
   isloading: boolean = false
 
   subscription: Subscription
 
   constructor(
     public dialogRef: MatDialogRef<MembersComponent>,
     @Inject(MAT_DIALOG_DATA) private data :any,
     private snackbar: SnackbarService,
     private utilitiesService: LeaseService,
   ) { }
 
   ngOnInit(): void {
     this.utilityForm = this.data.utilityForm;
     console.log("this"+this.data.customer.id)
   }
 
   onDelete(){
    this.subscription = this.utilitiesService.deleteMember(this.data.customer.id)
     .subscribe((res)=> {
       this.isloading = true;
       this.snackbar.showNotification("snackbar-success", "Successful!");
       this.dialogRef.close();
     },
     (err)=> {
       this.isloading = false;
       this.snackbar.showNotification("snackbar-danger", err);
       this.dialogRef.close();
     })
   }
 
   onCancel(){
     this.dialogRef.close()
   }

}
