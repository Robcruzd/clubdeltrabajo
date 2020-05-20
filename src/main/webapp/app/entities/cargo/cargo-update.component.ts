import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICargo, Cargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'jhi-cargo-update',
  templateUrl: './cargo-update.component.html'
})
export class CargoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cargo: [null, [Validators.required]]
  });

  constructor(protected cargoService: CargoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cargo }) => {
      this.updateForm(cargo);
    });
  }

  updateForm(cargo: ICargo): void {
    this.editForm.patchValue({
      id: cargo.id,
      cargo: cargo.cargo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cargo = this.createFromForm();
    if (cargo.id !== undefined) {
      this.subscribeToSaveResponse(this.cargoService.update(cargo));
    } else {
      this.subscribeToSaveResponse(this.cargoService.create(cargo));
    }
  }

  private createFromForm(): ICargo {
    return {
      ...new Cargo(),
      id: this.editForm.get(['id'])!.value,
      cargo: this.editForm.get(['cargo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICargo>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
