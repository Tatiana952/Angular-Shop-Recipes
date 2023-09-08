import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';
import { SingleFocusDirective } from './directives/focus.directive';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ShortenPipe,
    SearchByTitlePipe,
    SingleFocusDirective,
    SuccessComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    ShortenPipe,
    SearchByTitlePipe,
    SingleFocusDirective,
    SuccessComponent
  ],
})
export class SharedModule {}
