import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInformacionLaboral, InformacionLaboral } from 'app/shared/model/informacion-laboral.model';
import { InformacionLaboralService } from './informacion-laboral.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';

type SelectableEntity = IPersona | ICargo;

@Component({
  selector: 'jhi-informacion-laboral-update',
  templateUrl: './informacion-laboral-update.component.html'
})
export class InformacionLaboralUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  cargos: ICargo[] = [];
  fechaInicioDp: any;
  fechaFinDp: any;

  editForm = this.fb.group({
    id: [],
    nombreEmpresa: [null, [Validators.required]],
    fechaInicio: [null, [Validators.required]],
    fechaFin: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    ciudad: [null, [Validators.required]],
    departamento: [null, [Validators.required]],
    pais: [null, [Validators.required]],
    telefonoEmpresa: [null, [Validators.required]],
    dependencia: [null, [Validators.required]],
    ciudadExtranjera: [null, [Validators.required]],
    usuario: [null, Validators.required],
    cargo: [null, Validators.required]
  });

  constructor(
    protected informacionLaboralService: InformacionLaboralService,
    protected personaService: PersonaService,
    protected cargoService: CargoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionLaboral }) => {
      this.updateForm(informacionLaboral);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));

      this.cargoService.query().subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
    });
  }

  updateForm(informacionLaboral: IInformacionLaboral): void {
    this.editForm.patchValue({
      id: informacionLaboral.id,
      nombreEmpresa: informacionLaboral.nombreEmpresa,
      fechaInicio: informacionLaboral.fechaInicio,
      fechaFin: informacionLaboral.fechaFin,
      direccion: informacionLaboral.direccion,
      ciudad: informacionLaboral.ciudad,
      departamento: informacionLaboral.departamento,
      pais: informacionLaboral.pais,
      telefonoEmpresa: informacionLaboral.telefonoEmpresa,
      dependencia: informacionLaboral.dependencia,
      ciudadExtranjera: informacionLaboral.ciudadExtranjera,
      usuario: informacionLaboral.usuario,
      cargo: informacionLaboral.cargo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const informacionLaboral = this.createFromForm();
    if (informacionLaboral.id !== undefined) {
      this.subscribeToSaveResponse(this.informacionLaboralService.update(informacionLaboral));
    } else {
      this.subscribeToSaveResponse(this.informacionLaboralService.create(informacionLaboral));
    }
  }

  private createFromForm(): IInformacionLaboral {
    return {
      ...new InformacionLaboral(),
      id: this.editForm.get(['id'])!.value,
      nombreEmpresa: this.editForm.get(['nombreEmpresa'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      fechaFin: this.editForm.get(['fechaFin'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
      pais: this.editForm.get(['pais'])!.value,
      telefonoEmpresa: this.editForm.get(['telefonoEmpresa'])!.value,
      dependencia: this.editForm.get(['dependencia'])!.value,
      ciudadExtranjera: this.editForm.get(['ciudadExtranjera'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      cargo: this.editForm.get(['cargo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInformacionLaboral>>): void {
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
