import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../model/vehicle';
import {SearchService} from '../../service/search-car/search.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  listResults: Vehicle[] = [];
  locationName = '';
  typeName = '';
  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.locationName = paramMap.get('locationName');
      this.typeName = paramMap.get('typeName');
      this.searchVehicles(this.locationName, this.typeName);
    });
  }

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
