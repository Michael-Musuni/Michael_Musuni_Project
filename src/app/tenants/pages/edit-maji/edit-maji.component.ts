import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddwaterComponent } from '../addwater/addwater.component';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-edit-maji',
  templateUrl: './edit-maji.component.html',
  styleUrls: ['./edit-maji.component.sass']
})
export class EditMajiComponent implements OnInit {

 
  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
 
  dialogData: any;
  units: any;
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, public dialog: MatDialog, 
 private tenants:TenantService,
  private snackbar:SnackbarService,
  @Inject(MAT_DIALOG_DATA) private data :any,
  public dialogRef: MatDialogRef<AddwaterComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm=this.amenityDetails()
     
    
     
 
  }
  amenityDetails(): FormGroup {
    return this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      type: [this.data.customer.type, [Validators.required]],
      costPerUnit: [this.data.customer.costPerUnit, [Validators.required]],
      standingCharges: [this.data.customer.standingCharges, [Validators.required]],
      reconnectionCharges: [this.data.customer.reconnectionCharges, [Validators.required]],
      
    });
    
  }
 
  
   addAmenity() {
      console.log(this.amenityForm.value)
      this.tenants.editMaji(this.amenityForm.value.id,this.amenityForm.value,).subscribe(
        (res) => {
          this.loading = false;
          this.data=res
          this.snackbar.showNotification("snackbar-success", this.data.message);
          this.amenityForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
    
  }
 

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }
}
