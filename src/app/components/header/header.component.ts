import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from "./signup-request.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {LoginRequestPayload} from "./login-request.payload";
import {BehaviorSubject, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  userId: number;
  user: User = {};

  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
  }

  ngOnInit() {
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    if (this.username != null){
      this.isLoggedIn = true;
    }
    this.getUser(this.username);
  }

  getUser(uname: string) {
    this.authService.getUserByUserName(uname).subscribe(user => {
      this.user = user;
    });
  }


}
