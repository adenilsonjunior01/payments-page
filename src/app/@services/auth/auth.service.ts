import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/@models/interfaces';

const routes = {
  auth: () => `${environment.API_URL}/account`,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

  public getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(routes.auth());
  } 
}
