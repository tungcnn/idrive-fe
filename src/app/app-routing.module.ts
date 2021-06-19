import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {DetailedInfoComponent} from './components/detailed-info/detailed-info.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardBookingsComponent} from './components/dashboard/dashboard-bookings/dashboard-bookings.component';
import {AddVehicleComponent} from './components/vehicle/add-vehicle/add-vehicle.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'car-detail',
    component: DetailedInfoComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard_bookings',
    component: DashboardBookingsComponent
  },
  {
    path: 'add-vehicle',
    component: AddVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
