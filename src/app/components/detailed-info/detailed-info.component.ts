import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {CarDetailService} from '../../service/detailed-info/car-detail.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.css']
})
export class DetailedInfoComponent implements OnInit {

  thisVehicle: Vehicle = {};
  vehicleId = -1;
  minDate: Date;
  minDateStr: string;

  constructor(private carDetailService: CarDetailService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.minDate = new Date();
    this.minDateStr = this.minDate.toISOString().split('T')[0];
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

  checkOut(vehicleId) {
    // @ts-ignore
    var startDate = new Date(document.getElementById("startDate").value);
    // @ts-ignore
    var endDate = new Date(document.getElementById("endDate").value);
    var rentDate = (endDate.getTime() - startDate.getTime()) / (1000*3600*24);
    this.router.navigate(['checkout'], {queryParams: {totalDate: rentDate, vehicleId: vehicleId}});
  }

}
