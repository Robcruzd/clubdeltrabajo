import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';
import { NivelIdiomaService } from './nivel-idioma.service';

@Component({
  templateUrl: './nivel-idioma-delete-dialog.component.html'
})
export class NivelIdiomaDeleteDialogComponent {
  nivelIdioma?: INivelIdioma;

  constructor(
    protected nivelIdiomaService: NivelIdiomaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nivelIdiomaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('nivelIdiomaListModification');
      this.activeModal.close();
    });
  }
}
