import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddMeterComponent } from '../add-meter/add-meter.component';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.sass']
})
export class EditMeterComponent implements OnInit {

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  dialogData: any;
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, public dialog: MatDialog, 
 private tenants:TenantService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<AddMeterComponent>,
  @Inject(MAT_DIALOG_DATA) private data :any
    ) { }

  ngOnInit(): void {
    this.amenityForm=this.amenityDetails()
    
     this.amenityForm.valueChanges.subscribe(values => {
      
    });
    }
amenityDetails(): FormGroup {
    return this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      meterNumber: [this.data.customer.meterNumber, [Validators.required]],
      size: [this.data.customer.size, [Validators.required]],
      description: [this.data.customer.description, [Validators.required]],
      
    });
    
  }


   // Method to update amenity
    editAmenity() {
    this.loading = true;
    
    const body = {
      
    }
    this.tenants.editMeter(this.amenityForm.value.id,this.amenityForm.value, ).subscribe(
      (res) => {
        
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Meter information updated successfully!');
        this.amenityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }
  clearForm() {
    this.amenityForm.reset();
  }

}
