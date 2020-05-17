import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { InformacionLaboralComponent } from './informacion-laboral.component';
import { InformacionLaboralDetailComponent } from './informacion-laboral-detail.component';
import { InformacionLaboralUpdateComponent } from './informacion-laboral-update.component';
import { InformacionLaboralDeleteDialogComponent } from './informacion-laboral-delete-dialog.component';
import { informacionLaboralRoute } from './informacion-laboral.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(informacionLaboralRoute)],
  declarations: [
    InformacionLaboralComponent,
    InformacionLaboralDetailComponent,
    InformacionLaboralUpdateComponent,
    InformacionLaboralDeleteDialogComponent
  ],
  entryComponents: [InformacionLaboralDeleteDialogComponent]
})
export class CtProjectInformacionLaboralModule {}
