import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { Message } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { finalize, take } from 'rxjs';
import { FocusTrapDirective } from 'src/app/@shared/directives/focus-trap/focus-trap.directive';
import { CY_SELECTORS, STRINGS } from 'src/app/@shared/enums';
import { Utils } from 'src/app/@shared/utils/utils';

import { IPayments } from '../../@shared/models/interfaces/payments.interface';
import { TypeActionEnum } from './../../@enums/type-action.enum';
import { PaymentsService } from './../../@services/payments/payments.service';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { DialogConfirmDeleteComponent } from './components/dialog-confirm-delete/dialog-confirm-delete.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { TablePaymentsComponent } from './components/table-payments/table-payments.component';

@Component({
  selector: 'app-my-payments',
  standalone: true,
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddPaymentComponent,
    DialogConfirmDeleteComponent,
    FormPaymentComponent,
    TablePaymentsComponent,
    DialogModule,
    NgxMaskModule,
    FocusTrapDirective
  ],
  providers: [
    { provide: DatePipe }
  ]
})
export class MyPaymentsComponent implements OnInit {
  public form!: UntypedFormGroup;
  public addPayment!: boolean;
  public titleDialog: string;
  public display: boolean;
  public typeAction!: TypeActionEnum;
  public loading: boolean;
  public payments!: IPayments[];
  public msgs: Message[] = [];
  public confirm: boolean;
  public resume!: IPayments;
  public totalRecords: number;
  public paginateParams: any;

  public readonly CY_SELECTOR = CY_SELECTORS;
  public readonly STRINGS = STRINGS;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private paymentService: PaymentsService) {

    this.titleDialog = STRINGS.TITLE_ADD_PAYMENTS;
    this.display = false;
    this.confirm = false;
    this.loading = false;
  }

  ngOnInit() {
    this.getTotalItems()
    this.getPayments();
    this.createForm();
  }

  public newPayment(event: any): void {
    this.addPayment = event;
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      username: [null],
      title: [null],
      value: [null, Validators.required],
      date: [null, Validators.required],
      image: [null],
      isPayed: [false]
    })
  }

  public getPayments(paramsPaginate: any = { page: 0,  rows: 10 } ): void {
    this.loading = true;
    this.paymentService.getAllPayments(paramsPaginate)
      .pipe(
        take(1),
        finalize(() => this.loading = false))
        .subscribe({
          next: response => {
            this.payments = response;
          }
        })
  }

  private getTotalItems(): void {
    this.paymentService.getAllPayments().pipe(take(1))
      .subscribe({next: count => this.totalRecords = count.length });
  }

  public setParamsPagination(event: any): void {
    this.totalRecords = event.rows * event.pageCount;
    this.paginateParams = event;
    this.getPayments(event);
  }

  public handleEventModal(event: TypeActionEnum): void {
    if (event === TypeActionEnum.ADD) {
      return this.sendNewPayment();
    }
    return this.sendUpdatePayment()
  }

  public sendNewPayment(): void {
    this.typeAction = TypeActionEnum.ADD;
    if (this.form.valid) {
      this.loading = true;
      const payload = this.handleData();
      this.paymentService.saveNewPayment(payload).pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: _ => {
          this.toggleModal();
          this.getPayments(this.paginateParams);
        },
        error: (error: HttpErrorResponse) => console.error(error)
      })
    }
  }

   public sendUpdatePayment(): void {
    if (this.form.valid) {
      this.loading = true;
      const payload = this.handleData();
      this.paymentService.updatePayment(payload).pipe(
        take(1),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: _ => {
          this.toggleModal();
          this.getPayments(this.paginateParams);
        },
        error: (error: HttpErrorResponse) => console.error(error)
      })
    }
  }

  private handleData(): any {
    const date = this.form.controls['date'].value.split('/').reverse().join('-');
    const time = Utils.getTime();
    let result = Object.assign(this.form.value, {
      date: `${date}T${time}Z`
    });
    return result;
  }


  public deletePayment(payment: IPayments): void {
    this.paymentService.deletePayment(payment).pipe(
      take(1),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: _ => {
        this.showDialogConfirm();
        this.getPayments(this.paginateParams);
      },
      error: (error: HttpErrorResponse) => console.error(error)
    })
  }

  public showModal(type: TypeActionEnum): void {
    this.handleTitleDialog(type);
    this.typeAction = type;
    if (type === TypeActionEnum.ADD) {
      this.form.reset();
    }
    this.display = !this.display;
  }

  private toggleModal(): void {
    this.display = !this.display;
  }

  public handleTitleDialog(type?: TypeActionEnum): void {
    if (type === TypeActionEnum.ADD) {
      this.titleDialog = STRINGS.TITLE_ADD_PAYMENTS;
    } else {
      this.titleDialog = STRINGS.TITLE_UPDATE_PAYMENTS;
    }
  }

  public showDialogConfirm() {
    this.confirm = !this.confirm;
  }

  public getPaymentObject(payment: IPayments): void {
    this.resume = payment;
    this.showDialogConfirm();
  }

}
