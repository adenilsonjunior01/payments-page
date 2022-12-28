import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask';
import { ButtonModule } from 'primeng/button';
import { IPayments } from 'src/app/@models/interfaces/payments.interface';
import { CY_SELECTORS } from 'src/app/@shared/enums';


const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'app-dialog-confirm-delete',
  standalone: true,
  templateUrl: './dialog-confirm-delete.component.html',
  imports: [
    ButtonModule,
    CommonModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: DatePipe }
  ],
  styles: [
    `
      ::ng-deep .p-dialog .p-dialog-header .p-dialog-title {
      font-size: 18px;
      font-weight: var(--pp-fw-bold) !important;
    }
    `
  ]
})
export class DialogConfirmDeleteComponent implements OnInit {
  @Output() public emitConfirmDelete = new EventEmitter<any>();
  @Output() public emitCancelDelte = new EventEmitter<any>();
  @Input() public payment!: IPayments;

  public readonly CY_SELECTORS = CY_SELECTORS;
  constructor() { }

  public ngOnInit(): void {
  }
}
