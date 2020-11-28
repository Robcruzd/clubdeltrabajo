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
import { SolicitarRegistroComponent } from './solicitar-registro/solicitar-registro.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { OfertaPublicadaComponent } from './oferta-publicada/oferta-publicada.component';
import { PrimerOfertaComponent } from './primer-oferta/primer-oferta.component';
// import { ReportesComponent } from './reportes-admin/reportes.component';

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
    component: ResultadosBusquedaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'hoja-vida',
    component: VerHojaVidaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'buscar-trabajo',
    component: BuscarTrabajoComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'agregar-usuario',
    component: AgregarUsuarioComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'crear-hoja-vida',
    component: CrearHojaVidaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'restaurar-contrasena',
    component: RestaurarContrasenaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'nuevo-correo',
    component: NuevoCorreoComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'informacion-empresa',
    component: InformacionEmpresaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'visualizar-hoja-vida',
    component: VisualizarHojaVidaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'solicitar-registro',
    component: SolicitarRegistroComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'perfil-empresa',
    component: PerfilEmpresaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'crear-oferta',
    component: CrearOfertaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'editar-empresa',
    component: EditarEmpresaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'membresias',
    component: MembresiasComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'oferta-publicada',
    component: OfertaPublicadaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'primer-oferta',
    component: PrimerOfertaComponent,
    data: {
      pageTitle: 'home.title'
    }
  }
  // {
  //   path: 'reportes',
  //   component: ReportesComponent,
  //   data: {
  //     pageTitle: 'home.title'
  //   }
  // }
];
