import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    SharedModule,
    CoreModule,
  ], 
  providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
