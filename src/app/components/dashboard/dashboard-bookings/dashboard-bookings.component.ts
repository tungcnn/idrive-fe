import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../../service/location/location.service';
import {VehicleService} from '../../../service/vehicle/vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import {OrderDetailService} from '../../../service/order-detail.service';
import {OrderDetail} from '../../../model/order-detail';

@Component({
  selector: 'app-dashboard-bookings',
  templateUrl: './dashboard-bookings.component.html',
  styleUrls: ['./dashboard-bookings.component.css']
})
export class DashboardBookingsComponent implements OnInit {

  orderDetail:OrderDetail[] = [];

  constructor(private activatedRoute: ActivatedRoute , private order:OrderDetailService) {
        this.order.History(2).subscribe(data=>{
          this.orderDetail = data
          console.log(data)
        })
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {

      }
    });
  }


  searchByDate(date) {
    this.order.findByDate(date).subscribe(data =>{
     this.orderDetail = data
    });
  }

}
