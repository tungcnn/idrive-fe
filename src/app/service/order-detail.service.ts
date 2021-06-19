import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderDetail} from '../model/order-detail';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http:HttpClient) { }

  findByVehicle(id:number):Observable<OrderDetail>{
    return this.http.get<OrderDetail>(`${API_URL}/OrderfindByVehicle/${id}`)
  }
}
