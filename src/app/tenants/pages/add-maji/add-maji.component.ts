import { Component, OnInit } from '@angular/core';
import { AddwaterComponent } from '../addwater/addwater.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../../tenants.service';

@Component({
  selector: 'app-add-maji',
  templateUrl: './add-maji.component.html',
  styleUrls: ['./add-maji.component.sass']
})
export class AddMajiComponent implements OnInit {

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
  public dialogRef: MatDialogRef<AddMajiComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      type: [null, Validators.required],
      costPerUnit: [null, Validators.required],
    
      standingCharges: [null, Validators.required],
      reconnectionCharges: [null, Validators.required],
    
     
    });
    this.amenityForm.valueChanges.subscribe(values => {
     
    }); 
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
  this.amenityForm.patchValue(JSON.parse(savedFormData));
    }
  this.amenityForm.valueChanges.subscribe(value => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
  }
 
  
  addAmenity() {
      console.log(this.amenityForm.value)
      this.tenants.addWaters(this.amenityForm.value).subscribe(
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
  // }
 

  
  // deleteAmenity(amenity: any) {
  //   const index = this.submittedAmenities.indexOf(amenity);
  //   if (index !== -1) {
  //     this.submittedAmenities.splice(index, 1);
  //   }
  }

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }

}
