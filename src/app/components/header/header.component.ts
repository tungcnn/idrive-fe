import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from "./signup-request.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {LoginRequestPayload} from "./login-request.payload";
import {BehaviorSubject, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: '',
      fullName: '',
    };
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
    })

    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    )
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.fullName = this.signupForm.get('fullName').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(
        data => {
          this.toastr.success('Registration Successful!')
        },
        error => {
          this.toastr.error('Registration Failed! Please try again');
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
