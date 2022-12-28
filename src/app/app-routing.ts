import { Routes } from '@angular/router';

import { Shell } from './shell/shell';

export const ROUTES_ADMIN: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./@modules/authentication/authentication.component').then((comp) => comp.AuthenticationComponent)
  },
  Shell.childRoutes([
    {
      path: 'my-payments',
      loadComponent: () => import('./@modules/my-payments/my-payments.component').then((comp) => comp.MyPaymentsComponent)
    },
    {
      path: 'profile',
      loadComponent: () => import('./@modules/profile/profile.component').then((comp) => comp.ProfileComponent),
      data: { title: 'Meu Perfil' }
    },
    {
      path: '**',
      redirectTo: '/login'
    }
  ]),
];
