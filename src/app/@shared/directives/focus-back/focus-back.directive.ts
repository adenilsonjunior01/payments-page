import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusBack]',
  standalone: true,
})
export class FocusBackDirective implements OnInit, OnDestroy {

  private lastFocusedElement: Element;

  public ngOnInit(): void {
    this.lastFocusedElement = document.activeElement;
  }

  public ngOnDestroy(): void {
    if (this.lastFocusedElement) {
      console.log(this.lastFocusedElement);
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }
}
