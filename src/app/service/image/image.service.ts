import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../../model/vehicle';
import {Image} from '../../model/image';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  public getAll(id: number): Observable<Image[]> {
    // @ts-ignore
    return this.http.get<Image[]>(`${apiUrl}/images/vehicle/${id}`);
  }

  public findById(id: number): Observable<Image> {
    return this.http.get<Image>(`${apiUrl}/images/${id}`);
  }

  public add(image: Image): Observable<Image> {
    return this.http.post<Image>(`${apiUrl}/images`, image);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/images/${id}`);
  }

  public deletePhotoOfVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/images/vehicle/${id}`);
  }
}
