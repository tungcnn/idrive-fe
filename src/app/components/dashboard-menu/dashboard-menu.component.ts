import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  constructor(private routerLink:Router) { }

  ngOnInit() {
  }

  router() {
    this.routerLink.navigate(['/dashboard_bookings'],{queryParams:{q:1}});
  }
}
