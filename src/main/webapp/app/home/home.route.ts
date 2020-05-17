import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: ResultadosBusquedaComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
