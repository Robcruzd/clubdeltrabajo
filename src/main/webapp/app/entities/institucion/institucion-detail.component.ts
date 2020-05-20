import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstitucion } from 'app/shared/model/institucion.model';

@Component({
  selector: 'jhi-institucion-detail',
  templateUrl: './institucion-detail.component.html'
})
export class InstitucionDetailComponent implements OnInit {
  institucion: IInstitucion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institucion }) => (this.institucion = institucion));
  }

  previousState(): void {
    window.history.back();
  }
}
