import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { debounceTime } from 'rxjs';
import { TypeActionEnum } from 'src/app/@enums';
import { CY_SELECTORS } from 'src/app/@shared/enums';
import { IPayments } from 'src/app/@shared/models/interfaces/payments.interface';

@Component({
  selector: 'app-table-payments',
  standalone: true,
  templateUrl: './table-payments.component.html',
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    BadgeModule,
  ],
  styles: [
    `
    .ic-search {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      margin-top: -.5rem;
    }

    .tr-payments {
      p {
        font-size: var(--pp-font-size-14);
        color: var(--pp-black-2);
      }

      span {
        padding-top: 15px;
        color: var(--pp-gray-3);
        font-size: var(--pp-font-size-12);
      }
    }
    `
  ]
})
export class TablePaymentsComponent implements OnInit, OnChanges {
  @Input() public form!: UntypedFormGroup;
  @Input() public payments!: IPayments[];
  @Input() public rows!: number;
  @Input() public totalRecords!: number;
  @Output() public showModal = new EventEmitter<TypeActionEnum>();
  @Output() public confirmDelete = new EventEmitter<any>();
  @Output() public paramsPaginate = new EventEmitter<any>();

  public querySearch = new UntypedFormControl(null);
  public loading!: boolean;
  public copyPaymentsList!: IPayments[];
  public readonly CY_SELECTOR = CY_SELECTORS;

    constructor(private datePipe: DatePipe) {
  }

  public ngOnInit() {
    this.listenerQuerySearch();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.payments?.currentValue) {
      this.copyPaymentsList = this.payments;
    }
  }

  public listenerQuerySearch(): void {
    this.querySearch.valueChanges.pipe(
      debounceTime(300),
    ).subscribe({
      next: v => {
        if (v) {
          this.searchUser(v);
        } else {
          this.payments = this.copyPaymentsList;
        }
      }
    })
  }

  public searchUser(name: any): void {
    const result = this.copyPaymentsList.filter((user: any) => user.name.trim() === name.trim());
    this.payments = result;
  }

  public updateUser(user: IPayments): void {
    const formatDate = this.datePipe.transform(user.date, 'dd/MM/yyyy');
    this.form.patchValue({
      id: user.id,
      name: user?.name,
      username: user?.username,
      title: user?.title,
      value: user?.value,
      date: formatDate,
      image: user?.image,
      isPayed: user?.isPayed,
    });
    this.showModal.emit(TypeActionEnum.EDIT);
  }

  public onPageChange(event: any): void {
    this.paramsPaginate.emit(event);
  }
}
