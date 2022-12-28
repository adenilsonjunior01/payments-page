import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { SharedModule } from './../../@shared/shared.module';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { DialogConfirmDeleteComponent } from './components/dialog-confirm-delete/dialog-confirm-delete.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { TablePaymentsComponent } from './components/table-payments/table-payments.component';
import { MyPaymentsRoutingModule } from './my-payments-routing.module';
import { MyPaymentsComponent } from './my-payments.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  imports: [
    CommonModule,
    MyPaymentsRoutingModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    PaginatorModule,
    SharedModule,
    DialogModule,
    NgxMaskModule.forRoot(),
    InputMaskModule,
    CurrencyMaskModule,
    BadgeModule,
    ToggleButtonModule
  ],
  declarations: [
    MyPaymentsComponent,
    AddPaymentComponent,
    TablePaymentsComponent,
    FormPaymentComponent,
    DialogConfirmDeleteComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: DatePipe }
  ]
})
export class MyPaymentsModule { }
