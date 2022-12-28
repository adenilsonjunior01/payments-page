import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from 'src/app/@shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [AuthenticationComponent]
})
export class AuthenticationModule { }
