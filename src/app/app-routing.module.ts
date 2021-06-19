import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {DetailedInfoComponent} from './components/detailed-info/detailed-info.component';


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
    path: 'search-result/car-detail',
    component: DetailedInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
