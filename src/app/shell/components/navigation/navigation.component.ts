import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/@models/interfaces';
import { CredentialsService } from 'src/app/@services/credentials/credentials.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  imports: [
    CommonModule
  ],
  styles: [
    `
    .navigation-container {
      background-color: var(--pp-blue-2);
    }
    `
  ]
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
