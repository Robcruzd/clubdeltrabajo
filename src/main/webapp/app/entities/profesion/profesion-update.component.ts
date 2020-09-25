import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfesion, Profesion } from 'app/shared/model/profesion.model';
import { ProfesionService } from './profesion.service';

@Component({
  selector: 'jhi-profesion-update',
  templateUrl: './profesion-update.component.html'
})
export class ProfesionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    profesion: [null, [Validators.required]]
  });

  constructor(protected profesionService: ProfesionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesion }) => {
      this.updateForm(profesion);
    });
  }

  updateForm(profesion: IProfesion): void {
    this.editForm.patchValue({
      id: profesion.id,
      profesion: profesion.profesion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profesion = this.createFromForm();
    if (profesion.id !== undefined) {
      this.subscribeToSaveResponse(this.profesionService.update(profesion));
    } else {
      this.subscribeToSaveResponse(this.profesionService.create(profesion));
    }
  }

  private createFromForm(): IProfesion {
    return {
      ...new Profesion(),
      id: this.editForm.get(['id'])!.value,
      profesion: this.editForm.get(['profesion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesion>>): void {
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
