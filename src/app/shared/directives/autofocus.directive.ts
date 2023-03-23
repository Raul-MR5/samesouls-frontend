import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'autofocus',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
