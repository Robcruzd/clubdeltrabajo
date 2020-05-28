import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInformacionPersonal, InformacionPersonal } from 'app/shared/model/informacion-personal.model';
import { InformacionPersonalService } from './informacion-personal.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-informacion-personal-update',
  templateUrl: './informacion-personal-update.component.html'
})
export class InformacionPersonalUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  fechaNacimientoDp: any;

  editForm = this.fb.group({
    id: [],
    fechaNacimiento: [null, [Validators.required]],
    lugarNacimiento: [null, [Validators.required]],
    direccionResidencia: [null, [Validators.required]],
    genero: [null, [Validators.required]],
    ciudad: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    discapacidad: [],
    redesSociales: [],
    licencenciaConduccion: [],
    perfilProfesional: [],
    usuario: [null, Validators.required]
  });

  constructor(
    protected informacionPersonalService: InformacionPersonalService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionPersonal }) => {
      this.updateForm(informacionPersonal);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(informacionPersonal: IInformacionPersonal): void {
    this.editForm.patchValue({
      id: informacionPersonal.id,
      fechaNacimiento: informacionPersonal.fechaNacimiento,
      lugarNacimiento: informacionPersonal.lugarNacimiento,
      direccionResidencia: informacionPersonal.direccionResidencia,
      genero: informacionPersonal.genero,
      ciudad: informacionPersonal.ciudad,
      telefono: informacionPersonal.telefono,
      discapacidad: informacionPersonal.discapacidad,
      redesSociales: informacionPersonal.redesSociales,
      licencenciaConduccion: informacionPersonal.licencenciaConduccion,
      perfilProfesional: informacionPersonal.perfilProfesional,
      usuario: informacionPersonal.usuario
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const informacionPersonal = this.createFromForm();
    if (informacionPersonal.id !== undefined) {
      this.subscribeToSaveResponse(this.informacionPersonalService.update(informacionPersonal));
    } else {
      this.subscribeToSaveResponse(this.informacionPersonalService.create(informacionPersonal));
    }
  }

  private createFromForm(): IInformacionPersonal {
    return {
      ...new InformacionPersonal(),
      id: this.editForm.get(['id'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value,
      lugarNacimiento: this.editForm.get(['lugarNacimiento'])!.value,
      direccionResidencia: this.editForm.get(['direccionResidencia'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      discapacidad: this.editForm.get(['discapacidad'])!.value,
      redesSociales: this.editForm.get(['redesSociales'])!.value,
      licencenciaConduccion: this.editForm.get(['licencenciaConduccion'])!.value,
      perfilProfesional: this.editForm.get(['perfilProfesional'])!.value,
      usuario: this.editForm.get(['usuario'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInformacionPersonal>>): void {
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
