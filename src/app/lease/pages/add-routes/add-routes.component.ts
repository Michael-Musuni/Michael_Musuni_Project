import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MetreLookupComponent } from 'src/app/tenants/metre-lookup/metre-lookup.component';
import { MeterComponent } from 'src/app/tenants/pages/meter/meter.component';
import { LeaseService } from '../../service/lease.service';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.sass']
})
export class AddRoutesComponent implements OnInit {

  

 

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  data:any
  dialogData: any;
  units: any;
constructor(
  private formBuilder: FormBuilder, public dialog: MatDialog, 
 private lease:LeaseService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<MeterComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      routeName: [null, Validators.required],
      meterNumber: [null, Validators.required],
      previousRouteRead: [null, ],
      description: [null, ],
     
     
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

  // openMemberDialog(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     row: ""
  //   }
  //   this.dialog.open(MetreLookupComponent, dialogConfig)
  // }
 
 addAmenity(){
  this.lease.addRoute(this.amenityForm.value).subscribe(
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
 openMetreDialog(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = "500px"
  dialogConfig.data = {
    row: ""
  }
  const dialogRef=this.dialog.open(MetreLookupComponent, dialogConfig)
  
   dialogRef.afterClosed().subscribe({
    next:(value:any)=> {
      console.log("rtyuhjjjj"+value.data.meterNumber)
      this.amenityForm.get('meterNumber').setValue(value.data.meterNumber)
    
    },
  })
}

  

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }

}
