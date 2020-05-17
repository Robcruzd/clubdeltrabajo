import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInformacionAcademica } from 'app/shared/model/informacion-academica.model';

@Component({
  selector: 'jhi-informacion-academica-detail',
  templateUrl: './informacion-academica-detail.component.html'
})
export class InformacionAcademicaDetailComponent implements OnInit {
  informacionAcademica: IInformacionAcademica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ informacionAcademica }) => (this.informacionAcademica = informacionAcademica));
  }

  previousState(): void {
    window.history.back();
  }
}
