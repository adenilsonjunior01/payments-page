import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCurrency]',
  standalone: true
})
export class CurrencyDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const value = this.el.nativeElement.textContent;
    this.el.nativeElement.textContent = this.formatCurrency(value);
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

}
