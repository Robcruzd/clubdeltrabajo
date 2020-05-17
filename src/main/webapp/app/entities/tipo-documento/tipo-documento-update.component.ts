import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoDocumento, TipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
  selector: 'jhi-tipo-documento-update',
  templateUrl: './tipo-documento-update.component.html'
})
export class TipoDocumentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreTipo: [null, [Validators.required]]
  });

  constructor(protected tipoDocumentoService: TipoDocumentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDocumento }) => {
      this.updateForm(tipoDocumento);
    });
  }

  updateForm(tipoDocumento: ITipoDocumento): void {
    this.editForm.patchValue({
      id: tipoDocumento.id,
      nombreTipo: tipoDocumento.nombreTipo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDocumento = this.createFromForm();
    if (tipoDocumento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDocumentoService.update(tipoDocumento));
    } else {
      this.subscribeToSaveResponse(this.tipoDocumentoService.create(tipoDocumento));
    }
  }

  private createFromForm(): ITipoDocumento {
    return {
      ...new TipoDocumento(),
      id: this.editForm.get(['id'])!.value,
      nombreTipo: this.editForm.get(['nombreTipo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDocumento>>): void {
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
