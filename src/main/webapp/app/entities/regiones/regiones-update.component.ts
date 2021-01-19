import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRegiones, Regiones } from 'app/shared/model/regiones.model';
import { RegionesService } from './regiones.service';

@Component({
  selector: 'jhi-regiones-update',
  templateUrl: './regiones-update.component.html'
})
export class RegionesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    region: [null, [Validators.required]]
  });

  constructor(protected regionesService: RegionesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regiones }) => {
      this.updateForm(regiones);
    });
  }

  updateForm(regiones: IRegiones): void {
    this.editForm.patchValue({
      id: regiones.id,
      region: regiones.region
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regiones = this.createFromForm();
    if (regiones.id !== undefined) {
      this.subscribeToSaveResponse(this.regionesService.update(regiones));
    } else {
      this.subscribeToSaveResponse(this.regionesService.create(regiones));
    }
  }

  private createFromForm(): IRegiones {
    return {
      ...new Regiones(),
      id: this.editForm.get(['id'])!.value,
      region: this.editForm.get(['region'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegiones>>): void {
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
