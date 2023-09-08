import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Метод разрешающий или запрещающий доступ к маршруту. Вызывается при попытке попасть на защищенные страницы.
   * @returns Observable<true> - если пользователь авторизован(существует BehaviorSubject<User>) или, если не авторизован, Observable<UrlTree> страницы авторизации.
   */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
