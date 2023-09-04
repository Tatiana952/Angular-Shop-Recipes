import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AuthResponceData,
  AuthServiceService,
} from '../services/auth-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import {
  slidingLeftAnimation,
  slidingRightAnimation,
} from '../shared/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [slidingLeftAnimation, slidingRightAnimation],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription = null;

  constructor(
    private authServ: AuthServiceService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ) {}
 
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  isLoginMode = true;
  isLoading = false;
  // private isLoading = new BehaviorSubject<boolean>(false)
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponceData>;

    
    if (this.isLoginMode) {
      authObs = this.authServ.login(email, password);
    } else {
      authObs = this.authServ.signUp(email, password);
    }
    authObs.subscribe({
      next: (resData) => {
        this.router.navigate(['/recipes']);
      },
      error: (errorMes) => {
        this.error = errorMes;
        this.showErrorAlert(errorMes);
        this.isLoading = false;
      },
    });
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMes: string) {
    const alertComp = this.viewContainerRef;
    alertComp.clear();
    const compRef = alertComp.createComponent(AlertComponent);
    // const alertComp = this.viewContainerRef.createComponent(AlertComponent);
    compRef.instance.message = errorMes;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      alertComp.clear();
    });
  }
}
