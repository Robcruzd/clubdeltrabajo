import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { InformacionPersonalComponent } from './informacion-personal.component';
import { InformacionPersonalDetailComponent } from './informacion-personal-detail.component';
import { InformacionPersonalUpdateComponent } from './informacion-personal-update.component';
import { InformacionPersonalDeleteDialogComponent } from './informacion-personal-delete-dialog.component';
import { informacionPersonalRoute } from './informacion-personal.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(informacionPersonalRoute)],
  declarations: [
    InformacionPersonalComponent,
    InformacionPersonalDetailComponent,
    InformacionPersonalUpdateComponent,
    InformacionPersonalDeleteDialogComponent
  ],
  entryComponents: [InformacionPersonalDeleteDialogComponent]
})
export class CtProjectInformacionPersonalModule {}
