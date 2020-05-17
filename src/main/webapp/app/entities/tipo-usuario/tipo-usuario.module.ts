import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { TipoUsuarioComponent } from './tipo-usuario.component';
import { TipoUsuarioDetailComponent } from './tipo-usuario-detail.component';
import { TipoUsuarioUpdateComponent } from './tipo-usuario-update.component';
import { TipoUsuarioDeleteDialogComponent } from './tipo-usuario-delete-dialog.component';
import { tipoUsuarioRoute } from './tipo-usuario.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(tipoUsuarioRoute)],
  declarations: [TipoUsuarioComponent, TipoUsuarioDetailComponent, TipoUsuarioUpdateComponent, TipoUsuarioDeleteDialogComponent],
  entryComponents: [TipoUsuarioDeleteDialogComponent]
})
export class CtProjectTipoUsuarioModule {}
