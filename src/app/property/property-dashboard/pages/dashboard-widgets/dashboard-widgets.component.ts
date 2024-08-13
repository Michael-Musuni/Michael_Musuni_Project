import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.scss']
})
export class DashboardWidgetsComponent implements OnInit {
  subscription: Subscription
  data: any
  name: string
  loading: boolean=false
  loaded:boolean=false

  totalMembers=0
  totalMetres=0
  waterUnits=0
  unpaidInvoices=0
  constructor(
              private router:Router, private service:AuthService
  ) { }



  ngOnInit(): void {
    this.name="something"
    this.fetchDashboardData()
    this.fetchvacantunitsData
  }
  fetchDashboardData() {

    this.subscription = this.service.getWidgetsdata().subscribe(res => {
      this.data = res
      this.loaded = true; 

      console.log("mydashboardwidgetsdata",this.data)
      this.totalMembers=this.data.totalMembers
      this.totalMetres=this.data.totalMetres
      this.waterUnits=this.data.waterUnits
      this.unpaidInvoices=this.data.unpaidInvoices
    })
  };
  fetchvacantunitsData() {

    this.subscription = this.service.getvacantunitsdata().subscribe(res => {
      this.data = res
      this.loaded = true; 

      console.log("myvacantunitsdata",this.data)
      this.waterUnits=this.data.waterUnits
      
    })
  };
  selectInvoice() {
    this.router.navigate(['dashboard/invoices']);
  }
}
