import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthServiceService) {}

  /**
   * Перехватчик запросов. Перехват происходит только в том случае, если пользователь вошел в систему(существует экземпляр класса User).
   * @param req запрос
   * @param next HttpHandler
   * @returns либо неизмененный запрос, либо модифицированный запрос (с новым параметром {'auth': токен пользователя})
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authServ.userSubj.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifReq);
      })
    );
  }
}
