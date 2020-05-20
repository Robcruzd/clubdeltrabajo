import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDependencia, Dependencia } from 'app/shared/model/dependencia.model';
import { DependenciaService } from './dependencia.service';

@Component({
  selector: 'jhi-dependencia-update',
  templateUrl: './dependencia-update.component.html'
})
export class DependenciaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dependencia: [null, [Validators.required]]
  });

  constructor(protected dependenciaService: DependenciaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dependencia }) => {
      this.updateForm(dependencia);
    });
  }

  updateForm(dependencia: IDependencia): void {
    this.editForm.patchValue({
      id: dependencia.id,
      dependencia: dependencia.dependencia
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dependencia = this.createFromForm();
    if (dependencia.id !== undefined) {
      this.subscribeToSaveResponse(this.dependenciaService.update(dependencia));
    } else {
      this.subscribeToSaveResponse(this.dependenciaService.create(dependencia));
    }
  }

  private createFromForm(): IDependencia {
    return {
      ...new Dependencia(),
      id: this.editForm.get(['id'])!.value,
      dependencia: this.editForm.get(['dependencia'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDependencia>>): void {
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
