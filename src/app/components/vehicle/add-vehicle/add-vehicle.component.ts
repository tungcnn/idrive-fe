import { Component, OnInit } from '@angular/core';
import {VehicleTypeService} from '../../../service/vehicle-type/vehicle-type.service';
import {VehicleType} from '../../../model/vehicle-type';
import {LocationService} from '../../../service/location/location.service';
import {NgForm} from '@angular/forms';
import {Vehicle} from '../../../model/vehicle';
import {VehicleService} from '../../../service/vehicle/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];
  locations: Location[] = [];
  vehicleForm: Vehicle = {};

  constructor(private vehicleTypeService: VehicleTypeService,
              private locationService: LocationService,
              private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleTypeService.getAll().subscribe(vehicleTypes => {
      this.vehicleTypes = vehicleTypes;
    });
    this.locationService.getAll().subscribe(locations => {
      this.locations = locations
    })
  }

  handleSubmit(addVehicleForm: NgForm) {
    this.vehicleService.add(addVehicleForm.value).subscribe(() => {
      console.log("success");
    }, error => {
      console.log("error")
    })
  }
}
