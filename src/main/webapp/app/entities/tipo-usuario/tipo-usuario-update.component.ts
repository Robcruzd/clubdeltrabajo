import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoUsuario, TipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
  selector: 'jhi-tipo-usuario-update',
  templateUrl: './tipo-usuario-update.component.html'
})
export class TipoUsuarioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]]
  });

  constructor(protected tipoUsuarioService: TipoUsuarioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoUsuario }) => {
      this.updateForm(tipoUsuario);
    });
  }

  updateForm(tipoUsuario: ITipoUsuario): void {
    this.editForm.patchValue({
      id: tipoUsuario.id,
      nombre: tipoUsuario.nombre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoUsuario = this.createFromForm();
    if (tipoUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoUsuarioService.update(tipoUsuario));
    } else {
      this.subscribeToSaveResponse(this.tipoUsuarioService.create(tipoUsuario));
    }
  }

  private createFromForm(): ITipoUsuario {
    return {
      ...new TipoUsuario(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoUsuario>>): void {
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
