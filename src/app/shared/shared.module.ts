import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { LoggingService } from '../logging.service';
import { ShortenPipe } from './shorten.pipe';
import { SearchByTitlePipe } from './search-by-title.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe,
    SearchByTitlePipe,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe,
    SearchByTitlePipe
  ],
  // providers: [LoggingService],
})
export class SharedModule {}
