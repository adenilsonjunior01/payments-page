import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/@services/credentials/credentials.service';
import { TitleCasePipe } from '@angular/common';
import { IUser } from 'src/app/@models/interfaces';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public user: IUser;

  constructor(private router: Router, private credentials: CredentialsService, public capitalize: TitleCasePipe) { }

  public ngOnInit(): void {
    this.getUser();
  }
  
  public getUser(): void {
    this.user = this.credentials.user;
  }

  public logout(): void {
    this.credentials.logout();
    this.router.navigateByUrl('/login');
  }

  public get userName(): string {
    return this.capitalize.transform(this.user.name);
  }

  public navigateToProfile(): void {
    this.router.navigateByUrl('/profile');
  }
}
