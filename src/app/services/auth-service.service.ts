import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface AuthResponceData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  error: string;
  constructor(private http: HttpClient, private router: Router) {}
  private tokenExpiratipnTime: any;

  userSubj = new BehaviorSubject<User>(null);

  // userToken: string = null;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponceData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.userSubj.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiratipnTime) {
      clearTimeout(this.tokenExpiratipnTime);
    }
    this.tokenExpiratipnTime = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubj.next(loadedUser);
      const expirDur =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirDur);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpiratipnTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubj.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMes = 'Возникла ошибка!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMes);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMes = 'Пользователь с такой электронной почтой уже существует';
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        errorMes = 'Слабый пароль, он должен содержать минимум 6 символов.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMes =
          'Пользователь с такими данными не найден. Этот аккаунт мог быть удален.';
        break;
      case 'INVALID_PASSWORD':
        errorMes = 'Введен неверный пароль.';
        break;
      case 'USER_DISABLED':
        errorMes = 'Этот пользователь был отключен администратором.';
        break;
    }
    return throwError(() => errorMes);
  }
}
