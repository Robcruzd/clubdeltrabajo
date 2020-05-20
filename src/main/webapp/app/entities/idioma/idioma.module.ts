import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { IdiomaComponent } from './idioma.component';
import { IdiomaDetailComponent } from './idioma-detail.component';
import { IdiomaUpdateComponent } from './idioma-update.component';
import { IdiomaDeleteDialogComponent } from './idioma-delete-dialog.component';
import { idiomaRoute } from './idioma.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(idiomaRoute)],
  declarations: [IdiomaComponent, IdiomaDetailComponent, IdiomaUpdateComponent, IdiomaDeleteDialogComponent],
  entryComponents: [IdiomaDeleteDialogComponent]
})
export class CtProjectIdiomaModule {}
