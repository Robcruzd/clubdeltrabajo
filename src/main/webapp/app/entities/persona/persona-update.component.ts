import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from 'app/entities/tipo-documento/tipo-documento.service';

type SelectableEntity = ITipoUsuario | ITipoDocumento;

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
  isSaving = false;
  tipousuarios: ITipoUsuario[] = [];
  tipodocumentos: ITipoDocumento[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    email: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required]],
    tipoUsuario: [null, Validators.required],
    tipoDocumento: [null, Validators.required]
  });

  constructor(
    protected personaService: PersonaService,
    protected tipoUsuarioService: TipoUsuarioService,
    protected tipoDocumentoService: TipoDocumentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);

      this.tipoUsuarioService.query().subscribe((res: HttpResponse<ITipoUsuario[]>) => (this.tipousuarios = res.body || []));

      this.tipoDocumentoService.query().subscribe((res: HttpResponse<ITipoDocumento[]>) => (this.tipodocumentos = res.body || []));
    });
  }

  updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      email: persona.email,
      numeroDocumento: persona.numeroDocumento,
      tipoUsuario: persona.tipoUsuario,
      tipoDocumento: persona.tipoDocumento
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  private createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      email: this.editForm.get(['email'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      tipoUsuario: this.editForm.get(['tipoUsuario'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
