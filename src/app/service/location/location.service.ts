import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../../model/location';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${apiUrl}/locations`);
  }
}
