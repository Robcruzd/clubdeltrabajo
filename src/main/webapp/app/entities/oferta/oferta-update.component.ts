import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOferta, Oferta } from 'app/shared/model/oferta.model';
import { OfertaService } from './oferta.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

@Component({
  selector: 'jhi-oferta-update',
  templateUrl: './oferta-update.component.html'
})
export class OfertaUpdateComponent implements OnInit {
  isSaving = false;
  empresas: IEmpresa[] = [];
  fechaPublicacionDp: any;

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    titulo: [null, [Validators.required]],
    salario: [null, [Validators.required]],
    cargo: [null, [Validators.required]],
    experiencia: [],
    ciudad: [null, [Validators.required]],
    area: [null, [Validators.required]],
    fechaPublicacion: [null, [Validators.required]],
    estado: [null, [Validators.required, Validators.maxLength(1)]],
    usuario: [null, Validators.required]
  });

  constructor(
    protected ofertaService: OfertaService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oferta }) => {
      this.updateForm(oferta);

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(oferta: IOferta): void {
    this.editForm.patchValue({
      id: oferta.id,
      descripcion: oferta.descripcion,
      titulo: oferta.titulo,
      salario: oferta.salario,
      cargo: oferta.cargo,
      experiencia: oferta.experiencia,
      ciudad: oferta.ciudad,
      area: oferta.area,
      fechaPublicacion: oferta.fechaPublicacion,
      estado: oferta.estado,
      usuario: oferta.usuario
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oferta = this.createFromForm();
    if (oferta.id !== undefined) {
      this.subscribeToSaveResponse(this.ofertaService.update(oferta));
    } else {
      this.subscribeToSaveResponse(this.ofertaService.create(oferta));
    }
  }

  private createFromForm(): IOferta {
    return {
      ...new Oferta(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      salario: this.editForm.get(['salario'])!.value,
      cargo: this.editForm.get(['cargo'])!.value,
      experiencia: this.editForm.get(['experiencia'])!.value,
      ciudad: this.editForm.get(['ciudad'])!.value,
      area: this.editForm.get(['area'])!.value,
      fechaPublicacion: this.editForm.get(['fechaPublicacion'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      usuario: this.editForm.get(['usuario'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOferta>>): void {
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

  trackById(index: number, item: IEmpresa): any {
    return item.id;
  }
}
