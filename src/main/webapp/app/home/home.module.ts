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

@NgModule({
  imports: [
    CtProjectSharedModule,
    RouterModule.forChild(HOME_ROUTE),
    MatAutocompleteModule,
    MatInputModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule
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
    NuevoCorreoComponent
  ]
})
export class CtProjectHomeModule {}
