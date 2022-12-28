import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayments } from 'src/app/@models/interfaces/payments.interface';
import { environment } from 'src/environments/environment';

const routes = {
  payments: () => `${environment.API_URL}/tasks`,
  paymentsId: (id: number) => `${environment.API_URL}/tasks/${id}`
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  public getAllPayments(paramsPaginate?: any): Observable<IPayments[]> {
    let params;
    if (paramsPaginate) {
      params = new HttpParams()
        .set('_page', paramsPaginate.page + 1)
        .set('_limit', paramsPaginate.rows);
    }
    return this.http.get<IPayments[]>(routes.payments(), { params });
  }

  public updatePayment(payload: IPayments): Observable<void> {
    return this.http.put<void>(routes.paymentsId(payload.id), payload);
  }

  public saveNewPayment(payload: IPayments): Observable<void> {
    return this.http.post<void>(routes.payments(), payload);
  }

  public deletePayment(payload: IPayments): Observable<void> {
    return this.http.delete<void>(routes.paymentsId(payload.id));
  }
}
