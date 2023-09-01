import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop';
  loadedVar: any;
  constructor(
    private authServ: AuthServiceService,
    // private LoggingService: LoggingService
  ) {}
  ngOnInit(): void {
    this.authServ.autoLogin();
    // this.LoggingService.printLog('hello from AppComp ngOnInit!')
  }
  ngOnDestroy(): void {}
  onNavigate(variant: string) {
    this.loadedVar = variant;
  }
}
