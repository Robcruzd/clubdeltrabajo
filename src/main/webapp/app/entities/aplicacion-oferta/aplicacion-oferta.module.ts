import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { AplicacionOfertaComponent } from './aplicacion-oferta.component';
import { AplicacionOfertaDetailComponent } from './aplicacion-oferta-detail.component';
import { AplicacionOfertaUpdateComponent } from './aplicacion-oferta-update.component';
import { AplicacionOfertaDeleteDialogComponent } from './aplicacion-oferta-delete-dialog.component';
import { aplicacionOfertaRoute } from './aplicacion-oferta.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(aplicacionOfertaRoute)],
  declarations: [
    AplicacionOfertaComponent,
    AplicacionOfertaDetailComponent,
    AplicacionOfertaUpdateComponent,
    AplicacionOfertaDeleteDialogComponent
  ],
  entryComponents: [AplicacionOfertaDeleteDialogComponent]
})
export class CtProjectAplicacionOfertaModule {}
