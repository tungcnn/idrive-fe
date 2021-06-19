import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {CarDetailService} from '../../service/detailed-info/car-detail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.css']
})
export class DetailedInfoComponent implements OnInit {

  thisVehicle: Vehicle = {};
  vehicleId = -1;

  constructor(private carDetailService: CarDetailService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vehicleId = params.vehicleId;
      this.getVehicleById(this.vehicleId);
    })
  }

  getVehicleById(id: number) {
    this.carDetailService.getVehicleById(id).subscribe(v => {
      this.thisVehicle = v;
      console.log(this.thisVehicle);
    });
  }

}
