import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    ToastModule
  ],
  declarations: [ProfileComponent],
  providers: [MessageService]
})
export class ProfileModule { }
