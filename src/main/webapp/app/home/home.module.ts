import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CtProjectSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { VerHojaVidaComponent } from './ver-hoja-vida/ver-hoja-vida.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarTrabajoComponent } from './buscar-trabajo/buscar-trabajo.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearHojaVidaComponent } from './crear-hoja-vida/crear-hoja-vida.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RestaurarContrasenaComponent } from './restaurar-contrasena/restaurar-contrasena.component';
import { NuevoCorreoComponent } from './nuevo-correo/nuevo-correo.component';
import { InformacionEmpresaComponent } from './informacion-empresa/informacion-empresa.component';
import { VisualizarHojaVidaComponent } from './visualizar-hoja-vida/visualizar-hoja-vida.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolicitarRegistroComponent } from './solicitar-registro/solicitar-registro.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { PrimerOfertaComponent } from './primer-oferta/primer-oferta.component';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { OfertaPublicadaComponent } from './oferta-publicada/oferta-publicada.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { PrevioRegistrarComponent } from './previo-registrar/previo-registrar.component';
import { PrevioRegistrarEmpComponent } from './previo-registrar-emp/previo-registrar-emp.component';
import { ClubEmpresasComponent } from './club-empresas/club-empresas.component';
import { HojaCandidatoComponent } from './hoja-candidato/hoja-candidato.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CandidatosOfertaComponent } from './candidatos-oferta/candidatos-oferta.component';
import { ControlarOfertasComponent } from './controlar-ofertas/controlar-ofertas.component';
import { OfertaPublicaComponent } from './oferta-publica/oferta-publica.component';
import { CandidatosSeleccionadosComponent } from './candidatos-seleccionados/candidatos-seleccionados.component';
// import { BusquedaCandidatosComponent } from './busqueda-candidatos/busqueda-candidatos.component';

@NgModule({
  imports: [
    NgxPaginationModule,
    CtProjectSharedModule,
    RouterModule.forChild(HOME_ROUTE),
    MatAutocompleteModule,
    MatInputModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    PdfViewerModule,
    PDFExportModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HomeComponent,
    ResultadosBusquedaComponent,
    VerHojaVidaComponent,
    PerfilComponent,
    BuscarTrabajoComponent,
    AgregarUsuarioComponent,
    CrearHojaVidaComponent,
    InicioSesionComponent,
    RestaurarContrasenaComponent,
    NuevoCorreoComponent,
    InformacionEmpresaComponent,
    VisualizarHojaVidaComponent,
    SolicitarRegistroComponent,
    PerfilEmpresaComponent,
    PrimerOfertaComponent,
    CrearOfertaComponent,
    MembresiasComponent,
    OfertaPublicadaComponent,
    EditarEmpresaComponent,
    PrevioRegistrarComponent,
    PrevioRegistrarEmpComponent,
    ClubEmpresasComponent,
    CandidatosOfertaComponent,
    HojaCandidatoComponent,
    OfertaPublicaComponent,
    CandidatosSeleccionadosComponent,
    ControlarOfertasComponent,
    OfertaPublicaComponent
    // BusquedaCandidatosComponent
  ]
})
export class CtProjectHomeModule {}
