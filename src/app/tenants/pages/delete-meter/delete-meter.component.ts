import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddMeterComponent } from '../add-meter/add-meter.component';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-delete-meter',
  templateUrl: './delete-meter.component.html',
  styleUrls: ['./delete-meter.component.sass']
})
export class DeleteMeterComponent implements OnInit {

  

  amenityForm: FormGroup;
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<AddMeterComponent>,
    @Inject(MAT_DIALOG_DATA) private data :any,
    private snackbar: SnackbarService,
    private tenant:TenantService
  ) { }

  ngOnInit(): void {
    this.amenityForm = this.data.amenityForm;
  }

  onDelete(){
   
    this.subscription = this.tenant.deleteMeter(this.data.customer.id)
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
