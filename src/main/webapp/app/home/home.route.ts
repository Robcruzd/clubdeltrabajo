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
import { PrevioRegistrarComponent } from './previo-registrar/previo-registrar.component';
import { PrevioRegistrarEmpComponent } from './previo-registrar-emp/previo-registrar-emp.component';
import { ClubEmpresasComponent } from './club-empresas/club-empresas.component';
import { CandidatosOfertaComponent } from './candidatos-oferta/candidatos-oferta.component';
import { HojaCandidatoComponent } from './hoja-candidato/hoja-candidato.component';
import { ControlarOfertasComponent } from './controlar-ofertas/controlar-ofertas.component';
import { OfertaPublicaComponent } from './oferta-publica/oferta-publica.component';
import { CandidatosSeleccionadosComponent } from './candidatos-seleccionados/candidatos-seleccionados.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AsesoriaJuridicaComponent } from './asesoria-juridica/asesoria-juridica.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PerfilInfoEmpresaComponent } from './perfil-info-empresa/perfil-info-empresa.component';

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
  },
  {
    path: 'previo-registrar',
    component: PrevioRegistrarComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'previo-registrar-emp',
    component: PrevioRegistrarEmpComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'club-empresas',
    component: ClubEmpresasComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'candidatos-oferta',
    component: CandidatosOfertaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'hoja-candidato',
    component: HojaCandidatoComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'oferta-publica',
    component: OfertaPublicaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'candidatos-seleccionados',
    component: CandidatosSeleccionadosComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'controlar-ofertas',
    component: ControlarOfertasComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'asesoria-juridica',
    component: AsesoriaJuridicaComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'preguntas-frecuentes',
    component: PreguntasFrecuentesComponent,
    data: {
      pageTitle: 'home.title'
    }
  },
  {
    path: 'perfil-info-empresa',
    component: PerfilInfoEmpresaComponent,
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
