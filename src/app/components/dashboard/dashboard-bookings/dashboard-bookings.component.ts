import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../../service/location/location.service';
import {VehicleService} from '../../../service/vehicle/vehicle.service';
import {Vehicle} from '../../../model/vehicle';
import {OrderDetailService} from '../../../service/order-detail.service';

@Component({
  selector: 'app-dashboard-bookings',
  templateUrl: './dashboard-bookings.component.html',
  styleUrls: ['./dashboard-bookings.component.css']
})
export class DashboardBookingsComponent implements OnInit {


 users = [
   {
    renter: 'abc',
    vehicleType:'Car',
    startTime: '28/00/00',
    endTime:'29/00/00',
    price:'123',
    owner:'abc',
    phone:'0987654',
    email:'hda@gmail.com'
  },
   {
     renter: 'abc',
     vehicleType:'Car',
     startTime: '28/00/00',
     endTime:'29/00/00',
     price:'123',
     owner:'abc',
     phone:'0987654',
     email:'hda@gmail.com'
   },
   {
     renter: 'abc',
     vehicleType:'Car',
     startTime: '28/00/00',
     endTime:'29/00/00',
     price:'123',
     owner:'abc',
     phone:'0987654',
     email:'hda@gmail.com'
   }
  ];

  constructor(private activatedRoute: ActivatedRoute , private order:OrderDetailService) {
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
      console.log(data)
    });
  }

}
