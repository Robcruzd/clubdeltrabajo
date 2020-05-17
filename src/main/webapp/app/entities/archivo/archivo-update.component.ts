import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IArchivo, Archivo } from 'app/shared/model/archivo.model';
import { ArchivoService } from './archivo.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-archivo-update',
  templateUrl: './archivo-update.component.html'
})
export class ArchivoUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [null, [Validators.required]],
    archivo: [null, [Validators.required]],
    usuario: [null, Validators.required]
  });

  constructor(
    protected archivoService: ArchivoService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ archivo }) => {
      this.updateForm(archivo);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(archivo: IArchivo): void {
    this.editForm.patchValue({
      id: archivo.id,
      tipo: archivo.tipo,
      archivo: archivo.archivo,
      usuario: archivo.usuario
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const archivo = this.createFromForm();
    if (archivo.id !== undefined) {
      this.subscribeToSaveResponse(this.archivoService.update(archivo));
    } else {
      this.subscribeToSaveResponse(this.archivoService.create(archivo));
    }
  }

  private createFromForm(): IArchivo {
    return {
      ...new Archivo(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      archivo: this.editForm.get(['archivo'])!.value,
      usuario: this.editForm.get(['usuario'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArchivo>>): void {
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

  trackById(index: number, item: IPersona): any {
    return item.id;
  }
}
