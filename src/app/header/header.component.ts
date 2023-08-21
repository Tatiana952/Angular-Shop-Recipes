import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubs: Subscription;
  constructor(
    private dataStor: DataStorageService,
    private authServ: AuthServiceService
  ) {}
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubs = this.authServ.userSubj.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onStoreData() {
    this.dataStor.storeRecipes();
  }

  onFetchData() {
    this.dataStor.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authServ.logout();
  }
}
