import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../core/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Перехватчик запросов. Перехват c изменением запроса происходит только в том случае, если пользователь авторизован(существует BehaviorSubject<User>).
   * @param req Исходный запрос
   * @param next HttpHandler
   * @returns Либо неизмененный запрос, либо модифицированный запрос (с новым параметром: {'auth': токен пользователя})
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
