import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { PaymentsService, routes } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentsService]
    });

    service = TestBed.inject(PaymentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created PaymentsService', () => {
    expect(service).toBeTruthy();
  });

  // GET PAYMENTS
  it('should return a list of payments', () => {
    const dummyPayments = [
      {id: 1, name: 'Payment 1'},
      {id: 2, name: 'Payment 2'}
    ];

    service.getAllPayments().subscribe(payments => {
      expect(payments.length).toBe(2);
      expect(payments).toEqual(dummyPayments);
    });

    const request = httpMock.expectOne(`${routes.payments()}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPayments);
  });

  it('should return a list of payments with pagination', () => {
    const paramsPaginate = {page: 1, rows: 10};
    const dummyPayments = [
      {id: 1, name: 'Payment 1'},
      {id: 2, name: 'Payment 2'}
    ];

    service.getAllPayments(paramsPaginate).subscribe(payments => {
      expect(payments.length).toBe(2);
      expect(payments).toEqual(dummyPayments);
    });

    const request = httpMock.expectOne(`${routes.payments()}?_page=2&_limit=10`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPayments);
  });

  // UPDATE
  it('should update a payment', () => {
    const dummyPayment: any = {id: 1, name: 'Payment 1'};

    service.updatePayment(dummyPayment).subscribe((resp) => {
      expect(resp).toBeUndefined();
    });

    const request = httpMock.expectOne(`${routes.paymentsId(dummyPayment.id)}`);
    expect(request.request.method).toBe('PUT');
    request.flush(null);
  });

  it('should throw an error if the payment is not found', () => {
    const dummyPayment: any = {id: 1, name: 'Payment 1'};

    service.updatePayment(dummyPayment).subscribe({
      next: () => {
        fail('expected an error');
      },
      error: (error) => {
        expect(error.status).toEqual(404);
      }
    })

    const request = httpMock.expectOne(`${routes.paymentsId(dummyPayment.id)}`);
    request.flush('', {status: 404, statusText: 'Not Found'});
  });

  // POST - SAVE
  it('should save a new payment', () => {
    const dummyPayment: any = {name: 'Payment 1'};

    service.saveNewPayment(dummyPayment).subscribe((resp) => {
      expect(resp).toBeUndefined();
    });

    const request = httpMock.expectOne(`${routes.payments()}`);
    expect(request.request.method).toBe('POST');
    request.flush(null);
  });

  it('should throw an error if the payment is invalid', () => {
    const dummyPayment: any = {id: 1, name: ''};

    service.saveNewPayment(dummyPayment).subscribe({
      next: () => {
        fail('expected an error');
      },
      error: (error) => {
        expect(error.status).toEqual(400);
      }
    })

    const request = httpMock.expectOne(`${routes.payments()}`);
    request.flush('', {status: 400, statusText: 'Bad Request'});
  });

  // DELETE
  it('should delete a payment', () => {
    const dummyPayment: any = {id: 1, name: 'Payment 1'};

    service.deletePayment(dummyPayment).subscribe((resp) => {
      expect(resp).toBeUndefined();
    });

    const request = httpMock.expectOne(`${routes.paymentsId(dummyPayment.id)}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

  it('should throw an error if the payment is not found', () => {
    const dummyPayment: any = {id: 1, name: 'Payment 1'};

    service.deletePayment(dummyPayment).subscribe({
      next: () => {
        fail('expected an error');
      },
      error: (error) => {
        expect(error.status).toEqual(404);
      }
    });

    const request = httpMock.expectOne(`${routes.paymentsId(dummyPayment.id)}`);
    request.flush('', {status: 404, statusText: 'Not Found'});
  });
});
