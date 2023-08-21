import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[appDropdown]' 
})
export class DropdownDirective {
   @HostBinding('class.open') isOpened: boolean = false

   @HostListener('click') openClose() {
    this.isOpened = !this.isOpened;
   }

}