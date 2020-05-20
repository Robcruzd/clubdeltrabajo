import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.CtProjectPersonaModule)
      },
      {
        path: 'tipo-documento',
        loadChildren: () => import('./tipo-documento/tipo-documento.module').then(m => m.CtProjectTipoDocumentoModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.CtProjectEmpresaModule)
      },
      {
        path: 'tipo-usuario',
        loadChildren: () => import('./tipo-usuario/tipo-usuario.module').then(m => m.CtProjectTipoUsuarioModule)
      },
      {
        path: 'informacion-academica',
        loadChildren: () => import('./informacion-academica/informacion-academica.module').then(m => m.CtProjectInformacionAcademicaModule)
      },
      {
        path: 'informacion-personal',
        loadChildren: () => import('./informacion-personal/informacion-personal.module').then(m => m.CtProjectInformacionPersonalModule)
      },
      {
        path: 'dependencia',
        loadChildren: () => import('./dependencia/dependencia.module').then(m => m.CtProjectDependenciaModule)
      },
      {
        path: 'informacion-laboral',
        loadChildren: () => import('./informacion-laboral/informacion-laboral.module').then(m => m.CtProjectInformacionLaboralModule)
      },
      {
        path: 'archivo',
        loadChildren: () => import('./archivo/archivo.module').then(m => m.CtProjectArchivoModule)
      },
      {
        path: 'cargo',
        loadChildren: () => import('./cargo/cargo.module').then(m => m.CtProjectCargoModule)
      },
      {
        path: 'institucion',
        loadChildren: () => import('./institucion/institucion.module').then(m => m.CtProjectInstitucionModule)
      },
      {
        path: 'nivel-idioma',
        loadChildren: () => import('./nivel-idioma/nivel-idioma.module').then(m => m.CtProjectNivelIdiomaModule)
      },
      {
        path: 'idioma',
        loadChildren: () => import('./idioma/idioma.module').then(m => m.CtProjectIdiomaModule)
      },
      {
        path: 'aplicacion-oferta',
        loadChildren: () => import('./aplicacion-oferta/aplicacion-oferta.module').then(m => m.CtProjectAplicacionOfertaModule)
      },
      {
        path: 'oferta',
        loadChildren: () => import('./oferta/oferta.module').then(m => m.CtProjectOfertaModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.CtProjectUsuarioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CtProjectEntityModule {}
