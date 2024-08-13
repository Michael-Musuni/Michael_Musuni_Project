import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetreLookupComponent } from 'src/app/tenants/metre-lookup/metre-lookup.component';
import { LeaseService } from '../../service/lease.service';
import { MembersComponent } from '../members/members.component';
import { RouteLookupComponent } from '../route-lookup/route-lookup.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-excel',
  templateUrl: './add-excel.component.html',
  styleUrls: ['./add-excel.component.sass']
})
export class AddExcelComponent implements OnInit {
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
constructor(
  private formBuilder: FormBuilder, public dialog: MatDialog, 
  private lease:LeaseService,
  
  private snackbar: MatSnackBar,
  public dialogRef: MatDialogRef<MembersComponent>,
    ) { }

  ngOnInit(): void { this.amenityForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    secondName: [''],
    email: ['', Validators.required],
    previousWaterReading: [null, Validators.required],
    route: [''],
    phoneNumber: [''],
    memberNumber: [''],
    meterNumber: ['']
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
    const transformedData = {
      ...this.amenityForm.value,
      water: { id: this.amenityForm.value.water }
    };
    
    for(let i=0; i <this.formData.length; i++){
      var data =  {
        "id": this.formData[i].water_id,
        "costPerUnit": 0,
        "reconnectionCharges": 0,
        "standingCharges": "",
        "type": "string"
      }
      this.formData[i].water = data
      delete this.formData[i].water_id
      
    }
    console.log(this.formData)
    // console.log(this.formData[0])
    this.lease.addMember(this.formData).subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
        this.snackbar.open("Members added successful", "Close", { duration: 3000 });
        this.amenityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.open("Operation failed", "Close", { duration: 3000 });
      }
    );
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workBook = XLSX.read(data, { type: 'binary' });
      const jsonData: any = {};
      
      workBook.SheetNames.forEach((sheetName) => {
        jsonData[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
      });
  
      // Check if there's at least one sheet
      if (workBook.SheetNames.length > 0) {
        const firstSheetName = workBook.SheetNames[0];
        console.log("Raw sheet data:", jsonData[firstSheetName]); // Log raw data
  
        const sheetData = jsonData[firstSheetName].map((row: any) => {
          // Log each row to see its structure
          console.log("Raw row data:", row);
          
          return {
            ...row,
            phoneNumber: row.phoneNumber ? String(row.phoneNumber) : null,
            memberNumber: row.memberNumber ? String(row.memberNumber) : null,
            meterNumber: row.meterNumber ? String(row.meterNumber) : null,
            water: row.water ? { id: row.water } : null // Ensure row.water exists
          };
        });
  
        this.formData = sheetData; // Update formData with the parsed and transformed data
        console.log("Transformed sheet data:", sheetData); // Log transformed data
      }
    };
  
    reader.readAsBinaryString(file);
  }
  
    

 

 


  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }


}
