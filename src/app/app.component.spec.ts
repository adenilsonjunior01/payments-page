import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { expect } from '@jest/globals';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy: Router;
  let activatedRouteSpy: ActivatedRoute;
  let titleSpy: Title;

  beforeEach(() => {
    routerSpy = {
      events: new Subject<NavigationEnd>(),
    } as unknown as Router;

    activatedRouteSpy = {
      data: {
        subscribe: jest.fn().mockReturnValue({ title: 'Some Route' }),
      },
    } as any;

    titleSpy = {
      setTitle: jest.fn(),
    } as unknown as Title;

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Title, useValue: titleSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('can load instance', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
