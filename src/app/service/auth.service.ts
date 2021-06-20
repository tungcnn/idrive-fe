import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../components/header/signup-request.payload";
import {Observable, throwError} from "rxjs";
import {environment} from '../../environments/environment';
import {LoginRequestPayload} from "../components/header/login-request.payload";
import {LoginResponse} from "../components/header/login-response.payload";
import {map} from "rxjs/operators";
import {User} from "../model/user";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() userId: EventEmitter<number> = new EventEmitter();

  constructor(private httpClient: HttpClient) {

  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${API_URL}/auth/signup`, signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${API_URL}/auth/login`,
      loginRequestPayload).pipe(map(data => {
      window.localStorage.setItem('username', data.username)
      window.localStorage.setItem('userId', data.userId.toString());
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.userId.emit(data.userId);
      return true;
    }));
  }

  getUserName() {
    return window.localStorage.getItem('username');
  }

  getUserId() {
    return parseInt(window.localStorage.getItem('userId')) ;
  }

  isLoggedIn(){
    let username: string =  this.getUserName();
    return username != null;
  }

  logout() {
    this.httpClient.post(`${API_URL}/auth/logout`, null).subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('username')
  }

  getUserByUserName(username: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users/${username}`);
  }
}
