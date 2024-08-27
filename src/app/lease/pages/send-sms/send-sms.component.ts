import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';
import { MemberLookupComponent } from '../member-lookup/member-lookup.component';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.sass']
})
export class SendSmsComponent implements OnInit {
  divcss = true;
  amenityForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private lease: LeaseService,
    private snackbar: SnackbarService 
  ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      to: [null, Validators.required],
      message: [null, Validators.required],
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
      this.snackbar.showNotification("snackbar-danger", "Please fill all required fields.");
      return;
    }

    const formValues = this.amenityForm.value;
    const to = formValues.to;
    const message = formValues.message;

    this.loading = true;
    this.lease.sendSms(to, message).subscribe(
      res => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-success", "Message sent successfully.");
        this.amenityForm.reset();
        localStorage.removeItem('formData'); // Optional: Clear saved form data after successful submission
      },
      err => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", "Failed to send the message.");
      }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      row: ''
    };

    const dialogRef = this.dialog.open(MemberLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (value: any) => {
        if (value && value.data) {
          const selectedPhoneNumber = value.data.phoneNumber;
          this.amenityForm.get('to')?.setValue(selectedPhoneNumber);
          console.log("The selected phone number:", selectedPhoneNumber);
        } else {
          console.error('Expected data but received:', value);
        }
      },
      error: (err) => {
        console.error('Error while closing dialog:', err);
      }
    });
  }

  clearForm() {
    this.amenityForm.reset();
  }
}
