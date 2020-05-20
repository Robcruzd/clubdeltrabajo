import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INivelIdioma, NivelIdioma } from 'app/shared/model/nivel-idioma.model';
import { NivelIdiomaService } from './nivel-idioma.service';

@Component({
  selector: 'jhi-nivel-idioma-update',
  templateUrl: './nivel-idioma-update.component.html'
})
export class NivelIdiomaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nivel: [null, [Validators.required]]
  });

  constructor(protected nivelIdiomaService: NivelIdiomaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nivelIdioma }) => {
      this.updateForm(nivelIdioma);
    });
  }

  updateForm(nivelIdioma: INivelIdioma): void {
    this.editForm.patchValue({
      id: nivelIdioma.id,
      nivel: nivelIdioma.nivel
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nivelIdioma = this.createFromForm();
    if (nivelIdioma.id !== undefined) {
      this.subscribeToSaveResponse(this.nivelIdiomaService.update(nivelIdioma));
    } else {
      this.subscribeToSaveResponse(this.nivelIdiomaService.create(nivelIdioma));
    }
  }

  private createFromForm(): INivelIdioma {
    return {
      ...new NivelIdioma(),
      id: this.editForm.get(['id'])!.value,
      nivel: this.editForm.get(['nivel'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelIdioma>>): void {
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
