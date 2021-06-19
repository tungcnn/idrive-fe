import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {

      }
    });
  }

  searchByVehicle(Vehicle) {
    Vehicle.value
  }

  searchByDate(Date) {
    Date.value
  }
}
