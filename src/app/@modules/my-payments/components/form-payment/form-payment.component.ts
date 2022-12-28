import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TypeActionEnum } from 'src/app/@enums';
import { CY_SELECTORS } from 'src/app/@shared/enums';

@Component({
  selector: 'app-form-payment',
  standalone: true,
  templateUrl: './form-payment.component.html',
  imports: [
    CommonModule,
    InputTextModule,
    ToggleButtonModule,
    NgxMaskModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class FormPaymentComponent implements OnInit {
  @Input() public action!: TypeActionEnum;
  @Input() public form!: UntypedFormGroup;
  @Output() public closeModal = new EventEmitter<any>();
  @Output() public submitForm = new EventEmitter<TypeActionEnum>();

  public typeAction = TypeActionEnum;
  public readonly CY_SELECTORS = CY_SELECTORS

  constructor() {
  }

  public ngOnInit(): void {
  }

  public get nameControl(): AbstractControl | null {
    return this.form.controls['name'];
  }

  public get valorControl(): AbstractControl | null {
    return this.form.controls['value'];
  }

  public get dataControl(): AbstractControl | null {
    return this.form.controls['date'];
  }
}
