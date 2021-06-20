import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../model/vehicle';
import {VehicleService} from '../../service/vehicle/vehicle.service';
import {OrderDetailService} from '../../service/order-detail.service';
import {OrderDetail} from '../../model/order-detail';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  lengthOfRental: number = -1;
  vehicleId: number = -1;
  vehicleToCheckout: Vehicle = {};
  startDate;
  endDate;

  constructor(private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private router: Router,
              private orderDetailService: OrderDetailService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.lengthOfRental = +params.totalDate;
      this.vehicleId = +params.vehicleId;
      this.getVehicleById(this.vehicleId);
      this.startDate = params.startDate;
      this.endDate = params.endDate;
    })
  }

  checkOut() {
    this.router.navigate(['booking-confirmation']);
  }

  getVehicleById(id) {
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
    })
  }

  async saveOrderDetails() {
    let orderDetail: OrderDetail = {};
    this.vehicleService.findById(this.vehicleId).subscribe(v => {
      this.vehicleToCheckout = v;
      orderDetail.vehicle = this.vehicleToCheckout;
      orderDetail.totalPrice = this.lengthOfRental * this.vehicleToCheckout.price;
      orderDetail.startTime = this.startDate;
      orderDetail.endTime = this.endDate;
      orderDetail.own = this.vehicleToCheckout.owner;
      orderDetail.renter.userId = 1;
      this.orderDetailService.save(orderDetail);
    })
  }


}
