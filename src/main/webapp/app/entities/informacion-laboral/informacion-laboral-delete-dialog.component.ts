import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInformacionLaboral } from 'app/shared/model/informacion-laboral.model';
import { InformacionLaboralService } from './informacion-laboral.service';

@Component({
  templateUrl: './informacion-laboral-delete-dialog.component.html'
})
export class InformacionLaboralDeleteDialogComponent {
  informacionLaboral?: IInformacionLaboral;

  constructor(
    protected informacionLaboralService: InformacionLaboralService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.informacionLaboralService.delete(id).subscribe(() => {
      this.eventManager.broadcast('informacionLaboralListModification');
      this.activeModal.close();
    });
  }
}
