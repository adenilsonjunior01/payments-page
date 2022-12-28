import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.component.html',
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    NavigationComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
