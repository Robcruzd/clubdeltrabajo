import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegiones } from 'app/shared/model/regiones.model';

@Component({
  selector: 'jhi-regiones-detail',
  templateUrl: './regiones-detail.component.html'
})
export class RegionesDetailComponent implements OnInit {
  regiones: IRegiones | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regiones }) => (this.regiones = regiones));
  }

  previousState(): void {
    window.history.back();
  }
}
