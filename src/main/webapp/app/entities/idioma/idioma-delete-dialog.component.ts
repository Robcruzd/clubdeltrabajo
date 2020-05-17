import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIdioma } from 'app/shared/model/idioma.model';
import { IdiomaService } from './idioma.service';

@Component({
  templateUrl: './idioma-delete-dialog.component.html'
})
export class IdiomaDeleteDialogComponent {
  idioma?: IIdioma;

  constructor(protected idiomaService: IdiomaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.idiomaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('idiomaListModification');
      this.activeModal.close();
    });
  }
}
