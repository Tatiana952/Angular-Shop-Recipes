import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private wasInside = false;
  @HostBinding('class.open') isOpened: boolean = false;

  @HostListener('click') openClose() {
    this.isOpened = !this.isOpened;
    this.wasInside = true;
  }

  @HostListener('document:click') clickout() {
    if (!this.wasInside) {
      this.isOpened = false;
    }
    this.wasInside = false;
  }
}
