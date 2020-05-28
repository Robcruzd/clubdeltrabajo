import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPersonaIdioma, PersonaIdioma } from 'app/shared/model/persona-idioma.model';
import { PersonaIdiomaService } from './persona-idioma.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IIdioma } from 'app/shared/model/idioma.model';
import { IdiomaService } from 'app/entities/idioma/idioma.service';

type SelectableEntity = IPersona | IIdioma;

@Component({
  selector: 'jhi-persona-idioma-update',
  templateUrl: './persona-idioma-update.component.html'
})
export class PersonaIdiomaUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  idiomas: IIdioma[] = [];

  editForm = this.fb.group({
    id: [],
    nivel: [null, [Validators.required]],
    idPersona: [null, Validators.required],
    idIdioma: [null, Validators.required]
  });

  constructor(
    protected personaIdiomaService: PersonaIdiomaService,
    protected personaService: PersonaService,
    protected idiomaService: IdiomaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personaIdioma }) => {
      this.updateForm(personaIdioma);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));

      this.idiomaService.query().subscribe((res: HttpResponse<IIdioma[]>) => (this.idiomas = res.body || []));
    });
  }

  updateForm(personaIdioma: IPersonaIdioma): void {
    this.editForm.patchValue({
      id: personaIdioma.id,
      nivel: personaIdioma.nivel,
      idPersona: personaIdioma.idPersona,
      idIdioma: personaIdioma.idIdioma
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personaIdioma = this.createFromForm();
    if (personaIdioma.id !== undefined) {
      this.subscribeToSaveResponse(this.personaIdiomaService.update(personaIdioma));
    } else {
      this.subscribeToSaveResponse(this.personaIdiomaService.create(personaIdioma));
    }
  }

  private createFromForm(): IPersonaIdioma {
    return {
      ...new PersonaIdioma(),
      id: this.editForm.get(['id'])!.value,
      nivel: this.editForm.get(['nivel'])!.value,
      idPersona: this.editForm.get(['idPersona'])!.value,
      idIdioma: this.editForm.get(['idIdioma'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonaIdioma>>): void {
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
