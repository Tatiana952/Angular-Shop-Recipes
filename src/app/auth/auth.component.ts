import { Component } from '@angular/core';
import { FormGroup, NgForm, UntypedFormBuilder } from '@angular/forms';
import {
  AuthResponceData,
  AuthServiceService,
} from '../services/auth-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private fb: UntypedFormBuilder,
    private authServ: AuthServiceService, private router: Router
  ) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponceData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authServ.login(email, password);
    } else {
      authObs = this.authServ.signUp(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMes) => {
        this.error = errorMes;
        this.isLoading = false;
      }
    );
    authForm.reset();
  }
}
