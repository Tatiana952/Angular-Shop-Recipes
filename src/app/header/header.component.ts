import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean = false;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  /**
   * Вызов метода деавторизации.
   */
  onLogout(): void {
    this.authService.logout();
  }
}
