import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from '../../service/vehicle/vehicle.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  lengthOfRental: number = -1;
  vehicleId: number = -1;
  vehicleToCheckout: Vehicle = {};

  constructor(private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.lengthOfRental = +params.totalDate;
      this.vehicleId = +params.vehicleId;
      this.getVehicleById(this.vehicleId);
    })
  }

  checkOut() {
    this.router.navigate(['booking-confirmation']);
  }

  getVehicleById(id) {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
      console.log(this.vehicleToCheckout);
    })
  }

}
