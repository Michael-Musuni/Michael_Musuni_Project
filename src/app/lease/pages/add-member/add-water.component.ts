import { Component, OnInit } from '@angular/core';
import { MembersComponent } from '../members/members.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';
import { MetreLookupComponent } from 'src/app/tenants/metre-lookup/metre-lookup.component';
import * as XLSX from 'xlsx';
import { RouteLookupComponent } from '../route-lookup/route-lookup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WaterLookupComponent } from 'src/app/tenants/water-lookup/water-lookup.component';
@Component({
  selector: 'app-add-water',
  templateUrl: './add-water.component.html',
  styleUrls: ['./add-water.component.sass']
})
export class AddWaterComponent implements OnInit {

  

 
row:any;
  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  data:any
  formData:any[]=[];
  dialogData: any;
  units: any;
  route:'';
  memberNumber:'';
  meterNumber:'';
  water:'';
  waterOptions = [
    { id: 1, label: 'Kanjo' },
    { id: 2, label: 'Freshwater' },
    { id: 3, label: 'Dam' },
    { id: 4, label: 'Borehole' }
  ];
constructor(
  private formBuilder: FormBuilder, public dialog: MatDialog, 
  private lease:LeaseService,
  
  private snackbar: MatSnackBar,
  public dialogRef: MatDialogRef<MembersComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: [''],
      email: ['', Validators.required],
      previousWaterReading: [null, Validators.required],
      route: [''],
      phoneNumber: [''],
      memberNumber: [''],
      meterNumber: [''],
      water: [''] // This will hold the water ID
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
    if (this.amenityForm.invalid) {
      return;
    }
  
    const transformedData = {
      ...this.amenityForm.value,
      water: { id: this.amenityForm.value.water }
    };
  
    this.loading = true;
    this.lease.addMembe(transformedData).subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
        this.snackbar.open(res.message, "Close", { duration: 3000 });
        this.amenityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.open("Operation failed", "Close", { duration: 3000 });
      }
    );
  }
  onWaterSelection(event: any) {
    // Handle the selection change if needed
    console.log("Selected Water ID:", event.value);
  }
    
  openMemberDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: ""
    }
    this.dialog.open(MetreLookupComponent, dialogConfig)
  }
  openRouteDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: ""
    }
    const dialogRef=this.dialog.open(RouteLookupComponent, dialogConfig)
    
     dialogRef.afterClosed().subscribe({
      next:(value:any)=> {
        console.log("rtyuhjjjj"+value.data.meterNumber)
        this.amenityForm.get('route').setValue(value.data.routeName)
      
      },
    })
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
        console.log("rtyuhjjjj"+value.data)
        this.amenityForm.get('meterNumber').setValue(value.data.meterNumber)
      
      },
    })
  }
  openWeterDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      row: ""
    }
    const dialogRef=this.dialog.open(WaterLookupComponent, dialogConfig)
    
     dialogRef.afterClosed().subscribe({
      next:(value:any)=> {
        console.log("rtyuhjjjj"+value.data)
        this.amenityForm.get('water').setValue(value.data.type)
      
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
