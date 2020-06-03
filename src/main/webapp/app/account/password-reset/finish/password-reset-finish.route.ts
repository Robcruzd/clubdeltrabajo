import { NuevoCorreoComponent } from './../../../home/nuevo-correo/nuevo-correo.component';
import { Route } from '@angular/router';

export const passwordResetFinishRoute: Route = {
  path: 'reset/finish',
  component: NuevoCorreoComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
