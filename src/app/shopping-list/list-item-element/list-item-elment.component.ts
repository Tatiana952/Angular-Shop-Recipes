import { Component, HostBinding, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-item-element',
  template: `<ng-content></ng-content>`,
})
export class ListItemElementComponent {
  @HostBinding('class.focused')
  @Input()
  selected = false;
}
