import { Route, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';


export class Shell {

  static childRoutes(routes: Routes): Route {
    console.log(routes);
    return {
        path: '',
        component: ShellComponent,
        children: routes,
        // canActivate: [AuthenticationGuard],
    };
}

}
