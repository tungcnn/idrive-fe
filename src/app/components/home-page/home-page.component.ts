import { Component, OnInit,} from '@angular/core';
import {Vehicle} from "../../model/vehicle";
import {VehicleService} from "../../service/vehicle/vehicle.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  listVehicle : Vehicle[]=[];

  constructor(private vehicleService:VehicleService) {this.getAllVehicles(); }

  ngOnInit() {

  }
  getAllVehicles(){
    this.vehicleService.getAll().subscribe(vehicles =>{
      this.listVehicle = vehicles;
      console.log(vehicles)
      console.log(this.listVehicle)
    });
  }
}
