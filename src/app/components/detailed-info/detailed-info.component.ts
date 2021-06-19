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
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.vehicleId = +paramMap.get('id');
      this.getVehicleById(this.vehicleId);
    });
  }

  ngOnInit() {
  }

  getVehicleById(id: number) {
    this.carDetailService.getVehicleById(id).subscribe(v => {
      this.thisVehicle = v;
    });
  }

}
