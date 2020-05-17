import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInstitucion } from 'app/shared/model/institucion.model';
import { InstitucionService } from './institucion.service';

@Component({
  templateUrl: './institucion-delete-dialog.component.html'
})
export class InstitucionDeleteDialogComponent {
  institucion?: IInstitucion;

  constructor(
    protected institucionService: InstitucionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.institucionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('institucionListModification');
      this.activeModal.close();
    });
  }
}
