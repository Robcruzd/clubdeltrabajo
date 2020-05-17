import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOferta } from 'app/shared/model/oferta.model';
import { OfertaService } from './oferta.service';

@Component({
  templateUrl: './oferta-delete-dialog.component.html'
})
export class OfertaDeleteDialogComponent {
  oferta?: IOferta;

  constructor(protected ofertaService: OfertaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ofertaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ofertaListModification');
      this.activeModal.close();
    });
  }
}
