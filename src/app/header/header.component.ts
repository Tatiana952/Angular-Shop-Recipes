import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
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
   * Метод деавторизации.
   */
  onLogout() {
    this.authService.logout();
  }
}
