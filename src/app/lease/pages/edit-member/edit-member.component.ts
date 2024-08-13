import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.sass']
})
export class EditMemberComponent implements OnInit {

  waterOptions = [
    { id: 1, label: 'Kanjo' },
    { id: 2, label: 'Freshwater' },
    { id: 3, label: 'Dam' },
    { id: 4, label: 'Borehole' }
  ];
  amenityForm: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private lease: LeaseService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditMemberComponent>
  ) { }

  ngOnInit(): void {
    this.amenityForm = this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      firstName: [this.data.customer.firstName, [Validators.required]],
      secondName: [this.data.customer.secondName, [Validators.required]],
      previousWaterReading: [this.data.customer.previousWaterReading, [Validators.required]],
      route: [this.data.customer.route, [Validators.required]],
      email: [this.data.customer.email, [Validators.required]],
      phoneNumber: [this.data.customer.phoneNumber, [Validators.required]],
      memberNumber: [this.data.customer.memberNumber, [Validators.required]],
      meterNumber: [this.data.customer.meterNumber, [Validators.required]],
      water: [this.data.customer.water ? this.data.customer.water.id : '', [Validators.required]] // Set water ID if available
    });
  }

  editAmenity() {
    if (this.amenityForm.invalid) {
      return;
    }

    const updatedMemberData = {
      ...this.amenityForm.value,
      water: { id: this.amenityForm.value.water } // Ensure water ID is properly included
    };

    this.loading = true;
    this.lease.editMember(this.amenityForm.value.id, updatedMemberData).subscribe(
      (res) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Member information updated successfully!');
        this.amenityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }

  onWaterSelection(event: any) {
    console.log("Selected Water ID:", event.value);
  }

  clearForm() {
    this.amenityForm.reset();
  }
}
