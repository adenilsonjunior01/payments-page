import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from './shell/shell';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./@modules/authentication/authentication.module').then((module) => module.AuthenticationModule)
  },
  Shell.childRoutes([
    {
      path: 'my-payments',
      loadChildren: () => import('./@modules/my-payments/my-payments.module').then((module) => module.MyPaymentsModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./@modules/profile/profile.module').then((module) => module.ProfileModule)
    },
    {
      path: '**',
      redirectTo: '/login'
    }
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
