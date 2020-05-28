import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { PersonaIdiomaComponent } from './persona-idioma.component';
import { PersonaIdiomaDetailComponent } from './persona-idioma-detail.component';
import { PersonaIdiomaUpdateComponent } from './persona-idioma-update.component';
import { PersonaIdiomaDeleteDialogComponent } from './persona-idioma-delete-dialog.component';
import { personaIdiomaRoute } from './persona-idioma.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(personaIdiomaRoute)],
  declarations: [PersonaIdiomaComponent, PersonaIdiomaDetailComponent, PersonaIdiomaUpdateComponent, PersonaIdiomaDeleteDialogComponent],
  entryComponents: [PersonaIdiomaDeleteDialogComponent]
})
export class CtProjectPersonaIdiomaModule {}
