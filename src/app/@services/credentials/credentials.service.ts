import { Injectable } from '@angular/core';
import { IUser } from 'src/app/@shared/models/interfaces';

import { ECredentialsStorage } from './../../@enums/credentials-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  public local: Storage;
  public session: Storage;

  constructor() {
    this.local = window.localStorage;
    this.session = window.sessionStorage;
  }

  public credentials(user: IUser) {
    this.local.setItem(ECredentialsStorage.USER, JSON.stringify(user));
  }

  public get user(): IUser | null {
    try {
      const user = JSON.parse(this.local.getItem(ECredentialsStorage.USER));
      return user;
    } catch (error) {
      return null;
    }
  }

  public logout(): void {
    this.local.clear();
    this.session.clear();
  }
}
