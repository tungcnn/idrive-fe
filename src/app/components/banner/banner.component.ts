import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../service/location/location.service';
import {VehicleTypeService} from '../../service/vehicle-type/vehicle-type.service';
import {VehicleType} from '../../model/vehicle-type';
import {Location} from '../../model/location';
import {Router} from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  locationList: Location[] = [];
  vehicleTypeList: VehicleType[] = [];

  constructor(private locationService: LocationService,
              private vehicleTypeService: VehicleTypeService,
              private router: Router) { }

  ngOnInit() {
    this.getAllLocations();
    this.getAllVehicleTypes();
  }

  searchVehicles(locationId, vehicleTypeId) {
    this.router.navigate(['search-result'], {queryParams:{q: locationId, p: vehicleTypeId}});
  }

  getAllLocations() {
    this.locationService.getAll().subscribe(data => {
      this.locationList = data;
    });
  }

  getAllVehicleTypes() {
    this.vehicleTypeService.getAll().subscribe(vehicleTypes => {
      this.vehicleTypeList = vehicleTypes;
    });
  }

}
