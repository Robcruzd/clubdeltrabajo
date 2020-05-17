import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionAcademicaService } from './informacion-academica.service';

@Component({
  templateUrl: './informacion-academica-delete-dialog.component.html'
})
export class InformacionAcademicaDeleteDialogComponent {
  informacionAcademica?: IInformacionAcademica;

  constructor(
    protected informacionAcademicaService: InformacionAcademicaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.informacionAcademicaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('informacionAcademicaListModification');
      this.activeModal.close();
    });
  }
}
