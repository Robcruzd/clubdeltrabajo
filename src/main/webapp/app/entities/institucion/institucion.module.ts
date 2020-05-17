import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { InstitucionComponent } from './institucion.component';
import { InstitucionDetailComponent } from './institucion-detail.component';
import { InstitucionUpdateComponent } from './institucion-update.component';
import { InstitucionDeleteDialogComponent } from './institucion-delete-dialog.component';
import { institucionRoute } from './institucion.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(institucionRoute)],
  declarations: [InstitucionComponent, InstitucionDetailComponent, InstitucionUpdateComponent, InstitucionDeleteDialogComponent],
  entryComponents: [InstitucionDeleteDialogComponent]
})
export class CtProjectInstitucionModule {}
