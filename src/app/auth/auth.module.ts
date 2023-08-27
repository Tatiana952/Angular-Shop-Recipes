import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [BrowserModule, FormsModule, AuthRoutingModule, SharedModule ],
})
export class AuthModule {}
