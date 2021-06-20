import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  constructor(private routerLink:Router, private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  router() {
    this.routerLink.navigate(['/dashboard_bookings'],{queryParams:{q:1}});
  }

  logOut() {
    this.authService.logout();
    this._router.navigateByUrl('');
  }
}
