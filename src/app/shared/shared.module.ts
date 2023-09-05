import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    ShortenPipe,
    SearchByTitlePipe,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    ShortenPipe,
    SearchByTitlePipe,
  ],
})
export class SharedModule {}
