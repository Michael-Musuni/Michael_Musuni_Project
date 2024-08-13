import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainbillingComponent } from './pages/mainbilling/mainbilling.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';


const routes: Routes = [
  {
    path:"main",
    component:MainbillingComponent
  },
  // {
  //   path:"rents",
  //   component:RentsComponent
  // },
  {
    path:"invoices",
    component:InvoicesComponent
  },

  // {
  //   path:"expenses",
  //   component:ExpensesComponent
  // },

  // { 
  //   path: 'tenants/manage', component: TenantManagementComponent 
  // },
  // { 
  //   path: 'property/main', component: PropertyManagementComponent
  // },
  // { 
  //   path: 'tenants/details', component: PropertyManagementComponent
  // },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
