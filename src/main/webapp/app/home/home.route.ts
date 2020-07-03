import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { VerHojaVidaComponent } from './ver-hoja-vida/ver-hoja-vida.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarTrabajoComponent } from './buscar-trabajo/buscar-trabajo.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { CrearHojaVidaComponent } from './crear-hoja-vida/crear-hoja-vida.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RestaurarContrasenaComponent } from './restaurar-contrasena/restaurar-contrasena.component';
import { NuevoCorreoComponent } from './nuevo-correo/nuevo-correo.component';
import { InformacionEmpresaComponent } from './informacion-empresa/informacion-empresa.component';
import { VisualizarHojaVidaComponent } from './visualizar-hoja-vida/visualizar-hoja-vida.component';

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
  },
  {
    path: 'crear-hoja-vida',
    component: CrearHojaVidaComponent
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'restaurar-contrasena',
    component: RestaurarContrasenaComponent
  },
  {
    path: 'nuevo-correo',
    component: NuevoCorreoComponent
  },
  {
    path: 'informacion-empresa',
    component: InformacionEmpresaComponent
  },
  {
    path: 'visualizar-hoja-vida',
    component: VisualizarHojaVidaComponent
  }
];
