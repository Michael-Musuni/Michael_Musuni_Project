import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.sass']
})
export class MeterComponent implements OnInit {

 

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  data:any
  dialogData: any;
  units: any;
constructor(
  private formBuilder: FormBuilder, public dialog: MatDialog, 
 private tenants:TenantService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<MeterComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      meterNumber: [null, Validators.required],
      size: [null, Validators.required],
    
      description: [null],
      
     
    });
   
  
  }

   addAmenity() {
      console.log(this.amenityForm.value)
      this.tenants.addMeter(this.amenityForm.value).subscribe(
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
   pickProperty() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '50%';
  //   dialogConfig.data = {
  //     user: '',
  //   };
  //   const dialogRef = this.dialog.open(
  //     PropertyLookupComponent,
  //     dialogConfig
  //   );
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.dialogData = result;
  //     this.amenityForm.patchValue({
       
  //       propertyId: this.dialogData.data.id,
  //       propertyName: this.dialogData.data.propertyName,
       

  //     });
     

  //   });

  // }
  // getUnitsPerProperty(arg0: string, id: any): any {
  //   throw new Error('Method not implemented.');
  // }
  // getChargesPerProperty(id: any) {
  //   throw new Error('Method not implemented.');
  }
 

  // Method to delete amenity
  deleteAmenity(amenity: any) {
    const index = this.submittedAmenities.indexOf(amenity);
    if (index !== -1) {
      this.submittedAmenities.splice(index, 1);
    }
  }

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }

}
