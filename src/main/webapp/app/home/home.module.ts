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

@NgModule({
  imports: [CtProjectSharedModule, MatAutocompleteModule, MatInputModule, RouterModule.forChild(HOME_ROUTE)],
  declarations: [
    HomeComponent,
    ResultadosBusquedaComponent,
    VerHojaVidaComponent,
    PerfilComponent,
    BuscarTrabajoComponent,
    AgregarUsuarioComponent
  ]
})
export class CtProjectHomeModule {}
