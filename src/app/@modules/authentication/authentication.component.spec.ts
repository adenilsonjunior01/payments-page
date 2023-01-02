import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';

import { AuthService } from './../../@services/auth/auth.service';
import { CredentialsService } from './../../@services/credentials/credentials.service';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let userService: AuthService;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AuthenticationComponent, HttpClientTestingModule ],
      providers: [
        AuthService,
        AuthenticationComponent,
        CredentialsService,
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = TestBed.inject(AuthenticationComponent);
    router = TestBed.inject(Router);
    userService = TestBed.inject(AuthService);
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
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('');
    jest.spyOn(AuthService.prototype, 'getUser').mockReturnValue(of([]));
    component.autenticate();
    expect(userService.getUser).not.toHaveBeenCalled();
  });

  it('should set the loading property to true when the autenticate method is called', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.senha.setValue('password');
    component.autenticate();
    expect(component.loading).toBeTruthy();
  });
});
