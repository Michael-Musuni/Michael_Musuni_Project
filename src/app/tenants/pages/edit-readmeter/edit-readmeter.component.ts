import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { TenantService } from '../../tenants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddwaterComponent } from '../addwater/addwater.component';

@Component({
  selector: 'app-edit-readmeter',
  templateUrl: './edit-readmeter.component.html',
  styleUrls: ['./edit-readmeter.component.sass']
})
export class EditReadmeterComponent implements OnInit {

 
  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
 
  dialogData: any;
  units: any;
  waterBillId: any;
  memberId: any;
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
    this.getIds()
     
    console.log(this.amenityForm.value)
     
 
  }
  amenityDetails(): FormGroup {
    return this.fb.group({
      //waterBillId: [this.data.customer.id, [Validators.required]],
      // firstName: [this.data.customer.firstName, [Validators.required]],
      //memberId: [this.data.customer.members.id, [Validators.required]],
      // memberNumber: [this.data.customer.memberNumber, [Validators.required]],
      currentReadings: [this.data.customer.currentReadings, [Validators.required]],
      
      
    });

    
    
  }
  getIds(){
    this.waterBillId= this.data.customer.id 
    this.memberId = this.data.customer.members.id
  }
 
  
   addAmenity() {
      console.log(this.amenityForm.value)
      this.tenants.editMeterReads(this.waterBillId,this.memberId,this.amenityForm.value).subscribe(
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
