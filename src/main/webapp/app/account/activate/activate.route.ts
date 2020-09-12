import { Route } from '@angular/router';

import { InicioSesionComponent } from './../../home/inicio-sesion/inicio-sesion.component';

export const activateRoute: Route = {
  path: 'activate',
  component: InicioSesionComponent,
  data: {
    authorities: [],
    pageTitle: 'activate.title'
  }
};
