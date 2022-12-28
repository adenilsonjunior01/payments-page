import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ShellComponent } from './shell.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [ShellComponent, NavigationComponent],
  providers: [ TitleCasePipe ]
})
export class ShellModule { }
