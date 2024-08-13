import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from '../lease/pages/members/members.component';



const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./property-dashboard/property-dashboard.module").then((m)=>m.PropertyDashboardModule)
  },
  {
    path: "manage",
   component: MembersComponent
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
