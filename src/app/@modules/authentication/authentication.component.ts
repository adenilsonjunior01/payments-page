import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';

import { AuthService } from './../../@services/auth/auth.service';
import { CredentialsService } from './../../@services/credentials/credentials.service';
import { CurrencyDirective } from './../../@shared/directives/currency/currency.directive';
import { FocusTrapDirective } from './../../@shared/directives/focus-trap/focus-trap.directive';
import { CY_SELECTORS } from './../../@shared/enums/cy-strings.enum';
import { IUser } from './../../@shared/models/interfaces/user.interface';

@UntilDestroy()
@Component({
  selector: 'app-authentication',
  standalone: true,
  templateUrl: './authentication.component.html',
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    FocusTrapDirective,
    CurrencyDirective
  ],
  providers: [
    AuthService
  ],
  styles: [
    `
      .auth-container {
      height: 100vh;
      .auth-login {
        background-color: var( --pp-gray-4);

        &--welcome h2 {
          font-family: var(--pp-font-family-montserrat) !important;
          color: var(--pp-black-2);
          font-size: 30px;
        }
      }

      ::ng-deep .p-inputgroup-addon {
        background: transparent;
      }
    }

      .auth-banner {
      background-color: var(--pp-white);
      }
    `
  ]
})
export class AuthenticationComponent implements OnInit {
  public form: UntypedFormGroup = this.formBuilder.group({
    // email: [null, [ Validators.required, Validators.email ]],
    // senha: [null, [ Validators.required ]]
    email: ['usuario@gmail.com', [ Validators.required, Validators.email ]],
    senha: ['usuario', [ Validators.required ]]
  });

  public toogleTypeInputPassword: boolean;
  public loading: boolean;
  public validLogin: boolean;
  public readonly CY_SELECTOR = CY_SELECTORS;

  constructor(
      private formBuilder: UntypedFormBuilder,
      private router: Router,
      private userService: AuthService,
      private credentials: CredentialsService) {
    this.toogleTypeInputPassword = false;
    this.loading = false;
    this.validLogin = false;
  }

  public ngOnInit(): void {
  }

  public autenticate(): void {
    if (this.form.valid) {
      this.loading = true;
      this.userService.getUser()
        .pipe(
          finalize(() => this.loading = false),
          untilDestroyed(this))
          .subscribe({
            next: response => {
              const user = response.find(v => v.email === this.emailControl.value);
              this.validateUser(user);
            }
          })
    }
  }

  private validateUser(user: IUser): void {
    this.validLogin = false;
    if (user && user.email === this.emailControl.value && user.password === this.senhaControl.value) {
      this.credentials.credentials(user);
      this.router.navigateByUrl('/my-payments');
    } else {
      this.validLogin = true;
    }

  }

  public changeTypeInputPassword():void {
    this.toogleTypeInputPassword = !this.toogleTypeInputPassword;
  }

  public get emailControl(): AbstractControl | null {
    return this.form.controls['email'];
  }

  public get senhaControl(): AbstractControl | null {
    return this.form.controls['senha'];
  }
}
