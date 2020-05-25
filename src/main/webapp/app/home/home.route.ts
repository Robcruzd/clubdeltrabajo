import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { VerHojaVidaComponent } from './ver-hoja-vida/ver-hoja-vida.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarTrabajoComponent } from './buscar-trabajo/buscar-trabajo.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

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
  },
  {
    path: 'hoja-vida',
    component: VerHojaVidaComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'buscar-trabajo',
    component: BuscarTrabajoComponent
  },
  {
    path: 'agregar-usuario',
    component: AgregarUsuarioComponent
  }
];
