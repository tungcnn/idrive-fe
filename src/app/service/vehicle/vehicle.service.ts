import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../../model/vehicle';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${apiUrl}/vehicles`);
  }

  public findById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${apiUrl}/vehicles/${id}`);
  }

  public add(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${apiUrl}/vehicles`, vehicle);
  }

  public edit(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${apiUrl}/vehicles`, vehicle);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/vehicles/${id}`);
  }

  public getAllByUser(id: number, pageNo: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${apiUrl}/vehicles/owner/${id}/${pageNo}`);
  }
}
