import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { VerHojaVidaComponent } from './ver-hoja-vida/ver-hoja-vida.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(HOME_ROUTE)],
  declarations: [HomeComponent, ResultadosBusquedaComponent, VerHojaVidaComponent, PerfilComponent]
})
export class CtProjectHomeModule {}
