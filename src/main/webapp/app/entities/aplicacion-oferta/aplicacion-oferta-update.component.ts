import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAplicacionOferta, AplicacionOferta } from 'app/shared/model/aplicacion-oferta.model';
import { AplicacionOfertaService } from './aplicacion-oferta.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IOferta } from 'app/shared/model/oferta.model';
import { OfertaService } from 'app/entities/oferta/oferta.service';

type SelectableEntity = IPersona | IOferta;

@Component({
  selector: 'jhi-aplicacion-oferta-update',
  templateUrl: './aplicacion-oferta-update.component.html'
})
export class AplicacionOfertaUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  ofertas: IOferta[] = [];

  editForm = this.fb.group({
    id: [],
    usuario: [null, Validators.required],
    oferta: [null, Validators.required]
  });

  constructor(
    protected aplicacionOfertaService: AplicacionOfertaService,
    protected personaService: PersonaService,
    protected ofertaService: OfertaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacionOferta }) => {
      this.updateForm(aplicacionOferta);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));

      this.ofertaService.query().subscribe((res: HttpResponse<IOferta[]>) => (this.ofertas = res.body || []));
    });
  }

  updateForm(aplicacionOferta: IAplicacionOferta): void {
    this.editForm.patchValue({
      id: aplicacionOferta.id,
      usuario: aplicacionOferta.usuario,
      oferta: aplicacionOferta.oferta
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aplicacionOferta = this.createFromForm();
    if (aplicacionOferta.id !== undefined) {
      this.subscribeToSaveResponse(this.aplicacionOfertaService.update(aplicacionOferta));
    } else {
      this.subscribeToSaveResponse(this.aplicacionOfertaService.create(aplicacionOferta));
    }
  }

  private createFromForm(): IAplicacionOferta {
    return {
      ...new AplicacionOferta(),
      id: this.editForm.get(['id'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      oferta: this.editForm.get(['oferta'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAplicacionOferta>>): void {
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
