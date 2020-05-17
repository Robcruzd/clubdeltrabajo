import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IIdioma, Idioma } from 'app/shared/model/idioma.model';
import { IdiomaService } from './idioma.service';

@Component({
  selector: 'jhi-idioma-update',
  templateUrl: './idioma-update.component.html'
})
export class IdiomaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idioma: [null, [Validators.required]]
  });

  constructor(protected idiomaService: IdiomaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ idioma }) => {
      this.updateForm(idioma);
    });
  }

  updateForm(idioma: IIdioma): void {
    this.editForm.patchValue({
      id: idioma.id,
      idioma: idioma.idioma
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const idioma = this.createFromForm();
    if (idioma.id !== undefined) {
      this.subscribeToSaveResponse(this.idiomaService.update(idioma));
    } else {
      this.subscribeToSaveResponse(this.idiomaService.create(idioma));
    }
  }

  private createFromForm(): IIdioma {
    return {
      ...new Idioma(),
      id: this.editForm.get(['id'])!.value,
      idioma: this.editForm.get(['idioma'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIdioma>>): void {
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
