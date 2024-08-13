import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWaterComponent } from '../tenants/pages/main-water/main-water.component';
import { MainMemberComponent } from './pages/main-member/main-member.component';
import { MeterReadComponent } from '../tenants/pages/meter-read/meter-read.component';


const routes: Routes = [
  {
    path:"lease",
    component:MainMemberComponent
  },
  
  {
    path: "details",
   component: MeterReadComponent
  },
  
  // {
  //   path:"newcontract/:id",//leasing/newcontract
  //   component:LeaseformComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { }
