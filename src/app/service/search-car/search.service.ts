import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../../model/vehicle';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getVehicleByLocation(locationId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/findByLocation/${locationId}`);
  }

  getVehicleByType(vehicleTypeId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/findByVehicleType/${vehicleTypeId}`);
  }

  getVehicleByLocationAndType(locationId: number, vehicleTypeId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/findByBoth/${locationId}/${vehicleTypeId}`);
  }
}
