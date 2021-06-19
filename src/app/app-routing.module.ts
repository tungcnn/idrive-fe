import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddVehicleComponent} from './components/vehicle/add-vehicle/add-vehicle.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
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
