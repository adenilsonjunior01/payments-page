import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { IUser } from 'src/app/@models/interfaces';
import { AuthService } from 'src/app/@services/auth/auth.service';
import { CredentialsService } from 'src/app/@services/credentials/credentials.service';
import { CY_SELECTORS } from 'src/app/@shared/enums';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
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
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      senha: [null, [ Validators.required ]]
      // email: ['usuario@gmail.com', [ Validators.required, Validators.email ]],
      // senha: ['usuario', [ Validators.required ]]
    });
  }

  public autenticate(): void {
    if (this.form.valid) {
      this.loading = true;
      this.userService.getUser()
        .pipe(
          finalize(() => this.loading = false),
          take(1))
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
