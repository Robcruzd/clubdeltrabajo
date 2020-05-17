import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { NivelIdiomaComponent } from './nivel-idioma.component';
import { NivelIdiomaDetailComponent } from './nivel-idioma-detail.component';
import { NivelIdiomaUpdateComponent } from './nivel-idioma-update.component';
import { NivelIdiomaDeleteDialogComponent } from './nivel-idioma-delete-dialog.component';
import { nivelIdiomaRoute } from './nivel-idioma.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(nivelIdiomaRoute)],
  declarations: [NivelIdiomaComponent, NivelIdiomaDetailComponent, NivelIdiomaUpdateComponent, NivelIdiomaDeleteDialogComponent],
  entryComponents: [NivelIdiomaDeleteDialogComponent]
})
export class CtProjectNivelIdiomaModule {}
