import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { RegionesComponent } from './regiones.component';
import { RegionesDetailComponent } from './regiones-detail.component';
import { RegionesUpdateComponent } from './regiones-update.component';
import { RegionesDeleteDialogComponent } from './regiones-delete-dialog.component';
import { regionesRoute } from './regiones.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(regionesRoute)],
  declarations: [RegionesComponent, RegionesDetailComponent, RegionesUpdateComponent, RegionesDeleteDialogComponent],
  entryComponents: [RegionesDeleteDialogComponent]
})
export class CtProjectRegionesModule {}
