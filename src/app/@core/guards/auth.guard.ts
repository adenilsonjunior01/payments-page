import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CredentialsService } from 'src/app/@services/credentials/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private credentials: CredentialsService, private router: Router) {}

  canActivate(): any {
      if (this.credentials.user) {
        return true;
      }
      this.router.navigateByUrl('/login');
      return false
  }
  
}
