import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {SearchService} from '../../service/search-car/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  listResults: Vehicle[] = [];
  locationId = -1;
  vehicleTypeId = -1;
  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.locationId = params.q;
      this.vehicleTypeId = params.p;
      this.searchVehicles(this.locationId, this.vehicleTypeId);
    })
  }

  passDetails(vehicleId) {
    this.router.navigate(['car-detail'], {queryParams: {vehicleId: vehicleId}});
  }

  searchVehicles(locationId: number, typeId: number) {
    if (locationId == 0 && typeId == 0) {
      Swal.fire(
        'Empty',
        'You did not choose any filter',
        'error'
      )
      return;
    }
    if (locationId == 0) {
      this.searchService.getVehicleByType(typeId).subscribe(vList => {
        this.listResults = vList;
      });
    } else if (typeId == 0) {
      this.searchService.getVehicleByLocation(locationId).subscribe(vList => {
        this.listResults = vList;
      });
    } else {
      this.searchService.getVehicleByLocationAndType(locationId, typeId).subscribe(vList => {
        this.listResults = vList;
      });
    }
  }

}
