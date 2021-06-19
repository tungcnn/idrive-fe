import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {SearchService} from '../../service/search-car/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  listResults: Vehicle[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  searchVehicles(location: string, type: string) {
    if (location == null) {
      this.searchService.getVehicleByType(type).subscribe(vList => {
        this.listResults = vList;
      });
    } else if (type == null) {
      this.searchService.getVehicleByLocation(location).subscribe(vList => {
        this.listResults = vList;
      });
    } else {
      this.searchService.getVehicleByLocationAndType(location, type).subscribe(vList => {
        this.listResults = vList;
      });
    }
  }

}
