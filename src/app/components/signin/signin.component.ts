import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "../header/login-request.payload";
import {BehaviorSubject, throwError} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    )
  }

  login() {

    if (this.isLoading$.getValue()) {
      return
    }

    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.isLoading$.next(true);
    this.authService.login(this.loginRequestPayload)
      .pipe(finalize(() => {
        this.isLoading$.next(false);
      } ))
      .subscribe(data => {
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      }, error => {
        this.toastr.error('Login Failed. Please check your credentials and try again.')
        throwError(error);
      });
  }

}
