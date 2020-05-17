import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario/usuario.service';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from 'app/entities/tipo-documento/tipo-documento.service';

type SelectableEntity = ITipoUsuario | IUsuario | ITipoDocumento;

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
  isSaving = false;
  tipousuarios: ITipoUsuario[] = [];
  numerodocumentos: IUsuario[] = [];
  tipodocumentos: ITipoDocumento[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    email: [null, [Validators.required]],
    tipoUsuario: [null, Validators.required],
    numeroDocumento: [null, Validators.required],
    tipoDocumento: [null, Validators.required]
  });

  constructor(
    protected personaService: PersonaService,
    protected tipoUsuarioService: TipoUsuarioService,
    protected usuarioService: UsuarioService,
    protected tipoDocumentoService: TipoDocumentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);

      this.tipoUsuarioService
        .query({ 'personaId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ITipoUsuario[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITipoUsuario[]) => {
          if (!persona.tipoUsuario || !persona.tipoUsuario.id) {
            this.tipousuarios = resBody;
          } else {
            this.tipoUsuarioService
              .find(persona.tipoUsuario.id)
              .pipe(
                map((subRes: HttpResponse<ITipoUsuario>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITipoUsuario[]) => (this.tipousuarios = concatRes));
          }
        });

      this.usuarioService
        .query({ 'personaId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IUsuario[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUsuario[]) => {
          if (!persona.numeroDocumento || !persona.numeroDocumento.id) {
            this.numerodocumentos = resBody;
          } else {
            this.usuarioService
              .find(persona.numeroDocumento.id)
              .pipe(
                map((subRes: HttpResponse<IUsuario>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUsuario[]) => (this.numerodocumentos = concatRes));
          }
        });

      this.tipoDocumentoService.query().subscribe((res: HttpResponse<ITipoDocumento[]>) => (this.tipodocumentos = res.body || []));
    });
  }

  updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      email: persona.email,
      tipoUsuario: persona.tipoUsuario,
      numeroDocumento: persona.numeroDocumento,
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
      tipoUsuario: this.editForm.get(['tipoUsuario'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
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
