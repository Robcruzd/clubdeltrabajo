import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtProjectSharedModule } from 'app/shared/shared.module';
import { DependenciaComponent } from './dependencia.component';
import { DependenciaDetailComponent } from './dependencia-detail.component';
import { DependenciaUpdateComponent } from './dependencia-update.component';
import { DependenciaDeleteDialogComponent } from './dependencia-delete-dialog.component';
import { dependenciaRoute } from './dependencia.route';

@NgModule({
  imports: [CtProjectSharedModule, RouterModule.forChild(dependenciaRoute)],
  declarations: [DependenciaComponent, DependenciaDetailComponent, DependenciaUpdateComponent, DependenciaDeleteDialogComponent],
  entryComponents: [DependenciaDeleteDialogComponent]
})
export class CtProjectDependenciaModule {}
