import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { AplicacionOfertaService } from './aplicacion-oferta.service';

@Component({
  templateUrl: './aplicacion-oferta-delete-dialog.component.html'
})
export class AplicacionOfertaDeleteDialogComponent {
  aplicacionOferta?: IAplicacionOferta;

  constructor(
    protected aplicacionOfertaService: AplicacionOfertaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aplicacionOfertaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aplicacionOfertaListModification');
      this.activeModal.close();
    });
  }
}
