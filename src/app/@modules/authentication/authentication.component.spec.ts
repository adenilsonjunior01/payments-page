import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';

import { AuthService } from './../../@services/auth/auth.service';
import { CredentialsService } from './../../@services/credentials/credentials.service';
import { IUser } from './../../@shared/models/interfaces/user.interface';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let userService: AuthService;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AuthenticationComponent, HttpClientTestingModule, RouterModule ],
      providers: [
        AuthService,
        AuthenticationComponent,
        CredentialsService,
        { provide: Router, useClass: Router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = TestBed.inject(AuthenticationComponent);
    router = TestBed.inject(Router);
    userService = TestBed.inject(AuthService);

    jest.spyOn(router, 'navigateByUrl').mockImplementation();
    jest.clearAllMocks();
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should validate the form if all fields are filled out correctly', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('password');
    expect(component.form.valid).toBeTruthy();
  });

  it('should invalidate the form if the email field is empty', () => {
    component.form.controls.email.setValue('');
    component.form.controls.senha.setValue('password');
    expect(component.form.valid).toBeFalsy();
  });

  it('should invalidate the form if the password field is empty', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('should call the userService.getUser method when the form is valid', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('password');
    jest.spyOn(AuthService.prototype, 'getUser').mockReturnValue(of([]));
    component.autenticate();
    expect(userService.getUser).toHaveBeenCalled();
  });

  it('should not call the userService.getUser method when the form is invalid', () => {
    const userService = TestBed.inject(AuthService);

    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue(null);

    jest.spyOn(userService, 'getUser').mockReturnValue(of([]));
    component.autenticate();
    expect(userService.getUser).not.toHaveBeenCalled();
  });

  it('should validate the user', () => {
    const user: IUser = {
      id: 1,
      email: 'user@example.com',
      password: 'password',
      name: 'user'
    };

    component.form.controls.email.setValue(user.email);
    component.form.controls.senha.setValue(user.password);

    const validateUserMethod = Reflect.get(component, 'validateUser');
    validateUserMethod.apply(component, [user]);

    expect(component.validLogin).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/my-payments');
  });

  it('should invalidate the user', () => {
    const user: IUser = {
      id: 1,
      email: 'user@example.com',
      password: 'incorrect_password',
      name: 'user'
    };

    component.form.controls.email.setValue(user.email);
    component.form.controls.senha.setValue('correct_password');

    const validateUserMethod = Reflect.get(component, 'validateUser');
    validateUserMethod.apply(component, [user]);

    expect(component.validLogin).toBe(true);
  });

  it('should toggle the type of the input password', () => {
    component.toogleTypeInputPassword = false;
    component.changeTypeInputPassword();
    expect(component.toogleTypeInputPassword).toBe(true);

    component.toogleTypeInputPassword = true;
    component.changeTypeInputPassword();
    expect(component.toogleTypeInputPassword).toBe(false);
  });

  it('should set validLogin to true and not navigate when no user is passed', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('password');

    const validateUserMethod = Reflect.get(component, 'validateUser');
    validateUserMethod.apply(component, [null]);

    expect(component.validLogin).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should invalidate the user when the user is invalid but the form controls are valid', () => {
    const user: IUser = {
      id: 1,
      email: 'user@example.com',
      password: 'incorrect_password',
      name: 'user'
    };

    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('password');

    const validateUserMethod = Reflect.get(component, 'validateUser');
    validateUserMethod.apply(component, [user]);

    expect(component.validLogin).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

});
