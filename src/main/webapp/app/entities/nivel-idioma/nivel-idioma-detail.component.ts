import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INivelIdioma } from 'app/shared/model/nivel-idioma.model';

@Component({
  selector: 'jhi-nivel-idioma-detail',
  templateUrl: './nivel-idioma-detail.component.html'
})
export class NivelIdiomaDetailComponent implements OnInit {
  nivelIdioma: INivelIdioma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nivelIdioma }) => (this.nivelIdioma = nivelIdioma));
  }

  previousState(): void {
    window.history.back();
  }
}
