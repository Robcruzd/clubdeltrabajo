import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInformacionAcademica, InformacionAcademica } from 'app/shared/model/informacion-academica.model';
import { InformacionAcademicaService } from './informacion-academica.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IIdioma } from 'app/shared/model/idioma.model';
import { IdiomaService } from 'app/entities/idioma/idioma.service';
import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';
import { NivelIdiomaService } from 'app/entities/nivel-idioma/nivel-idioma.service';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { InstitucionService } from 'app/entities/institucion/institucion.service';

type SelectableEntity = IPersona | IIdioma | INivelIdioma | IInstitucion;

@Component({
  selector: 'jhi-informacion-academica-update',
  templateUrl: './informacion-academica-update.component.html'
})
export class InformacionAcademicaUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  idiomas: IIdioma[] = [];
  nivelidiomas: INivelIdioma[] = [];
  institucions: IInstitucion[] = [];
  fechaInicioDp: any;
  fechaFinDp: any;

  editForm = this.fb.group({
    id: [],
    nivelEstudio: [],
    estado: [null, [Validators.required]],
    fechaInicio: [],
    fechaFin: [],
    tituloOtorgado: [],
    perfilProfesional: [],
    usuario: [null, Validators.required],
    idioma: [],
    nivelIdioma: [],
    institucion: []
  });

  constructor(
    protected informacionAcademicaService: InformacionAcademicaService,
    protected personaService: PersonaService,
    protected idiomaService: IdiomaService,
    protected nivelIdiomaService: NivelIdiomaService,
    protected institucionService: InstitucionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionAcademica }) => {
      this.updateForm(informacionAcademica);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));

      this.idiomaService.query().subscribe((res: HttpResponse<IIdioma[]>) => (this.idiomas = res.body || []));

      this.nivelIdiomaService.query().subscribe((res: HttpResponse<INivelIdioma[]>) => (this.nivelidiomas = res.body || []));

      this.institucionService.query().subscribe((res: HttpResponse<IInstitucion[]>) => (this.institucions = res.body || []));
    });
  }

  updateForm(informacionAcademica: IInformacionAcademica): void {
    this.editForm.patchValue({
      id: informacionAcademica.id,
      nivelEstudio: informacionAcademica.nivelEstudio,
      estado: informacionAcademica.estado,
      fechaInicio: informacionAcademica.fechaInicio,
      fechaFin: informacionAcademica.fechaFin,
      tituloOtorgado: informacionAcademica.tituloOtorgado,
      perfilProfesional: informacionAcademica.perfilProfesional,
      usuario: informacionAcademica.usuario,
      idioma: informacionAcademica.idioma,
      nivelIdioma: informacionAcademica.nivelIdioma,
      institucion: informacionAcademica.institucion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const informacionAcademica = this.createFromForm();
    if (informacionAcademica.id !== undefined) {
      this.subscribeToSaveResponse(this.informacionAcademicaService.update(informacionAcademica));
    } else {
      this.subscribeToSaveResponse(this.informacionAcademicaService.create(informacionAcademica));
    }
  }

  private createFromForm(): IInformacionAcademica {
    return {
      ...new InformacionAcademica(),
      id: this.editForm.get(['id'])!.value,
      nivelEstudio: this.editForm.get(['nivelEstudio'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      fechaFin: this.editForm.get(['fechaFin'])!.value,
      tituloOtorgado: this.editForm.get(['tituloOtorgado'])!.value,
      perfilProfesional: this.editForm.get(['perfilProfesional'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      idioma: this.editForm.get(['idioma'])!.value,
      nivelIdioma: this.editForm.get(['nivelIdioma'])!.value,
      institucion: this.editForm.get(['institucion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInformacionAcademica>>): void {
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
