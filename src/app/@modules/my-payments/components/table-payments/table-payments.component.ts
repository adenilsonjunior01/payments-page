import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TypeActionEnum } from 'src/app/@enums';
import { IPayments } from 'src/app/@models/interfaces/payments.interface';
import { CY_SELECTORS } from 'src/app/@shared/enums';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
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
