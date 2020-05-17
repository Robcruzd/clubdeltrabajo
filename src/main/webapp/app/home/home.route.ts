import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title'
    }
  },
  {
    path: 'resultados-busqueda',
    component: ResultadosBusquedaComponent
  }
];
