import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop';
  loadedVar: any;
  constructor(private authServ: AuthServiceService) {}
  ngOnInit(): void {
    this.authServ.autoLogin();
  }
  ngOnDestroy(): void {}
  onNavigate(variant: string) {
    this.loadedVar = variant;
  }
}
