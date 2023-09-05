import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop';
  loadedVar: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  ngOnDestroy(): void {}
  onNavigate(variant: string) {
    this.loadedVar = variant;
  }
}
