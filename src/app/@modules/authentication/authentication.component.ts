import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';
import { IUser } from 'src/app/@models/interfaces';
import { AuthService } from 'src/app/@services/auth/auth.service';
import { CredentialsService } from 'src/app/@services/credentials/credentials.service';
import { CY_SELECTORS } from 'src/app/@shared/enums';
import { SharedModule } from 'src/app/@shared/shared.module';

@UntilDestroy()
@Component({
  selector: 'app-authentication',
  standalone: true,
  templateUrl: './authentication.component.html',
  imports: [
    CommonModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    MessageModule
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
  public form!: UntypedFormGroup;
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
    this.createForm();
    this.autenticate();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      // email: [null, [ Validators.required, Validators.email ]],
      // senha: [null, [ Validators.required ]]
      email: ['usuario@gmail.com', [ Validators.required, Validators.email ]],
      senha: ['usuario', [ Validators.required ]]
    });
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
