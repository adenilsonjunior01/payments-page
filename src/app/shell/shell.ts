import { Route, Routes } from '@angular/router';

import { AuthGuard } from '../@core/guards/auth.guard';
import { ShellComponent } from './shell.component';

export class Shell {

  static childRoutes(routes: Routes): Route {
    return {
        path: '',
        component: ShellComponent,
        children: routes,
        canActivate: [ AuthGuard ]
    };
}

}
