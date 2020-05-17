import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';

@Component({
  templateUrl: './cargo-delete-dialog.component.html'
})
export class CargoDeleteDialogComponent {
  cargo?: ICargo;

  constructor(protected cargoService: CargoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cargoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cargoListModification');
      this.activeModal.close();
    });
  }
}
