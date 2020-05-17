import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
  templateUrl: './tipo-usuario-delete-dialog.component.html'
})
export class TipoUsuarioDeleteDialogComponent {
  tipoUsuario?: ITipoUsuario;

  constructor(
    protected tipoUsuarioService: TipoUsuarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoUsuarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoUsuarioListModification');
      this.activeModal.close();
    });
  }
}
