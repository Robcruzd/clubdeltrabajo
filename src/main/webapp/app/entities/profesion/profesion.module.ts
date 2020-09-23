import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { ProfesionComponent } from './profesion.component';
import { ProfesionDetailComponent } from './profesion-detail.component';
import { ProfesionUpdateComponent } from './profesion-update.component';
import { ProfesionDeleteDialogComponent } from './profesion-delete-dialog.component';
import { profesionRoute } from './profesion.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(profesionRoute)],
  declarations: [ProfesionComponent, ProfesionDetailComponent, ProfesionUpdateComponent, ProfesionDeleteDialogComponent],
  entryComponents: [ProfesionDeleteDialogComponent]
})
export class CtProjectProfesionModule {}
