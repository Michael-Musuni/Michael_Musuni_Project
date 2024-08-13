import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../../tenants.service';
import { AddwaterComponent } from '../addwater/addwater.component';
import { MemberLookupComponent } from 'src/app/lease/pages/member-lookup/member-lookup.component';

@Component({
  selector: 'app-manual-meter-readings',
  templateUrl: './manual-meter-readings.component.html',
  styleUrls: ['./manual-meter-readings.component.sass']
})
export class ManualMeterReadingsComponent implements OnInit {

 
  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  // waterOptions = [
  //   { id: 1, label: 'Kanjo' },
  //   { id: 2, label: 'Freshwater' },
  //   { id: 3, label: 'Dam' },
  //   { id: 4, label: 'Borehole' }
  // ];
  dialogData: any;
  units: any;
  waterBillId: any;
  memberNumber:String;
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
   
     
    console.log(this.amenityForm.value)
     
 
  }
  amenityDetails(): FormGroup {
    return this.fb.group({
    
    
      // water: ['', Validators.required],
      memberNumber: [ '', Validators.required],
      currentReadings: [ '', Validators.required],
      
      
    });

    
    
  }

 
  
   addAmenity() {
     
      this.tenants.manualMeter(this.amenityForm.value.memberNumber,this.amenityForm.value.currentReadings).subscribe(
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
  onWaterSelection(event: any) {
    // Handle the selection change if needed
    console.log("Selected Water ID:", event.value);
  }

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }
  openMembersDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      row: ""
    };
    const dialogRef = this.dialog.open(MemberLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next:(value:any)=> {
        console.log("rtyuhjjjj"+value.data)
        this.amenityForm.get('memberNumber').setValue(value.data.memberNumber)
      
      },
    })
  }
}
