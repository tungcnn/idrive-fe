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





  constructor(private authService: AuthService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
              private router: Router) {


  }

  ngOnInit() {



  }





}
