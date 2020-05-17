import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInstitucion, Institucion } from 'app/shared/model/institucion.model';
import { InstitucionService } from './institucion.service';

@Component({
  selector: 'jhi-institucion-update',
  templateUrl: './institucion-update.component.html'
})
export class InstitucionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    institucion: [null, [Validators.required]]
  });

  constructor(protected institucionService: InstitucionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institucion }) => {
      this.updateForm(institucion);
    });
  }

  updateForm(institucion: IInstitucion): void {
    this.editForm.patchValue({
      id: institucion.id,
      institucion: institucion.institucion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const institucion = this.createFromForm();
    if (institucion.id !== undefined) {
      this.subscribeToSaveResponse(this.institucionService.update(institucion));
    } else {
      this.subscribeToSaveResponse(this.institucionService.create(institucion));
    }
  }

  private createFromForm(): IInstitucion {
    return {
      ...new Institucion(),
      id: this.editForm.get(['id'])!.value,
      institucion: this.editForm.get(['institucion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstitucion>>): void {
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
