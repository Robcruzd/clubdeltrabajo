import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmpresa, Empresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from './empresa.service';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { TipoUsuarioService } from 'app/entities/tipo-usuario/tipo-usuario.service';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from 'app/entities/tipo-documento/tipo-documento.service';

type SelectableEntity = ITipoUsuario | ITipoDocumento;

@Component({
  selector: 'jhi-empresa-update',
  templateUrl: './empresa-update.component.html'
})
export class EmpresaUpdateComponent implements OnInit {
  isSaving = false;
  tipousuarios: ITipoUsuario[] = [];
  tipodocumentos: ITipoDocumento[] = [];

  editForm = this.fb.group({
    id: [],
    razonSocial: [null, [Validators.required]],
    razonComercial: [null, [Validators.required]],
    email: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required]],
    tipoUsuario: [null, Validators.required],
    tipoDocumento: [null, Validators.required]
  });

  constructor(
    protected empresaService: EmpresaService,
    protected tipoUsuarioService: TipoUsuarioService,
    protected tipoDocumentoService: TipoDocumentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empresa }) => {
      this.updateForm(empresa);

      this.tipoUsuarioService.query().subscribe((res: HttpResponse<ITipoUsuario[]>) => (this.tipousuarios = res.body || []));

      this.tipoDocumentoService.query().subscribe((res: HttpResponse<ITipoDocumento[]>) => (this.tipodocumentos = res.body || []));
    });
  }

  updateForm(empresa: IEmpresa): void {
    this.editForm.patchValue({
      id: empresa.id,
      razonSocial: empresa.razonSocial,
      razonComercial: empresa.razonComercial,
      email: empresa.email,
      numeroDocumento: empresa.numeroDocumento,
      tipoUsuario: empresa.tipoUsuario,
      tipoDocumento: empresa.tipoDocumento
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empresa = this.createFromForm();
    if (empresa.id !== undefined) {
      this.subscribeToSaveResponse(this.empresaService.update(empresa));
    } else {
      this.subscribeToSaveResponse(this.empresaService.create(empresa));
    }
  }

  private createFromForm(): IEmpresa {
    return {
      ...new Empresa(),
      id: this.editForm.get(['id'])!.value,
      razonSocial: this.editForm.get(['razonSocial'])!.value,
      razonComercial: this.editForm.get(['razonComercial'])!.value,
      email: this.editForm.get(['email'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      tipoUsuario: this.editForm.get(['tipoUsuario'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpresa>>): void {
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
