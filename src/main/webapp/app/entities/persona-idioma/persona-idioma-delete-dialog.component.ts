import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonaIdioma } from 'app/shared/model/persona-idioma.model';
import { PersonaIdiomaService } from './persona-idioma.service';

@Component({
  templateUrl: './persona-idioma-delete-dialog.component.html'
})
export class PersonaIdiomaDeleteDialogComponent {
  personaIdioma?: IPersonaIdioma;

  constructor(
    protected personaIdiomaService: PersonaIdiomaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personaIdiomaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personaIdiomaListModification');
      this.activeModal.close();
    });
  }
}
