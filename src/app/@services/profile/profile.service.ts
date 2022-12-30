import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/@shared/models/interfaces';
import { environment } from 'src/environments/environment';

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
