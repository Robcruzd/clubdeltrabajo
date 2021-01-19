import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegiones } from 'app/shared/model/regiones.model';
import { RegionesService } from './regiones.service';

@Component({
  templateUrl: './regiones-delete-dialog.component.html'
})
export class RegionesDeleteDialogComponent {
  regiones?: IRegiones;

  constructor(protected regionesService: RegionesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regionesListModification');
      this.activeModal.close();
    });
  }
}
