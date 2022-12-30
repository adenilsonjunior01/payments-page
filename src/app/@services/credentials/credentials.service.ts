import { Injectable } from '@angular/core';
import { ECredentialsStorage } from 'src/app/@enums';
import { IUser } from 'src/app/@shared/models/interfaces';

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

  public get user(): IUser | null | undefined {
    return JSON.parse(this.local.getItem(ECredentialsStorage.USER));
  }

  public logout(): void {
    this.local.clear();
    this.session.clear();
  }
}
