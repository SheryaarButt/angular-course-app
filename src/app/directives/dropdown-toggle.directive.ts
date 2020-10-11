import {Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewContainerRef} from '@angular/core';


@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective {
  @HostBinding('class.open') isShowDropdown = false;
  constructor(private elRef: ElementRef){ }
  @HostListener('document:click', ['$event']) toggleShowDropdown(event: Event): void {
    this.isShowDropdown = this.elRef.nativeElement.contains(event.target) ? !this.isShowDropdown : false;
  }
}
