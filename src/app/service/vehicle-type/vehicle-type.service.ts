import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VehicleType} from '../../model/vehicle-type';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${apiUrl}/vehicle-types`);
  }
}
