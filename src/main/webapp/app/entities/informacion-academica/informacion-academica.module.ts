import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { InformacionAcademicaComponent } from './informacion-academica.component';
import { InformacionAcademicaDetailComponent } from './informacion-academica-detail.component';
import { InformacionAcademicaUpdateComponent } from './informacion-academica-update.component';
import { InformacionAcademicaDeleteDialogComponent } from './informacion-academica-delete-dialog.component';
import { informacionAcademicaRoute } from './informacion-academica.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(informacionAcademicaRoute)],
  declarations: [
    InformacionAcademicaComponent,
    InformacionAcademicaDetailComponent,
    InformacionAcademicaUpdateComponent,
    InformacionAcademicaDeleteDialogComponent
  ],
  entryComponents: [InformacionAcademicaDeleteDialogComponent]
})
export class CtProjectInformacionAcademicaModule {}
