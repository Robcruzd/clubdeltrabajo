import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
  templateUrl: './tipo-documento-delete-dialog.component.html'
})
export class TipoDocumentoDeleteDialogComponent {
  tipoDocumento?: ITipoDocumento;

  constructor(
    protected tipoDocumentoService: TipoDocumentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDocumentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoDocumentoListModification');
      this.activeModal.close();
    });
  }
}
