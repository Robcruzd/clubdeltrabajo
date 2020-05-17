import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { InformacionPersonalService } from './informacion-personal.service';

@Component({
  templateUrl: './informacion-personal-delete-dialog.component.html'
})
export class InformacionPersonalDeleteDialogComponent {
  informacionPersonal?: IInformacionPersonal;

  constructor(
    protected informacionPersonalService: InformacionPersonalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.informacionPersonalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('informacionPersonalListModification');
      this.activeModal.close();
    });
  }
}
