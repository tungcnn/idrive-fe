import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from "../header/signup-request.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
    })
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.fullName = this.signupForm.get('fullName').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(
        data => {
          this.router.navigateByUrl('sign-in');
          this.toastr.success('Registration Successful!')
        },
        error => {
          this.toastr.error('Registration Failed! Please try again');
        }
      )
  }

}
