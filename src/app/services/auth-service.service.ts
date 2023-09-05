import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface AuthResponseData {
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
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private tokenExpirationTime: any;

  public user = new BehaviorSubject<User>(null);

  /**
   * Метод отправки данных на сервер firebase для регистрации нового пользователя.
   * @param email Электронная почта нового пользователя
   * @param password Пароль нового пользователя
   * @returns Observable POST запроса с телом ответа типа AuthResponseData
   */
  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
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

  /**
   * Метод отправки данных на сервер firebase для авторизации существующего пользователя.
   * @param email Электронная почта пользователя
   * @param password Пароль пользователя
   * @returns Observable POST запроса с телом ответа типа AuthResponseData
   */
  public login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
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

  /**
   * Метод деавторизации, очищается localStorage с данными пользователя и осуществляется переход на страницу авторизации.
   */
  public logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  /**
   * Метод автоматической авторизации, если время жизни токена пользователя не истекло(берется из localStorage), в ином случае вызывается метод autoLogout()
   * @returns завершение метода, если в localStorage ничего нет.
   */
  public autoLogin() {
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
      this.user.next(loadedUser);
      const expirationDurationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDurationTime);
    }
  }

  /**
   * Метод автоматической деавторизации, через время = expirationTime будет вызван метод logout()
   * @param expirationTime время в мс, которое осталось до истечения жизни токена
   */
  private autoLogout(expirationTime: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  /**
   * Метод записи данных о пользователе в localStorage.
   * @param email Электронная почта
   * @param userId Идентификатор пользователя
   * @param token Токен
   * @param expiresIn Время жизни токена в секундах
   */
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Метод передачи текста ошибки подписантам
   * @param errorResponse Ответ от сервера с ошибкой
   * @returns Оbservable, создающее экземпляр ошибки, которая незамедлительно передается потребителю.
   */
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMesssage = 'Возникла ошибка!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMesssage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMesssage = 'Пользователь с такой электронной почтой уже существует';
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        errorMesssage = 'Слабый пароль, он должен содержать минимум 6 символов.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMesssage =
          'Пользователь с такими данными не найден. Этот аккаунт мог быть удален.';
        break;
      case 'INVALID_PASSWORD':
        errorMesssage = 'Введен неверный пароль.';
        break;
      case 'USER_DISABLED':
        errorMesssage = 'Этот пользователь был отключен администратором.';
        break;
    }
    return throwError(() => errorMesssage);
  }
}
