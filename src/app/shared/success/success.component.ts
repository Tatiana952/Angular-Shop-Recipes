import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent {
  @Input() message: string;
}
