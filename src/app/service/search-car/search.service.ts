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

  getVehicleByLocation(location: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/${location}`);
  }

  getVehicleByType(vehicleType: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/${vehicleType}`);
  }

  getVehicleByLocationAndType(location: string, vehicleBrand: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${API_URL}/vehicles/${location}/${vehicleBrand}`);
  }
}
