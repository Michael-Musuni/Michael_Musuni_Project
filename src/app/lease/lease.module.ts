import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaseRoutingModule } from './lease-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';

import {MatCheckboxModule} from '@angular/material/checkbox';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


import { ChartsModule } from 'ng2-charts';
import { MainMemberComponent } from './pages/main-member/main-member.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RoutesComponent } from './pages/routes/routes.component';
import { AddRoutesComponent } from './pages/add-routes/add-routes.component';
import { MembersComponent } from './pages/members/members.component';
import { DeleteMemberComponent } from './pages/delete-member/delete-member.component';
import { AddWaterComponent } from './pages/add-member/add-water.component';
import { EditMemberComponent } from './pages/edit-member/edit-member.component';
import { RouteLookupComponent } from './pages/route-lookup/route-lookup.component';
import { MeterReadingsReportComponent } from './pages/meter-readings-report/meter-readings-report.component';
import { MemberLookupComponent } from './pages/member-lookup/member-lookup.component';
import { SendSmsComponent } from './pages/send-sms/send-sms.component';


 @NgModule ({
  declarations: [
  
  
    MainMemberComponent,
            RoutesComponent,
            AddRoutesComponent,
            MembersComponent,
            DeleteMemberComponent,
            AddWaterComponent,
            EditMemberComponent,
            RouteLookupComponent,
            MeterReadingsReportComponent,
            MemberLookupComponent,
            SendSmsComponent
  ],

  imports: [
    ComponentsModule,
    CommonModule,
    PerfectScrollbarModule,
    SharedModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTabsModule,
    ChartsModule,

    LeaseRoutingModule,
    ChartsModule,

  ]
})
export class LeaseModule { }
