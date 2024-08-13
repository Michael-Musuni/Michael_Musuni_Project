import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDashboardRoutingModule } from './property-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';

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
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardWidgetsComponent } from './pages/dashboard-widgets/dashboard-widgets.component';
import { DashboardGraphComponent } from './pages/dashboard-graph/dashboard-graph.component';


@NgModule({
  declarations: [
  

  
    DashboardComponent,
             DashboardWidgetsComponent,
             DashboardGraphComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    ComponentsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTabsModule,
    NgApexchartsModule,
    PropertyDashboardRoutingModule
  ]
})
export class PropertyDashboardModule { }
