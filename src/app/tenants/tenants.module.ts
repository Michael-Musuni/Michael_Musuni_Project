import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsRoutingModule } from './tenants-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';


import { ChartsModule } from 'ng2-charts';
import { AddMeterComponent } from './pages/add-meter/add-meter.component';
import { MeterComponent } from './pages/meter/meter.component';
import { EditMeterComponent } from './pages/edit-meter/edit-meter.component';
import { DeleteMeterComponent } from './pages/delete-meter/delete-meter.component';
import { MainWaterComponent } from './pages/main-water/main-water.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddwaterComponent } from './pages/addwater/addwater.component';
import { MeterReadComponent } from './pages/meter-read/meter-read.component';
import { EditReadmeterComponent } from './pages/edit-readmeter/edit-readmeter.component';
import { AddMajiComponent } from './pages/add-maji/add-maji.component';
import { EditMajiComponent } from './pages/edit-maji/edit-maji.component';
import { MetreLookupComponent } from './metre-lookup/metre-lookup.component';
import { WaterLookupComponent } from './water-lookup/water-lookup.component';
import { ManualMeterReadingsComponent } from './pages/manual-meter-readings/manual-meter-readings.component';





@NgModule({
  declarations: [
    
  
 
  
    AddMeterComponent,
                    MeterComponent,
                    EditMeterComponent,
                    DeleteMeterComponent,
                    MainWaterComponent,
                    AddwaterComponent,
                    MeterReadComponent,
                    EditReadmeterComponent,
                    AddMajiComponent,
                    EditMajiComponent,
                    MetreLookupComponent,
                    WaterLookupComponent,
                    ManualMeterReadingsComponent
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
    MatProgressBarModule,
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
    TenantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    // AsyncPipe,

    ChartsModule,
    MatAutocompleteModule,
    MatSortModule,
    
    

  ],
  providers: [DatePipe  ],
    
})
export class TenantsModule { }