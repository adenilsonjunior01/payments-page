import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
  ],
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      switchMap((route) => route.data)
    )
    .subscribe({
      next: (event) => {
        if (event['title']) {
          return this.titleService.setTitle(`PicPay - ${event['title']}`)
        }
        return this.titleService.setTitle('Picpay - Desafio Front-end');
      }
    })
  }
}
