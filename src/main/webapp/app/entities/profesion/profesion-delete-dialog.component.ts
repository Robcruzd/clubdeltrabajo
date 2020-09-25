import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from './profesion.service';

@Component({
  templateUrl: './profesion-delete-dialog.component.html'
})
export class ProfesionDeleteDialogComponent {
  profesion?: IProfesion;

  constructor(protected profesionService: ProfesionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profesionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profesionListModification');
      this.activeModal.close();
    });
  }
}
