import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { ROUTES_ADMIN } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { ShellModule } from './app/shell/shell.module';
import { environment } from './environments/environment';

registerLocaleData(localePt);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(ROUTES_ADMIN),
      NgxMaskModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ShellModule
  ]),
  { provide: LOCALE_ID, useValue: 'pt-BR' },
]
}).catch(err => console.error(err));
