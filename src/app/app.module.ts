import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { DetailedInfoComponent } from './components/detailed-info/detailed-info.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DashboardBookingsComponent } from './components/dashboard/dashboard-bookings/dashboard-bookings.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AddVehicleComponent } from './components/vehicle/add-vehicle/add-vehicle.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { VehicleListComponent } from './components/vehicle/vehicle-list/vehicle-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    BannerComponent,
    DetailedInfoComponent,
    SearchResultComponent,
    DashboardMenuComponent,
    DashboardComponent,
    AddVehicleComponent,
    VehicleListComponent,
    DashboardBookingsComponent,
    AddVehicleComponent,
    CheckoutComponent,
    SigninComponent,
    SignupComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
