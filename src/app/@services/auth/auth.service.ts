import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/@models/interfaces';
import { environment } from 'src/environments/environment';

const routes = {
  auth: () => `${environment.API_URL}/account`,
}

@Injectable()
export class AuthService {

constructor(private http: HttpClient) { }

  public getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(routes.auth());
  }
}
