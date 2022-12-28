import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/@models/interfaces';

const routes = {
  profile: (id: number) => `${environment.API_URL}/account/${id}`
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private http: HttpClient) { }

  public updateUser(payload: IUser): Observable<IUser> {
    return this.http.put<IUser>(routes.profile(payload.id), payload);
  }
}
