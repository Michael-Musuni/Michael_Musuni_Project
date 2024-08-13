import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeterComponent } from './pages/add-meter/add-meter.component';
import { MainWaterComponent } from './pages/main-water/main-water.component';
import { InvoicesComponent } from '../billing/pages/invoices/invoices.component';
import { MeterReadComponent } from './pages/meter-read/meter-read.component';
import { RoutesComponent } from '../lease/pages/routes/routes.component';
import { MeterComponent } from './pages/meter/meter.component';


const routes: Routes = [
  {
    path: "meter",
   component: MainWaterComponent
  },
  // {
  //   path: "add",
  //  component: AddTenantComponent
  // },
  {
    path: "manage",
   component: RoutesComponent
  },
  {
    path: "unit",
   component: AddMeterComponent
  },
  {
    path: "details",
   component: MeterReadComponent
  },
  // {
  //   path: "bills",
  //  component: InvoicesComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
