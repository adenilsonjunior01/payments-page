import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TypeActionEnum } from 'src/app/@enums';
import { CY_SELECTORS } from 'src/app/@shared/enums';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  @Output() public showModal = new EventEmitter<TypeActionEnum>();
  @Output() public newPayment = new EventEmitter<boolean>();
  public readonly CY_SELECTOR = CY_SELECTORS;

  constructor() { }

  public ngOnInit(): void {
  }

  public emitEvent(): void {
    this.showModal.emit(TypeActionEnum.ADD);
  }

}
