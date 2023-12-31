import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AuthResponseData,
  AuthService,
} from '../core/auth-service.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
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
  private closeSubscription: Subscription = null;
  public isLoginMode = true;
  public isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  /**
   * Переключает режим. Авторизация <=> Регистрация.
   */
  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Передает данные из формы на сервер для авторизации/регистрации.
   * @param authForm Форма с реквизитами для входа
   * @returns Завершение метода, если форма заполнена некорректно
   */
  public onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.showErrorAlertComponent(errorMessage);
        this.isLoading = false;
      },
    });
    authForm.reset();
  }

  /**
   * Создает AlertComponent c текстом конкретной ошибки авторизации.
   * @param errorMessage Текст описания ошибки
   */
  private showErrorAlertComponent(errorMessage: string) {
    const alertComp = this.viewContainerRef;
    alertComp.clear();
    const compRef = alertComp.createComponent(AlertComponent);
    compRef.instance.message = errorMessage;
    this.closeSubscription = compRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      alertComp.clear();
    });
  }
}
